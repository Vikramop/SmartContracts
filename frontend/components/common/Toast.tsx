import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (msg: string, type: 'success' | 'error' = 'success') =>
  type === 'error' ? toast.error(msg) : toast.success(msg);

export default function ToastRoot() {
  return <ToastContainer position="top-right" />;
}
