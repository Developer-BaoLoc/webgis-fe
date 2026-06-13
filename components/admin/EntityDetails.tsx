'use client';

import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { resolveMediaUrl, type MediaRecord } from '@/lib/media';
import type { AdminEntityConfig } from '@/lib/admin/entities';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

interface Props {
    config: AdminEntityConfig;
    data: Record<string, any>;
}

export default function EntityDetails({ config, data }: Props) {
    const [media, setMedia] = useState<MediaRecord[]>([]);
    const [loadingMedia, setLoadingMedia] = useState(false);

    // Load media for this entity
    useEffect(() => {
        const loadMedia = async () => {
            setLoadingMedia(true);
            try {
                const response = await fetchWithAuth(
                    api.mediaByEntity(config.mediaEntityType, data.id),
                );
                setMedia(Array.isArray(response) ? response : []);
            } catch (err) {
                console.error('Failed to load media:', err);
            } finally {
                setLoadingMedia(false);
            }
        };

        if (data.id) {
            loadMedia();
        }
    }, [data.id, config.mediaEntityType]);

    // Group fields by category
    const basicFields = config.fields.filter(
        (f) =>
            !['production_process', 'production', 'sales_channel', 'annual_cost', 'annual_income', 'annual_profit', 'geomGeoJson'].includes(
                f.key,
            ),
    );

    const productionFields = config.fields.filter((f) =>
        ['production_process', 'production', 'sales_channel', 'annual_cost', 'annual_income', 'annual_profit'].includes(
            f.key,
        ),
    );

    const hasProductionData = productionFields.some((f) => data[f.key]);

    const renderValue = (field: any, value: any): React.ReactNode => {
        if (value === null || value === undefined || value === '') {
            return <span style={{ color: '#9ca3af' }}>-</span>;
        }

        if (field.key === 'geomGeoJson') {
            return (
                <pre
                    style={{
                        background: '#f3f4f6',
                        padding: '12px',
                        borderRadius: '6px',
                        overflow: 'auto',
                        fontSize: '12px',
                        maxHeight: '300px',
                    }}
                >
                    {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                </pre>
            );
        }

        if (field.type === 'textarea') {
            return (
                <div
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        color: '#1f2937',
                    }}
                >
                    {value}
                </div>
            );
        }

        return <div style={{ color: '#1f2937' }}>{value}</div>;
    };

    return (
        <div style={{ display: 'grid', gap: '32px' }}>
            {/* Basic Info Section */}
            <section>
                <h2
                    style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        marginBottom: '16px',
                        color: '#1f2937',
                        borderBottom: '2px solid #e5e7eb',
                        paddingBottom: '12px',
                    }}
                >
                    Thông tin cơ bản
                </h2>
                <div
                    style={{
                        display: 'grid',
                        gap: '16px',
                    }}
                >
                    {basicFields.map((field) => {
                        const value = data[field.key];
                        if (field.key === 'latitude' || field.key === 'longitude') {
                            return null;
                        }
                        return (
                            <div
                                key={field.key}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '200px 1fr',
                                    gap: '16px',
                                    borderBottom: '1px solid #f3f4f6',
                                    paddingBottom: '12px',
                                }}
                            >
                                <div style={{ fontWeight: 600, color: '#374151' }}>
                                    {field.label}:
                                </div>
                                <div>{renderValue(field, value)}</div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Production Info Section */}
            {hasProductionData && (
                <section>
                    <h2
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                            color: '#1f2937',
                            borderBottom: '2px solid #e5e7eb',
                            paddingBottom: '12px',
                        }}
                    >
                        Thông tin sản xuất
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gap: '16px',
                        }}
                    >
                        {productionFields.map((field) => {
                            const value = data[field.key];
                            return (
                                <div
                                    key={field.key}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns:
                                            field.type === 'textarea'
                                                ? '200px 1fr'
                                                : '200px 1fr',
                                        gap: '16px',
                                        borderBottom: '1px solid #f3f4f6',
                                        paddingBottom: '12px',
                                    }}
                                >
                                    <div style={{ fontWeight: 600, color: '#374151' }}>
                                        {field.label}:
                                    </div>
                                    <div>{renderValue(field, value)}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Geometry Info Section */}
            {config.fields.some((f) => f.key === 'geomGeoJson') && (
                <section>
                    <h2
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                            color: '#1f2937',
                            borderBottom: '2px solid #e5e7eb',
                            paddingBottom: '12px',
                        }}
                    >
                        Thông tin địa lý
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '200px 1fr',
                            gap: '16px',
                        }}
                    >
                        {config.fields
                            .filter((f) => f.key === 'geomGeoJson')
                            .map((field) => {
                                const value = data.geom || data.geomGeoJson;
                                return (
                                    <div key={field.key}>
                                        <div style={{ fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                                            {field.label}:
                                        </div>
                                        {renderValue(field, value)}
                                    </div>
                                );
                            })}
                    </div>
                </section>
            )}

            {/* Media Section */}
            {media.length > 0 && (
                <section>
                    <h2
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                            color: '#1f2937',
                            borderBottom: '2px solid #e5e7eb',
                            paddingBottom: '12px',
                        }}
                    >
                        Phương tiện
                    </h2>

                    {/* Icon */}
                    {media
                        .filter((m) => m.file_type === 'icon')
                        .map((item) => (
                            <div key={item.id} style={{ marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>
                                    Biểu tượng
                                </h3>
                                <img
                                    src={resolveMediaUrl(item.file_url)}
                                    alt="Icon"
                                    style={{
                                        width: '96px',
                                        height: '96px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        border: '1px solid #e5e7eb',
                                    }}
                                />
                            </div>
                        ))}

                    {/* Images */}
                    {media.filter((m) => m.file_type === 'image').length > 0 && (
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#374151' }}>
                                Hình ảnh
                            </h3>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                    gap: '12px',
                                }}
                            >
                                {media
                                    .filter((m) => m.file_type === 'image')
                                    .map((item) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                border: '1px solid #e5e7eb',
                                            }}
                                        >
                                            <img
                                                src={resolveMediaUrl(item.file_url)}
                                                alt={item.original_name || 'Image'}
                                                style={{
                                                    width: '100%',
                                                    height: '120px',
                                                    objectFit: 'cover',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    window.open(resolveMediaUrl(item.file_url), '_blank');
                                                }}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {loadingMedia && (
                <div style={{ color: '#6b7280', fontStyle: 'italic' }}>Đang tải phương tiện...</div>
            )}
        </div>
    );
}
