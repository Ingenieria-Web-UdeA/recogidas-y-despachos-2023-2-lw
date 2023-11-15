import { prisma } from '@/service/prisma';
import { s3 } from '@/service/s3';
import { checkPrivateApi } from '@/utils/checkServerSession';
import { NextApiRequest, NextApiResponse } from 'next/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await checkPrivateApi(req, res);

  if (req.method === 'GET') {
    const userProfile = await prisma.user.findUnique({
      where: {
        email: user?.email,
      },
      select: {
        email: true,
        image: true,
        profile: {
          select: {
            document: true,
            phoneNumber: true,
            image: true,
          },
        },
      },
    });

    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: userProfile?.profile?.image ?? '',
      Expires: 60 * 60, // 1 hour
    });

    if (userProfile?.profile?.image) {
      userProfile.profile.image = url;
    }

    return res.status(200).json({ userProfile });
  }

  if (req.method === 'POST') {
    const { document, phoneNumber, image } = req.body;

    const usr = await prisma.user.findUnique({
      where: {
        email: user?.email,
      },
    });

    await prisma.profile.upsert({
      where: {
        userId: usr?.id,
      },
      create: {
        document,
        phoneNumber,
        image,
        userId: usr?.id ?? '',
      },
      update: {
        document: {
          set: document,
        },
        phoneNumber: {
          set: phoneNumber,
        },
        image: {
          set: image,
        },
      },
    });

    return res.status(200).json({ message: 'Hello World!' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
