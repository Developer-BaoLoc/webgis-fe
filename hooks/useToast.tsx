'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import ToastContainer from '@/components/ui/ToastContainer';

export type ToastVariant = 'success' | 'error';

export interface ToastMessage {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toasts: ToastMessage[];
  success: (
    title: string,
    description?: string,
  ) => string;
  error: (
    title: string,
    description?: string,
  ) => string;
  dismiss: (id: string) => void;
}

const ToastContext =
  createContext<ToastContextValue | null>(null);

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<
    ToastMessage[]
  >([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id),
    );
  }, []);

  const show = useCallback(
    (
      variant: ToastVariant,
      title: string,
      description?: string,
    ) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      setToasts((current) => [
        ...current,
        {
          id,
          variant,
          title,
          description,
        },
      ]);

      return id;
    },
    [],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toasts,
      success: (title, description) =>
        show('success', title, description),
      error: (title, description) =>
        show('error', title, description),
      dismiss,
    }),
    [dismiss, show, toasts],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        toasts={toasts}
        onClose={dismiss}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'useToast must be used within ToastProvider',
    );
  }

  return context;
}
