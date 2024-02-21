/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { isNotNil } from 'ramda';

import { cn } from '@/utils/cn';

type Props = {
  location: string | null;
};

const Chat = ({ location }: Props): JSX.Element => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    reload,
  } = useChat({
    body: { location },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isNotNil(location)) {
      setMessages([
        {
          id: 'base-0',
          role: 'system',
          content:
            'You are specialised Swiss touristic guide that will answer only about Swiss location questions. Answer in French',
        },
        {
          id: 'base-1',
          role: 'user',
          content: `Tell me more about the following place "${location}" in max 50 words. Don't include coordinates in your answer.`,
        },
      ]);
      reload();
    }
  }, [location]);

  return (
    <div className="relative w-full min-h-full px-4 pt-4 grid grid-cols-1 row-auto gap-y-4 auto-rows-max">
      <div className="">
        <img
          src="https://media.tenor.com/4dezf6tJGrsAAAAM/clippy-microsoft.gif"
          alt="clippy"
          className="w-24"
        />
      </div>
      <div className="flex flex-col w-full min-h-[calc(100vh-200px)] gap-4">
        {messages
          .filter(i => !i.id.includes('base-'))
          .map(({ role, content }, i) => (
            <div
              key={`message-${i}`}
              className={cn(
                'flex gap-2',
                role === 'user' && 'flex-row-reverse text-right'
              )}
            >
              <span className="text-xl">
                {role === 'assistant' ? '🤖' : '🤓'}
              </span>
              <span
                className={cn(
                  'p-2 text-sm rounded-lg bg-gray-100',
                  role === 'user' && 'bg-blue-100'
                )}
              >
                {content}
              </span>
            </div>
          ))}
      </div>
      <div ref={bottomRef} />
      <form
        action=""
        ref={formRef}
        className="sticky bottom-0 flex self-end w-full pb-4 gap-1"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="block w-full text-gray-900 border-2 border-gray-200 rounded-md py-1.5 px-2.5 placeholder:text-gray-400 text-[16px]"
          placeholder="Ask me anything"
          value={input}
          onChange={handleInputChange}
          disabled={messages.length === 0}
        />
        <button
          type="submit"
          className="h-10 bg-gray-800 border-2 border-gray-200 grid rounded-md place-content-center aspect-square"
          disabled={messages.length === 0}
        >
          🚀
        </button>
      </form>
    </div>
  );
};

export default Chat;
