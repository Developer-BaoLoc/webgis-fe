'use client';

import { useEffect, useState } from 'react';

import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { api } from '@/lib/api';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import {
  resolveMediaUrl,
  type MediaRecord,
} from '@/lib/media';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<
    MediaRecord[]
  >([]);
  const [deleteId, setDeleteId] = useState<
    number | null
  >(null);
  const [deleting, setDeleting] =
    useState(false);

  const loadMedia = async () => {
    const data = await fetchWithAuth(api.media);
    setMedia(data);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const confirmDelete = async () => {
    if (deleteId === null) {
      return;
    }

    setDeleting(true);

    try {
      await fetchWithAuth(
        api.mediaDelete(deleteId),
        { method: 'DELETE' },
      );
      setDeleteId(null);
      await loadMedia();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h1>Media</h1>
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
              {[
                'id',
                'entity_type',
                'entity_id',
                'file_type',
                'preview',
                'original_name',
              ].map((column) => (
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
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {media.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: 12 }}>
                  {item.id}
                </td>
                <td style={{ padding: 12 }}>
                  {item.entity_type}
                </td>
                <td style={{ padding: 12 }}>
                  {item.entity_id}
                </td>
                <td style={{ padding: 12 }}>
                  {item.file_type}
                </td>
                <td style={{ padding: 12 }}>
                  <img
                    src={resolveMediaUrl(
                      item.file_url,
                    )}
                    alt=""
                    style={{
                      width: 48,
                      height: 48,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                </td>
                <td style={{ padding: 12 }}>
                  {item.original_name}
                </td>
                <td style={{ padding: 12 }}>
                  <button
                    onClick={() =>
                      setDeleteId(item.id)
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
        open={deleteId !== null}
        title="Delete media"
        message="This will remove the file from storage."
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}
