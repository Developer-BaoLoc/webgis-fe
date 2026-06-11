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
    `${ getEntityDisplayName(deleteRow) } đã được xóa`,
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>
          {config.label} </h1>

        ```
        <Link
          href={`/admin/${config.key}/new`}
          style={{
            padding: '10px 14px',
            background: '#2563eb',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          Create
        </Link>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          overflow: 'auto',
          border: '1px solid #e5e7eb',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: 'left',
                  padding: 12,
                  borderBottom:
                    '1px solid #e5e7eb',
                  background: '#f9fafb',
                }}
              >
                STT
              </th>

              {config.listColumns.map(
                (column) => (
                  <th
                    key={column}
                    style={{
                      textAlign: 'left',
                      padding: 12,
                      borderBottom:
                        '1px solid #e5e7eb',
                      background: '#f9fafb',
                    }}
                  >
                    {column}
                  </th>
                ),
              )}

              <th
                style={{
                  textAlign: 'left',
                  padding: 12,
                  borderBottom:
                    '1px solid #e5e7eb',
                  background: '#f9fafb',
                }}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={String(row.id)}>
                <td
                  style={{
                    padding: 12,
                    borderBottom:
                      '1px solid #f3f4f6',
                  }}
                >
                  {index + 1}
                </td>

                {config.listColumns.map(
                  (column) => (
                    <td
                      key={column}
                      style={{
                        padding: 12,
                        borderBottom:
                          '1px solid #f3f4f6',
                      }}
                    >
                      {String(
                        row[column] ?? '',
                      )}
                    </td>
                  ),
                )}

                <td
                  style={{
                    padding: 12,
                    borderBottom:
                      '1px solid #f3f4f6',
                  }}
                >
                  <Link
                    href={`/admin/${config.key}/${row.id}`}
                    style={{
                      marginRight: 12,
                    }}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      setDeleteRow(row)
                    }
                  >
                    Delete
                  </button>
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
            : 'This action cannot be undone.'
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
