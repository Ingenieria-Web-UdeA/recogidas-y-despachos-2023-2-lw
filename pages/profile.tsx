import { PrivateRoute } from '@/components/PrivateRoute';
import { PrimaryActionButton } from '@/components/ui/Buttons';
import { useGetUserProfile } from '@/hooks/useGetUserProfile';
import { API_SERVICES } from '@/service';
import axios from 'axios';
import { SyntheticEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { mutate } from 'swr';

const ProfilePageWrapper = () => {
  return (
    <PrivateRoute>
      <ProfilePage />
    </PrivateRoute>
  );
};

const ProfilePage = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const { profile, isLoading } = useGetUserProfile();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    phone: profile?.profile.phoneNumber,
    document: profile?.profile.document,
  });

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.request({
      method: 'POST',
      url: API_SERVICES.fileUpload,
      data: {
        fileName: image?.name,
        fileType: image?.type,
      },
    });

    const fd = new FormData();

    const { url, fields } = response.data.postData;

    Object.entries(fields).forEach(([key, value]) => {
      fd.append(key, value as string);
    });

    fd.append('file', image as File);

    await axios.request({
      method: 'POST',
      url,
      data: fd,
    });

    await axios.request({
      method: 'POST',
      url: API_SERVICES.profile,
      data: {
        document: formData.document,
        phoneNumber: formData.phone,
        image: response.data.key,
      },
    });

    await mutate(API_SERVICES.profile);

    setLoading(false);
    toast.success('Perfil actualizado correctamente');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center p-10 gap-3'>
      <section>
        <div>
          <h1>Perfil</h1>
        </div>
      </section>
      <section>
        <form onSubmit={submitForm} className='flex gap-6 items-center'>
          <div>
            <button
              type='button'
              onClick={() => {
                if (fileInput.current) {
                  fileInput.current.click();
                }
              }}
            >
              <Image
                src={
                  image
                    ? URL.createObjectURL(image)
                    : profile?.profile.image ?? '/media/default-user.jpg'
                }
                alt='user name'
                title='user name'
                width='150'
                height='150'
                className='max-w-full rounded-full'
              />
            </button>
            <input
              ref={fileInput}
              className='hidden'
              required
              type='file'
              accept='image/*'
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <label htmlFor='phone'>
              <span>Teléfono</span>
              <input
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                }}
                type='tel'
                required
                name='phone'
                placeholder='+573000000'
              />
            </label>
            <label htmlFor='document'>
              <span>Documento</span>
              <input
                value={formData.document}
                onChange={(e) => {
                  setFormData({ ...formData, document: e.target.value });
                }}
                type='text'
                required
                name='document'
                placeholder='123456789'
              />
            </label>
            <PrimaryActionButton
              loading={loading}
              onClick={() => {}}
              text='Guardar'
              type='submit'
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProfilePageWrapper;
