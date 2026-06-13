'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ADMIN_ENTITIES } from '@/lib/admin/entities';

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: '#f8fafc',
        overflow: 'hidden',
      }}
    >
      <aside
        style={{
          width: 260,
          background: '#111827',
          color: '#fff',
          padding: 20,
          flexShrink: 0,
          overflowY: 'auto',
          borderRight: '1px solid #374151',
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          WebGIS Quản trị
        </h2>
        <Link
          href="/"
          style={{
            color: '#93c5fd',
            display: 'block',
            marginBottom: 20,
          }}
        >
          Quay lại bản đồ
        </Link>
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <Link
            href="/admin"
            style={{
              color:
                pathname === '/admin'
                  ? '#fff'
                  : '#d1d5db',
              fontWeight:
                pathname === '/admin'
                  ? 700
                  : 400,
            }}
          >
            Tổng quan
          </Link>
          {ADMIN_ENTITIES.map((entity) => {
            const active = pathname.startsWith(
              `/admin/${entity.key}`,
            );

            return (
              <Link
                key={entity.key}
                href={`/admin/${entity.key}`}
                style={{
                  color: active
                    ? '#fff'
                    : '#d1d5db',
                  fontWeight: active
                    ? 700
                    : 400,
                }}
              >
                {entity.label}
              </Link>
            );
          })}
          <Link
            href="/admin/media"
            style={{
              color: pathname.startsWith(
                '/admin/media',
              )
                ? '#fff'
                : '#d1d5db',
              fontWeight: pathname.startsWith(
                '/admin/media',
              )
                ? 700
                : 400,
            }}
          >
            Phương tiện
          </Link>
        </nav>
      </aside>
      <main
        style={{
          flex: 1,
          padding: 24,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {children}
      </main>
    </div>
  );
}
