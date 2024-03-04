/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Message, useChat } from 'ai/react';
import { motion, useIsPresent } from 'framer-motion';
import { decimalToSexagesimal } from 'geolib';
import { isEmpty, isNotNil } from 'ramda';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Maya from '@/components/Maya';
import PaperFront from '@/components/PaperFront';
import type { Image } from '@/types/Image';
import cm from '@/utils/cm';

type Props = {
  location: string | null;
  elevation: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  onContinue?: () => void;
  images?: Image[];
};

const initialMessages: Message[] = [
  {
    id: 'base-0',
    role: 'system',
    content:
      'You are specialised Swiss touristic guide that will answer only about Swiss location questions. Answer in French',
  },
];

const Chat = ({
  location,
  elevation,
  coordinates,
  onContinue,
  images,
}: Props): JSX.Element => {
  const locationProxy = useRef<string | null>(null);
  const isPresent = useIsPresent();
  const { t } = useTranslation();

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setMessages,
  } = useChat({
    initialMessages,
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [messages]);

  useEffect(() => {
    if (locationProxy.current !== location && isNotNil(location)) {
      locationProxy.current = location;
      setMessages(initialMessages);
      append({
        id: 'base-1',
        role: 'user',
        content: `In one paragraph, tell me more about the following place "${location}" in maximum 50 words. Don't include coordinates in your answer.`,
      });
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed bottom-0 right-0 max-h-screen w-[395px]"
    >
      <motion.div
        className="flex flex-col max-h-screen px-5 overflow-y-auto"
        initial={{ y: '100vh' }}
        animate={{ y: isPresent ? 0 : '100vh' }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative mt-10">
          <PaperFront withClip>
            <h2 className="py-1 font-bold border-b border-t-[3px] border-stone-900">
              {t('chat.elevation')} :{' '}
              {elevation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")} m
            </h2>
            <h1 className="mt-4 font-serif text-xl">{location}</h1>
            <p className="mt-2">
              {decimalToSexagesimal(coordinates.lat)} N<br />
              {decimalToSexagesimal(coordinates.lng)} E
            </p>
          </PaperFront>
          <div className="flex flex-col w-full">
            {messages
              .filter(i => !i.id.includes('base-'))
              .map(({ role, content }, i) => (
                <div key={`message-${i}`}>
                  <Divider />
                  <div className="p-4 shadow bg-stone-100">
                    <div
                      className={cm(
                        role === 'user' &&
                          'bg-stone-200 border-l-[3px] border-orange-500 p-3'
                      )}
                    >
                      {role === 'assistant' && (
                        <span className="float-left pr-10 -mx-8 -mt-2">
                          <Maya
                            speak={messages.length - 3 === i && isLoading}
                          />
                        </span>
                      )}
                      {role === 'user' && (
                        <h3 className="mb-1 font-bold">
                          {t('chat.your_question')} :
                        </h3>
                      )}
                      {content}
                    </div>
                  </div>
                  {i === 0 && isNotNil(images) && !isEmpty(images) && (
                    <div className="flex items-center justify-center w-full pt-4 pb-8 bg-stone-100">
                      {images.map((image, j) => (
                        <img
                          key={`location-image-${j}`}
                          src={image.url}
                          alt={location as string}
                          className={cm(
                            'border-4 border-white shadow w-[40%] shadow',
                            j % 2 === 0 && 'rotate-[-3deg] translate-x-2',
                            j % 2 === 1 && 'rotate-[3deg] -translate-x-2'
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div ref={bottomRef} />
        </div>
        <div className="mt-3">
          <div className="p-4 shadow bg-stone-100">
            <form className="sticky bottom-0 w-full" onSubmit={handleSubmit}>
              <label htmlFor="input" className="font-bold">
                {t('chat.what_next')}
              </label>
              <div className="flex mt-3">
                <input
                  id="input"
                  type="text"
                  className="h-10 border text-[16px] grow bg-stone-100 border-stone-900 placeholder:text-stone-900 disabled:bg-stone-200 disabled:placeholder:text-stone-500"
                  placeholder={t('chat.ask_maya')}
                  value={input}
                  onChange={handleInputChange}
                  disabled={messages.length === 0}
                />
                <button
                  type="submit"
                  className="h-10 border bg-stone-900 border-stone-900 text-stone-100 aspect-square disabled:text-stone-300"
                  disabled={messages.length === 0}
                >
                  ↑
                </button>
              </div>
            </form>
          </div>
          {isNotNil(onContinue) && (
            <>
              <Divider />
              <div className="p-4 shadow bg-stone-100">
                <Button onClick={onContinue}>{t('chat.continue')}</Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Chat;
