import { prisma } from '@/service/prisma';
// import { Collection } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface Response {
  collections?: unknown;
  message?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method === 'GET') {
    const { year, month } = req.query;

    const collections = await prisma.$queryRaw`
      select 
      c.id,
      c.bunches,
      c."collectionDate",
      c."lotId"
      from "Collection" c
        join "Lot" l
          on c."lotId" = l.id
      where 
      extract(month from c."collectionDate") = ${parseInt(month as string)} and 
      extract(year from c."collectionDate") = ${parseInt(year as string)}
      order by c."collectionDate" asc, cast(replace(l."name", 'Lote ','') as int) asc
    `;

    return res.status(200).json({ collections });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
