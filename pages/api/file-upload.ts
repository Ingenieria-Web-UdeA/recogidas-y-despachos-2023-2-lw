import { s3 } from '@/service/s3';
import { checkPrivateApi } from '@/utils/checkServerSession';
import { PresignedPost } from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  postData?: PresignedPost;
  key?: string;
  message?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const user = await checkPrivateApi(req, res);

  if (req.method === 'POST') {
    const { fileName, fileType } = req.body;

    const key = `${user?.email ?? ''}/${fileName}`;

    const postData = s3.createPresignedPost({
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Fields: {
        key,
        'Content-Type': fileType,
      },
      Expires: 60,
      Conditions: [
        ['content-length-range', 0, 1048576], // up to 1 MB
      ],
    });

    return res.status(200).json({ postData, key });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
