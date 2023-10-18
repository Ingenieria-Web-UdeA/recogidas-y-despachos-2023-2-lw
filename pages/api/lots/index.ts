import { prisma } from '@/service/prisma';
import { Lot } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface Response {
  lots?: Lot[];
  message?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method === 'GET') {
    const lots = await prisma.lot.findMany();
    return res.status(200).json({ lots });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
