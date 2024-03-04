import gis from 'g-i-s';
import queryString from 'query-string';
import { isNil } from 'ramda';

export async function GET(req: Request) {
  const { query } = queryString.parseUrl(req.url).query;

  const fetchImages = (q: string) =>
    new Promise((resolve, reject) => {
      gis(
        q,
        (
          error: Error,
          results: { url: string; width: number; height: number }[]
        ) => {
          if (!isNil(error)) reject(error);
          if (isNil(error)) resolve(results);
        }
      );
    });

  const rawImages = (await fetchImages(query as string)) as {
    url: string;
    width: number;
    height: number;
  }[];

  const images = [];
  let i = -1;

  do {
    i += 1;
    const res = await fetch(rawImages[i].url);
    if (res.status === 200) images.push(rawImages[i]);
  } while (images.length < 2);

  return new Response(JSON.stringify(images), {
    headers: { 'Content-Type': 'application/json' },
  });
}
