import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SnackBars({ type }) {
  useEffect(() => {
    const success = () => {
      toast.dismiss();
      toast.success('Successfully !');
    };
    const error = () => {
      toast.dismiss();
      toast.error('Something went wrong !');
    };
    const info = () => {
      toast.dismiss();
      toast.info('Waiting for valid transaction !');
    };

    if (type === 'success') success();
    else if (type === 'waiting') info();
    else if (type === 'error') error();
  }, [type]);

  return <ToastContainer />;
}
