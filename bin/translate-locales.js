import OpenAI from 'openai';

import origin from '../src/locales/fr.json';
import languages from '../src/locales/languages.json';

const path = `${import.meta.dir}/../src/locales/`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function delayedIteration(keys, delayMs) {
  for (const key of keys) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: [
        {
          role: 'user',
          // content: `Translate the following French JSON string translations file to ${languages[key]} and be sure to keep the keys untouched. The response should only be the translated JSON string: \`\`\`${JSON.stringify(origin, null, 2)}\`\`\``,
          content: `
Given the following JSON string translations file in French:
${JSON.stringify(origin, null, 2)}

Use the following instructions to rewrite the text:
'''
translate it to ${languages[key]} and be sure to keep the keys untouched. The response should only be the translated JSON string
'''
          `
        },
      ],
    });

    const translatedJSON = response.choices[0].message.content
      ?.replace('```json', '')
      .replace(/`/gm, '')
      .trim();

    await Bun.write(`${path}${key}.json`, translatedJSON);

    console.log(`Translation to ${key} completed!`);
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
}

delayedIteration(
  // Object.keys(languages).filter(i => i !== 'fr'),
  Object.keys(languages).filter(i => i === 'gu'),
  100
);
