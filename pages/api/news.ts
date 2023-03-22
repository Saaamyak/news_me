import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';


type Data = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = req.query.url as string || '';
  let result = 'not found';
  await axios.get(url).then(function (r2) {
    let dom = new JSDOM(r2.data, {
      url: url
    });
    let article = new Readability(dom.window.document).parse();
    result = (article && article.textContent) || 'not found';
  }).catch(function (error: any) {
    console.log(error);
  });
  res.status(200).json({ data: result });
}
