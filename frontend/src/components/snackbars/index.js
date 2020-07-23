import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as contractAction from 'actions/contractAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SnackBars({ type }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const success = () => {
      toast.dismiss();
      toast.success('Successfully !');
      dispatch(contractAction.isLoading(0));
    };
    const error = () => {
      toast.dismiss();
      toast.error('Something went wrong !');
      dispatch(contractAction.isLoading(0));
    };
    const info = () => {
      toast.dismiss();
      toast.info('Waiting for valid transaction !');
      dispatch(contractAction.isLoading(0));
    };

    if (type === 'success') success();
    else if (type === 'waiting') info();
    else if (type === 'error') error();
  }, [type, dispatch]);

  return <ToastContainer />;
}
