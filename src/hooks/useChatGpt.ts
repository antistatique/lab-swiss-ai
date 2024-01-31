import { useState } from 'react';
import OpenAI from 'openai';

import { Messages } from '@/types/Chat';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const useChatGpt = (): {
  messages: Messages;
  start: (location: string) => Promise<void>;
  ask: (prompt: string) => Promise<void>;
  clear: () => void;
  error: string | null;
} => {
  const [messages, setMessages] = useState<Messages>([]);
  const [error, setError] = useState<string | null>(null);

  const start = async (location: string) => {
    setMessages([]);
    setError(null);
    try {
      const stream = await openai.beta.chat.completions.stream({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are specialised Swiss touristic guide that will answer only about Swiss location questions. Answer in French',
          },
          {
            role: 'user',
            content: `Tell me more about the following place "${location}" in max 50 words. Don't include coordinates in your answer.`,
          },
        ],
        stream: true,
      });

      stream.on('content', delta => {
        setMessages(i => [
          {
            role: 'assistant',
            content: `${i[0]?.content ?? ''}${delta || ''}`,
          },
        ]);
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const ask = async (prompt: string) => {
    setError(null);
    setMessages(i => [
      ...i,
      {
        role: 'user',
        content: prompt,
      },
    ]);
    try {
      const stream = await openai.beta.chat.completions.stream({
        model: 'gpt-3.5-turbo',
        messages: [
          ...messages,
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: true,
      });

      stream.on('content', delta => {
        setMessages(i =>
          i.at(-1)?.role === 'assistant'
            ? i.slice(0, -1).concat([
                {
                  role: 'assistant',
                  content: `${i.at(-1)?.content ?? ''}${delta || ''}`,
                },
              ])
            : [
                ...i,
                {
                  role: 'assistant',
                  content: delta || '',
                },
              ]
        );
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const clear = () => {
    setMessages([]);
    setError(null);
  };

  return { messages, start, ask, clear, error };
};

export default useChatGpt;
