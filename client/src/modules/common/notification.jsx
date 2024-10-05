// src/utils/notification.js
import { toast } from 'react-toastify';

export const notify = (msg, type) => {
  if (type === 'success') {
    toast.success(msg, {
      position: 'bottom-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.warning(msg, {
      position: 'bottom-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
