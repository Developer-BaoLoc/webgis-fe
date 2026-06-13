'use client';

import Link from 'next/link';
import { useState } from 'react';

import DeleteConfirmModal from './DeleteConfirmModal';
import type { AdminEntityConfig } from '@/lib/admin/entities';
import { getEntityDisplayName } from '@/lib/admin/getEntityDisplayName';
import { useToast } from '@/hooks/useToast';

interface Props {
  config: AdminEntityConfig;
  rows: Record<string, unknown>[];
  onDelete: (id: number) => Promise<void>;
}

export default function EntityTable({
  config,
  rows,
  onDelete,
}: Props) {
  const { success, error } = useToast();

  const [deleteRow, setDeleteRow] = useState<
    Record<string, unknown> | null

  >(null);

  const [deleting, setDeleting] =
    useState(false);

  const confirmDelete = async () => {
    if (!deleteRow) {
      return;
    }


    setDeleting(true);

    try {
      await onDelete(Number(deleteRow.id));

      success(
        'Xóa thành công',
        `${getEntityDisplayName(deleteRow)} đã được xóa`,
      );

      setDeleteRow(null);
    } catch (err) {
      error(
        'Xóa thất bại',
        err instanceof Error
          ? err.message
          : String(err),
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="admin-header">
        <h1>{config.label}</h1>

        <Link
          href={`/admin/${config.key}/new`}
          className="btn btn-primary"
        >
          Thêm mới
        </Link>
      </div>

      <div className="entity-table-wrapper">
        <table className="entity-table">
          <thead>
            <tr>
              <th>STT</th>

              {config.listColumns.map(
                (column) => (
                  <th key={column}>
                    {column}
                  </th>
                ),
              )}

              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={String(row.id)}>
                <td>{index + 1}</td>

                {config.listColumns.map(
                  (column) => (
                    <td key={column}>
                      {String(
                        row[column] ?? '',
                      )}
                    </td>
                  ),
                )}

                <td>
                  <div className="entity-table-actions">
                    <Link
                      href={`/admin/${config.key}/view/${row.id}`}
                      className="btn btn-secondary btn-small"
                    >
                      Xem
                    </Link>

                    <Link
                      href={`/admin/${config.key}/${row.id}/edit`}
                      className="btn btn-secondary btn-small"
                    >
                      Sửa
                    </Link>

                    <button
                      className="btn btn-danger btn-small"
                      onClick={() =>
                        setDeleteRow(row)
                      }
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmModal
        open={deleteRow !== null}
        title="Xác nhận xóa"
        message={
          deleteRow
            ? `${getEntityDisplayName(deleteRow)} sẽ bị xóa. Hành động này không thể hoàn tác.`
            : 'Hành động này không thể hoàn tác.'
        }
        onCancel={() =>
          setDeleteRow(null)
        }
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </>
  );
}
