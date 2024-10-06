import { toast as toastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toast = {
  success: (message) => toastify.success(message),
  error: (message) => toastify.error(message),
};
