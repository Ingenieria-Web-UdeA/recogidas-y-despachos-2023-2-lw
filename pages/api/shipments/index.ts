import { prisma } from '@/service/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { year, month } = req.query;

    const shipments = await prisma.shipment.findMany({
      where: {
        AND: [
          {
            shipmentDate: {
              gte: new Date(`${year}-${month}-01`),
            },
          },
          {
            shipmentDate: {
              lt: new Date(`${year}-${parseInt(month as string) + 1}-01`),
            },
          },
        ],
      },
    });

    return res.status(200).json({ shipments });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
