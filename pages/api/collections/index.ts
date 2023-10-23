import { prisma } from '@/service/prisma';
import { Collection } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface Response {
  collections?: Collection[];
  message?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method === 'GET') {
    const collections = await prisma.collection.findMany();

    return res.status(200).json({ collections });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
