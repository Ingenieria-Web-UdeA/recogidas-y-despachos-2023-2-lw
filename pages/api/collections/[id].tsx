import { prisma } from '@/service/prisma';
import { checkPrivateApi } from '@/utils/checkServerSession';
import { Collection } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface Response {
  collection?: Collection;
  message?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  await checkPrivateApi(req, res);

  if (req.method === 'PUT') {
    const id = req.query.id as string;

    const { bunches } = req.body;

    const collection = await prisma.collection.update({
      where: { id },
      data: { bunches },
    });

    return res.status(200).json({ collection });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
