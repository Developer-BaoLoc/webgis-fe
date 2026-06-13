'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import EntityForm from '@/components/admin/EntityForm';
import MediaManager from '@/components/admin/MediaManager';
import { getAdminEntityConfig } from '@/lib/admin/entities';
import { transformRecordForForm } from '@/lib/admin/transformRecord';
import { api } from '@/lib/api';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

import { useToast } from '@/hooks/useToast';
import { getEntityDisplayName } from '@/lib/admin/getEntityDisplayName';

export default function AdminEntityEditPage() {
  const params = useParams();
  const entity = String(params.entity);
  const id = Number(params.id);
  const router = useRouter();
  const config = useMemo(
    () => getAdminEntityConfig(entity),
    [entity],
  );

  const [record, setRecord] = useState<
    Record<string, unknown> | null
  >(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWithAuth(
      api.adminEntityById(entity, id),
    )
      .then((data) =>
        setRecord(transformRecordForForm(data)),
      )
      .catch((err) => setError(String(err)));
  }, [entity, id]);

  const { success, error: showError } =
    useToast();

  const handleSubmit = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        const updated = await fetchWithAuth(
          api.adminEntityById(entity, id),
          {
            method: 'PUT',
            body: JSON.stringify(values),
          },
        );

        const entityData = Array.isArray(updated)
          ? updated[0]
          : updated;

        setRecord(entityData);

        success(
          'Cập nhật thành công',
          `${getEntityDisplayName(entityData)} đã được cập nhật`,
        );

        router.push(`/admin/${entity}`);
      } catch (err) {
        showError(
          'Cập nhật thất bại',
          err instanceof Error
            ? err.message
            : 'Có lỗi xảy ra',
        );

        throw err;
      }
    },
    [
      entity,
      id,
      success,
      showError,
      config,
    ],
  );

  if (error) {
    return <p style={{ color: '#dc2626' }}>{error}</p>;
  }

  if (!record) {
    return <p>Đang tải...</p>;
  }

  return (
    <div>
      <h1>
        Chỉnh sửa {config.label} #{id}
      </h1>
      <EntityForm
        config={config}
        initialValues={record}
        submitLabel="Lưu thay đổi"
        onSubmit={handleSubmit}
      />
      <MediaManager
        entityType={config.mediaEntityType}
        entityId={id}
      />
    </div>
  );
}
