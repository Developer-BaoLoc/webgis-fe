'use client';

import Toast from './Toast';
import type { ToastMessage } from '@/hooks/useToast';

interface Props {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export default function ToastContainer({
  toasts,
  onClose,
}: Props) {
  if (!toasts.length) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{ pointerEvents: 'auto' }}
        >
          <Toast toast={toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}
