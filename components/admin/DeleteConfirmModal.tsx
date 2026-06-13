'use client';

interface Props {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteConfirmModal({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  loading = false,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">{message}</div>
        <div className="modal-footer">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="btn btn-danger"
          >
            {loading ? 'Đang xóa...' : 'Xóa'}
          </button>
        </div>
      </div>
    </div>
  );
}
