'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import EntityTable from '@/components/admin/EntityTable';
import { getAdminEntityConfig } from '@/lib/admin/entities';
import { api } from '@/lib/api';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

export default function AdminEntityListPage() {
  const params = useParams();
  const entity = String(params.entity);
  const config = getAdminEntityConfig(entity);

  const [rows, setRows] = useState<
    Record<string, unknown>[]
  >([]);
  const [error, setError] = useState('');

  const loadRows = async () => {
    const data = await fetchWithAuth(
      api.adminEntity(entity),
    );
    setRows(data);
  };

  useEffect(() => {
    loadRows().catch((err) =>
      setError(String(err)),
    );
  }, [entity]);

  const handleDelete = async (id: number) => {
    await fetchWithAuth(
      api.adminEntityById(entity, id),
      { method: 'DELETE' },
    );
    await loadRows();
  };

  if (error) {
    return <p style={{ color: '#dc2626' }}>{error}</p>;
  }

  return (
    <EntityTable
      config={config}
      rows={rows}
      onDelete={handleDelete}
    />
  );
}
