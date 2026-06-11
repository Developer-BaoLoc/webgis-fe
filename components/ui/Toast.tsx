'use client';

import { useEffect } from 'react';

import type { ToastMessage } from '@/hooks/useToast';

interface Props {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export default function Toast({
  toast,
  onClose,
}: Props) {
  useEffect(() => {
    const timeout = window.setTimeout(
      () => onClose(toast.id),
      4000,
    );

    return () => window.clearTimeout(timeout);
  }, [toast.id, onClose]);

  const isSuccess = toast.variant === 'success';

  return (
    <div
      role="status"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 12,
        width: 320,
        maxWidth: 'calc(100vw - 32px)',
        padding: '12px 14px',
        borderRadius: 8,
        border: `1px solid ${
          isSuccess ? '#bbf7d0' : '#fecaca'
        }`,
        background: isSuccess ? '#f0fdf4' : '#fef2f2',
        color: isSuccess ? '#14532d' : '#7f1d1d',
        boxShadow:
          '0 10px 30px rgba(15, 23, 42, 0.16)',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          {toast.title}
        </div>
        {toast.description && (
          <div
            style={{
              marginTop: 4,
              fontSize: 14,
              lineHeight: 1.4,
              color: isSuccess ? '#166534' : '#991b1b',
              overflowWrap: 'anywhere',
            }}
          >
            {toast.description}
          </div>
        )}
      </div>
      <button
        type="button"
        aria-label="Close notification"
        onClick={() => onClose(toast.id)}
        style={{
          width: 28,
          height: 28,
          border: 'none',
          borderRadius: 6,
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: 20,
          lineHeight: 1,
        }}
      >
        x
      </button>
    </div>
  );
}
