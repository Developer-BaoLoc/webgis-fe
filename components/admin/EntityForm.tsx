'use client';

import { useEffect, useMemo, useState } from 'react';

import type { AdminEntityConfig } from '@/lib/admin/entities';
import { getErrorMessage } from '@/lib/fetchWithAuth';

interface Props {
  config: AdminEntityConfig;
  initialValues?: Record<string, unknown>;
  submitLabel: string;
  onSubmit: (
    values: Record<string, unknown>,
  ) => Promise<void>;
}

const EMPTY_INITIAL_VALUES: Record<
  string,
  unknown
> = {};

export default function EntityForm({
  config,
  initialValues,
  submitLabel,
  onSubmit,
}: Props) {
  const safeInitialValues =
    initialValues ??
    EMPTY_INITIAL_VALUES;

  const memoizedInitialValues = useMemo(
    () =>
      buildFormValues(
        config,
        safeInitialValues,
      ),
    [config, safeInitialValues],
  );

  const [values, setValues] = useState<
    Record<string, string>
  >(memoizedInitialValues);

  useEffect(() => {
    setValues(memoizedInitialValues);
  }, [memoizedInitialValues]);

  const [error, setError] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    setSaving(true);
    setError('');

    try {
      const payload: Record<
        string,
        unknown
      > = {};

      config.fields.forEach((field) => {
        const raw =
          values[field.key];

        if (raw === '') {
          return;
        }

        if (
          field.type === 'number'
        ) {
          payload[field.key] =
            Number(raw);
          return;
        }

        if (
          field.key ===
          'geomGeoJson'
        ) {
          payload.geomGeoJson =
            JSON.parse(raw);
          return;
        }

        payload[field.key] = raw;
      });

      await onSubmit(payload);
    } catch (err) {
      setError(
        getErrorMessage(err),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        gap: 16,
        maxWidth: 900,
        paddingBottom: 24,
      }}
    >
      {error && (
        <p
          style={{
            color: '#dc2626',
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {config.fields.map(
          (field) => (
            <label
              key={field.key}
              style={{
                display: 'grid',
                gap: 6,
                gridColumn:
                  field.type ===
                  'textarea'
                    ? '1 / -1'
                    : undefined,
              }}
            >
              <span>
                {field.label}
                {field.required
                  ? ' *'
                  : ''}
              </span>

              {field.type ===
              'textarea' ? (
                <textarea
                  value={
                    values[
                      field.key
                    ] ?? ''
                  }
                  onChange={(
                    event,
                  ) =>
                    setValues(
                      (
                        current,
                      ) => ({
                        ...current,
                        [field.key]:
                          event
                            .target
                            .value,
                      }),
                    )
                  }
                  rows={
                    field.key ===
                    'geomGeoJson'
                      ? 8
                      : 4
                  }
                  required={
                    field.required
                  }
                />
              ) : (
                <input
                  type={
                    field.type ??
                    'text'
                  }
                  value={
                    values[
                      field.key
                    ] ?? ''
                  }
                  onChange={(
                    event,
                  ) =>
                    setValues(
                      (
                        current,
                      ) => ({
                        ...current,
                        [field.key]:
                          event
                            .target
                            .value,
                      }),
                    )
                  }
                  required={
                    field.required
                  }
                  step={
                    field.type ===
                    'number'
                      ? 'any'
                      : undefined
                  }
                />
              )}
            </label>
          ),
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        style={{
          width: 'fit-content',
          padding:
            '10px 16px',
          background:
            '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: saving
            ? 'not-allowed'
            : 'pointer',
          opacity: saving
            ? 0.7
            : 1,
        }}
      >
        {saving
          ? 'Saving...'
          : submitLabel}
      </button>
    </form>
  );
}

function buildFormValues(
  config: AdminEntityConfig,
  initialValues: Record<
    string,
    unknown
  >,
) {
  const next: Record<
    string,
    string
  > = {};

  config.fields.forEach(
    (field) => {
      const value =
        initialValues[
          field.key
        ];

      if (
        field.key ===
        'geomGeoJson'
      ) {
        const geom =
          initialValues.geom;

        next[field.key] = geom
          ? JSON.stringify(
              geom,
              null,
              2,
            )
          : '';

        return;
      }

      next[field.key] =
        value !== undefined &&
        value !== null
          ? String(value)
          : '';
    },
  );

  return next;
}