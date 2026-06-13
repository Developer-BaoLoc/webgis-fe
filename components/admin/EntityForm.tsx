'use client';

import { useEffect, useMemo, useState } from 'react';

import type { AdminEntityConfig, AdminField } from '@/lib/admin/entities';
import { getErrorMessage } from '@/lib/fetchWithAuth';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { api } from '@/lib/api';

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

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setValues(memoizedInitialValues);
  }, [memoizedInitialValues]);

  const [error, setError] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  const [addressOptions, setAddressOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  // Load address options on mount
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const wards = await fetchWithAuth(api.wards);
        if (Array.isArray(wards.features)) {
          const options = wards.features.map((f: any) => ({
            label: f.properties.name,
            value: f.properties.name,
          }));
          setAddressOptions(options);
        }
      } catch (err) {
        console.error('Failed to load addresses:', err);
      }
    };
    loadAddresses();
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    config.fields.forEach((field) => {
      if (field.required && !values[field.key]?.trim()) {
        errors[field.key] = `${field.label} là bắt buộc`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      setError('Vui lòng điền tất cả các trường bắt buộc');
      return;
    }

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

  const renderFieldInput = (field: AdminField) => {
    const value = values[field.key] ?? '';
    const hasError = validationErrors[field.key];

    if (field.type === 'textarea') {
      return (
        <>
          <textarea
            value={value}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                [field.key]: event.target.value,
              }))
            }
            placeholder={field.placeholder}
            rows={
              field.key === 'geomGeoJson'
                ? 8
                : 4
            }
            required={field.required}
            style={{
              borderColor: hasError ? '#dc2626' : undefined,
            }}
          />
          {hasError && (
            <span className="form-error">{hasError}</span>
          )}
        </>
      );
    }

    if (field.type === 'select') {
      const selectOptions = field.key === 'address'
        ? addressOptions
        : field.options || [];

      return (
        <>
          <select
            value={value}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                [field.key]: event.target.value,
              }))
            }
            required={field.required}
            style={{
              borderColor: hasError ? '#dc2626' : undefined,
            }}
          >
            <option value="">-- Chọn {field.label} --</option>
            {selectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {hasError && (
            <span className="form-error">{hasError}</span>
          )}
        </>
      );
    }

    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type={field.type ?? 'text'}
          value={value}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              [field.key]: event.target.value,
            }))
          }
          placeholder={field.placeholder}
          required={field.required}
          step={
            field.type === 'number'
              ? 'any'
              : undefined
          }
          style={{
            flex: 1,
            borderColor: hasError ? '#dc2626' : undefined,
          }}
        />
        {field.unit && (
          <span style={{ whiteSpace: 'nowrap', color: '#666' }}>
            {field.unit}
          </span>
        )}
        {hasError && (
          <span className="form-error" style={{ gridColumn: '1 / -1' }}>{hasError}</span>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="admin-form"
    >
      {error && (
        <div className="form-error-message">
          {error}
        </div>
      )}

      <div className="form-grid">
        {config.fields.map((field) => (
          <label
            key={field.key}
            className={`form-group ${field.type === 'textarea'
                ? 'full-width'
                : ''
              }`}
          >
            <span>
              {field.label}
              {field.required
                ? <span className="required">*</span>
                : ''}
            </span>

            {renderFieldInput(field)}
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="btn btn-primary"
      >
        {saving
          ? 'Đang lưu...'
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
