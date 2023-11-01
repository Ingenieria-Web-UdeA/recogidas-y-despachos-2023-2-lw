import { prisma } from '@/service/prisma';
import { checkPrivateApi } from '@/utils/checkServerSession';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkPrivateApi(req, res);

  if (req.method === 'GET') {
    const { year, month } = req.query;

    const nextMonth = month === '12' ? 1 : parseInt(month as string) + 1;

    const newYear = month === '12' ? parseInt(year as string) + 1 : year;

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
              lt: new Date(`${newYear}-${nextMonth}-01`),
            },
          },
        ],
      },
      orderBy: {
        shipmentDate: 'asc',
      },
    });

    return res.status(200).json({ shipments });
  }

  if (req.method === 'POST') {
    const { shipmentDate, shippedBunches, deliveredWeight } = req.body;

    const newShipment = await prisma.shipment.create({
      data: {
        shipmentDate: new Date(shipmentDate),
        shippedBunches: parseInt(shippedBunches),
        deliveredWeight: parseInt(deliveredWeight),
        bunchWeight: parseInt(deliveredWeight) / parseInt(shippedBunches),
        userId: 'clo49s9ff00007eu0mk4lmuql',
      },
    });

    return res.status(200).json({ newShipment });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
