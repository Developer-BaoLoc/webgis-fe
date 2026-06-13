'use client';

import Link from 'next/link';

import { ADMIN_ENTITIES } from '@/lib/admin/entities';

export default function AdminOverviewPage() {
  return (
    <div className="admin-container">
      <h1>Bảng Điều Khiển Quản Trị</h1>
      <p>
        Quản lý các thực thể GIS, tài sản phương tiện, và nội dung bản đồ từ các phần dưới đây.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 24,
        }}
      >
        {ADMIN_ENTITIES.map((entity) => (
          <Link
            key={entity.key}
            href={`/admin/${entity.key}`}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: 16,
              textDecoration: 'none',
              color: '#111827',
            }}
          >
            <strong>{entity.label}</strong>
          </Link>
        ))}
        <Link
          href="/admin/media"
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 16,
            textDecoration: 'none',
            color: '#111827',
          }}
        >
          <strong>Phương Tiện</strong>
        </Link>
      </div>
    </div>
  );
}
