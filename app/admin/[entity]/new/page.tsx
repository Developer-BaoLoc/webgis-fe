'use client';

import { useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';

import EntityForm from '@/components/admin/EntityForm';
import { getAdminEntityConfig } from '@/lib/admin/entities';
import { api } from '@/lib/api';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

import { getEntityDisplayName } from '@/lib/admin/getEntityDisplayName';
import { useToast } from '@/hooks/useToast';

export default function AdminEntityCreatePage() {
  const params = useParams();
  const router = useRouter();
  const entity = String(params.entity);

  const config = useMemo(
    () => getAdminEntityConfig(entity),
    [entity],
  );

  const { success, error: showError } = useToast();


  const handleSubmit = useCallback(
    async (values: Record<string, unknown>) => {
      try {
        const created = await fetchWithAuth(
          api.adminEntity(entity),
          {
            method: 'POST',
            body: JSON.stringify(values),
          },
        );

        success(
          'Tạo thành công',
          `${getEntityDisplayName(created)} đã được tạo`,
        );

        router.push(`/admin/${entity}`);
      } catch (err) {
        showError(
          'Tạo thất bại',
          err instanceof Error
            ? err.message
            : 'Có lỗi xảy ra',
        );

        throw err;
      }
    },
    [entity, router, success, showError],
  );

  return (
    <div>
      <h1>Create {config.label.slice(0, -1)}</h1>
      <EntityForm
        config={config}
        submitLabel="Create"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
