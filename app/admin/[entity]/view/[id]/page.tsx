'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import EntityDetails from '@/components/admin/EntityDetails';
import { getAdminEntityConfig } from '@/lib/admin/entities';
import { api } from '@/lib/api';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

export default function AdminEntityViewPage() {
    const params = useParams();
    const router = useRouter();
    const entity = String(params.entity);
    const id = Number(params.id);

    const config = useMemo(
        () => getAdminEntityConfig(entity),
        [entity],
    );

    const [record, setRecord] = useState<Record<string, any> | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecord = async () => {
            try {
                const data = await fetchWithAuth(
                    api.adminEntityById(entity, id),
                );
                setRecord(data);
            } catch (err) {
                setError(String(err));
            } finally {
                setLoading(false);
            }
        };

        loadRecord();
    }, [entity, id]);

    if (loading) {
        return <div style={{ padding: '24px' }}>Đang tải...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '24px', color: '#dc2626' }}>
                <p>Lỗi: {error}</p>
                <Link href={`/admin/${entity}`} className="btn btn-secondary">
                    Quay lại
                </Link>
            </div>
        );
    }

    if (!record) {
        return (
            <div style={{ padding: '24px' }}>
                <p>Không tìm thấy dữ liệu.</p>
                <Link href={`/admin/${entity}`} className="btn btn-secondary">
                    Quay lại
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            {/* Header with Back and Edit buttons */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    gap: '12px',
                }}
            >
                <h1
                    style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#1f2937',
                        margin: 0,
                    }}
                >
                    Chi tiết {config.label}
                </h1>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link href={`/admin/${entity}`} className="btn btn-secondary">
                        Quay lại
                    </Link>
                    <Link
                        href={`/admin/${entity}/${id}/edit`}
                        className="btn btn-primary"
                    >
                        Chỉnh sửa
                    </Link>
                </div>
            </div>

            {/* Details Card */}
            <div
                style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
            >
                <EntityDetails config={config} data={record} />
            </div>
        </div>
    );
}
