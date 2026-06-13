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

// Helper function to parse value and unit
function parseValueAndUnit(
  fieldKey: string,
  rawValue: string,
): { value: string; unit: string } {
  if (!rawValue) {
    if (fieldKey === 'area_ha') {
      return { value: '', unit: 'ha' };
    } else if (fieldKey === 'production') {
      return { value: '', unit: 'tấn' };
    }
    return { value: '', unit: '' };
  }

  const match = rawValue.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
  if (match) {
    return { value: match[1], unit: match[2].trim() };
  }

  return { value: rawValue, unit: '' };
}

// Helper function to merge value and unit
function mergeValueAndUnit(value: string, unit: string): string {
  if (!value) return '';
  return `${value} ${unit}`;
}

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

  const [units, setUnits] = useState<
    Record<string, string>
  >({
    area_ha: 'ha',
    production: 'tấn',
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setValues(memoizedInitialValues);

    // Parse units from initial values
    const parsedUnits = { ...units };

    const areaValue = memoizedInitialValues.area_ha;
    if (areaValue) {
      const { unit } = parseValueAndUnit('area_ha', areaValue);
      if (unit) parsedUnits.area_ha = unit;
    }

    const productionValue = memoizedInitialValues.production;
    if (productionValue) {
      const { unit } = parseValueAndUnit('production', productionValue);
      if (unit) parsedUnits.production = unit;
    }

    setUnits(parsedUnits);
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
      if (field.required) {
        const fieldValue = field.key === 'area_ha' || field.key === 'production'
          ? values[field.key]
          : values[field.key];

        if (!fieldValue?.trim()) {
          errors[field.key] = `${field.label} là bắt buộc`;
        }
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
        let raw = values[field.key];

        if (raw === '') {
          return;
        }

        // Merge value and unit for area_ha and production
        if (field.key === 'area_ha' || field.key === 'production') {
          const unit = units[field.key] || '';
          raw = mergeValueAndUnit(raw, unit);
        }

        if (
          field.type === 'number'
        ) {
          // For numeric fields that need unit merging, we already merged above
          if (field.key === 'area_ha' || field.key === 'production') {
            payload[field.key] = raw;
          } else {
            payload[field.key] = Number(raw);
          }
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
    const hasError = validationErrors[field.key];

    if (field.key === 'area_ha') {
      const { value } = parseValueAndUnit('area_ha', values[field.key]);
      return (
        <>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="number"
              value={value}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                }))
              }
              placeholder="nhập số"
              required={field.required}
              step="any"
              style={{
                flex: 1,
                borderColor: hasError ? '#dc2626' : undefined,
              }}
            />
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 0 }}>
                <input
                  type="radio"
                  name="area_unit"
                  value="ha"
                  checked={units.area_ha === 'ha'}
                  onChange={() =>
                    setUnits((current) => ({
                      ...current,
                      area_ha: 'ha',
                    }))
                  }
                />
                ha
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 0 }}>
                <input
                  type="radio"
                  name="area_unit"
                  value="m²"
                  checked={units.area_ha === 'm²'}
                  onChange={() =>
                    setUnits((current) => ({
                      ...current,
                      area_ha: 'm²',
                    }))
                  }
                />
                m²
              </label>
            </div>
          </div>
          {hasError && (
            <span className="form-error">{hasError}</span>
          )}
        </>
      );
    }

    if (field.key === 'production') {
      const { value } = parseValueAndUnit('production', values[field.key]);
      return (
        <>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <textarea
              value={value}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                }))
              }
              placeholder={field.placeholder}
              rows={4}
              required={field.required}
              style={{
                flex: 1,
                borderColor: hasError ? '#dc2626' : undefined,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 0 }}>
                <input
                  type="radio"
                  name="production_unit"
                  value="lít"
                  checked={units.production === 'lít'}
                  onChange={() =>
                    setUnits((current) => ({
                      ...current,
                      production: 'lít',
                    }))
                  }
                />
                lít
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 0 }}>
                <input
                  type="radio"
                  name="production_unit"
                  value="ha"
                  checked={units.production === 'ha'}
                  onChange={() =>
                    setUnits((current) => ({
                      ...current,
                      production: 'ha',
                    }))
                  }
                />
                ha
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 0 }}>
                <input
                  type="radio"
                  name="production_unit"
                  value="tấn"
                  checked={units.production === 'tấn'}
                  onChange={() =>
                    setUnits((current) => ({
                      ...current,
                      production: 'tấn',
                    }))
                  }
                />
                tấn
              </label>
            </div>
          </div>
          {hasError && (
            <span className="form-error">{hasError}</span>
          )}
        </>
      );
    }

    if (field.type === 'textarea') {
      const value = values[field.key] ?? '';
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
      const value = values[field.key] ?? '';
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

    const value = values[field.key] ?? '';
    return (
      <>
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
        </div>
        {hasError && (
          <span className="form-error">{hasError}</span>
        )}
      </>
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
            className={`form-group ${field.type === 'textarea' && field.key !== 'production'
                ? 'full-width'
                : field.key === 'production' ? 'full-width' : ''
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

      // For area_ha and production, extract just the numeric value
      if (field.key === 'area_ha' || field.key === 'production') {
        if (value) {
          const { value: numValue } = parseValueAndUnit(field.key, String(value));
          next[field.key] = numValue;
        } else {
          next[field.key] = '';
        }
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
