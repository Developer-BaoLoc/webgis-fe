'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import {
  resolveMediaUrl,
  type MediaRecord,
} from '@/lib/media';

interface Props {
  entityType: string;
  entityId: number;
}

export default function MediaManager({
  entityType,
  entityId,
}: Props) {
  const [media, setMedia] = useState<
    MediaRecord[]
  >([]);
  const [uploading, setUploading] =
    useState(false);
  const [error, setError] = useState('');

  const loadMedia = async () => {
    const data = await fetchWithAuth(
      api.mediaByEntity(
        entityType,
        entityId,
      ),
    );
    setMedia(data);
  };

  useEffect(() => {
    loadMedia().catch((err) =>
      setError(String(err)),
    );
  }, [entityType, entityId]);

  const uploadFile = async (
    file: File,
    fileType: 'icon' | 'image',
  ) => {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('entityType', entityType);
      formData.append(
        'entityId',
        String(entityId),
      );
      formData.append('fileType', fileType);

      await fetchWithAuth(
        api.mediaUpload,
        {
          method: 'POST',
          body: formData,
        },
      );

      await loadMedia();
    } catch (err) {
      setError(String(err));
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = async (id: number) => {
    await fetchWithAuth(api.mediaDelete(id), {
      method: 'DELETE',
    });
    await loadMedia();
  };

  const icon = media.find(
    (item) => item.file_type === 'icon',
  );
  const images = media.filter(
    (item) => item.file_type === 'image',
  );

  return (
    <div
      style={{
        marginTop: 24,
        padding: 16,
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Media</h3>
      {error && (
        <p style={{ color: '#dc2626' }}>{error}</p>
      )}

      <div style={{ marginBottom: 16 }}>
        <strong>Icon</strong>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 8,
          }}
        >
          {icon ? (
            <>
              <img
                src={resolveMediaUrl(
                  icon.file_url,
                )}
                alt="Icon"
                style={{
                  width: 48,
                  height: 48,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
              <button
                onClick={() =>
                  removeMedia(icon.id)
                }
              >
                Remove icon
              </button>
            </>
          ) : (
            <span style={{ color: '#6b7280' }}>
              No icon uploaded
            </span>
          )}
          <label
            style={{
              cursor: uploading
                ? 'not-allowed'
                : 'pointer',
            }}
          >
            <input
              type="file"
              accept="image/*"
              hidden
              disabled={uploading}
              onChange={(event) => {
                const file =
                  event.target.files?.[0];

                if (file) {
                  uploadFile(file, 'icon');
                }
              }}
            />
            <span
              style={{
                padding: '8px 12px',
                background: '#2563eb',
                color: '#fff',
                borderRadius: 8,
              }}
            >
              Upload icon
            </span>
          </label>
        </div>
      </div>

      <div>
        <strong>Images</strong>
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            marginTop: 8,
          }}
        >
          {images.map((image) => (
            <div
              key={image.id}
              style={{
                width: 96,
              }}
            >
              <img
                src={resolveMediaUrl(
                  image.file_url,
                )}
                alt={
                  image.original_name ??
                  'Image'
                }
                style={{
                  width: 96,
                  height: 96,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
              <button
                style={{
                  marginTop: 6,
                  width: '100%',
                }}
                onClick={() =>
                  removeMedia(image.id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <label
          style={{
            display: 'inline-block',
            marginTop: 12,
            cursor: uploading
              ? 'not-allowed'
              : 'pointer',
          }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            disabled={uploading}
            onChange={(event) => {
              const files =
                event.target.files;

              if (!files) {
                return;
              }

              Array.from(files).forEach(
                (file) => {
                  uploadFile(file, 'image');
                },
              );
            }}
          />
          <span
            style={{
              padding: '8px 12px',
              background: '#111827',
              color: '#fff',
              borderRadius: 8,
            }}
          >
            Upload images
          </span>
        </label>
      </div>
    </div>
  );
}
