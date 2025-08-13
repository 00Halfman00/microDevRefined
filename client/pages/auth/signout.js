'use client';
// --- import third-party modules/libraries --- //
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// --- import local hook --- //
import useRequest from '../../hooks/use-request';

function Singout() {
  const router = useRouter();
  const { sendRequest } = useRequest({
    url: '/api/users/signout',
    method: 'POST',
    onSuccess: () => router.push('/'),
  });

  // useEffect will automatically send the signout request as soon as component loads
  useEffect(() => {
    sendRequest();
  }, []);

  return null;
}

export default Singout;
