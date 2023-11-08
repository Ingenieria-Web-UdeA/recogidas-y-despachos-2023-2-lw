import { prisma } from '@/service/prisma';
import { checkProtectedApi } from '@/utils/checkServerSession';
import { NextApiRequest, NextApiResponse } from 'next';

interface Response {
  indicadores?: unknown;
  message?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  await checkProtectedApi(req, res, 'ADMIN');

  if (req.method === 'GET') {
    const indicadores = await prisma.$queryRaw`
    select * from recogidas_mensuales_por_lote
    `;
    return res.status(200).json({ indicadores });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
