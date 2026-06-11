export type GeometryKind =
  | 'point'
  | 'polygon'
  | 'none';

export interface AdminField {
  key: string;
  label: string;
  type?:
    | 'text'
    | 'textarea'
    | 'number';
  required?: boolean;
}

function field(
  key: string,
  label: string,
  options: Pick<
    AdminField,
    'type' | 'required'
  > = {},
): AdminField {
  return { key, label, ...options };
}

function agricultureFields(
  numeric = false,
): AdminField[] {
  const numericType = numeric ? 'number' : 'text';

  return [
    field('name', 'Name', { required: true }),
    field('representative', 'Representative'),
    field('address', 'Address', { type: 'textarea' }),
    field('business_type', 'Business Type'),
    field('area_ha', 'Area (ha)', { type: numericType }),
    field('production_process', 'Production Process', {
      type: 'textarea',
    }),
    field('members', 'Members', {
      type: numeric ? 'number' : 'text',
    }),
    field('production', 'Production', { type: 'textarea' }),
    field('sales_channel', 'Sales Channel', {
      type: 'textarea',
    }),
    field('annual_cost', 'Annual Cost', { type: numericType }),
    field('annual_income', 'Annual Income', {
      type: numericType,
    }),
    field('annual_profit', 'Annual Profit', {
      type: numericType,
    }),
    field('phone', 'Phone'),
    field('status', 'Status'),
    field('note', 'Note', { type: 'textarea' }),
    field('latitude', 'Latitude', {
      type: 'number',
      required: true,
    }),
    field('longitude', 'Longitude', {
      type: 'number',
      required: true,
    }),
  ];
}

export interface AdminEntityConfig {
  key: string;
  label: string;
  mediaEntityType: string;
  geometry: GeometryKind;
  fields: AdminField[];
  listColumns: string[];
}

export const ADMIN_ENTITIES: AdminEntityConfig[] =
  [
    {
      key: 'cooperatives',
      label: 'Cooperatives',
      mediaEntityType: 'cooperative',
      geometry: 'point',
      listColumns: [
        'name',
        'representative',
        'phone',
        'status',
      ],
      fields: agricultureFields(true),
    },
    {
      key: 'cooperative-groups',
      label: 'Cooperative Groups',
      mediaEntityType: 'cooperative_group',
      geometry: 'point',
      listColumns: [
        'name',
        'representative',
        'phone',
        'status',
      ],
      fields: agricultureFields(),
    },
    {
      key: 'irrigations',
      label: 'Irrigations',
      mediaEntityType: 'irrigation',
      geometry: 'point',
      listColumns: [
        'name',
        'representative',
        'phone',
        'status',
      ],
      fields: agricultureFields(),
    },
    {
      key: 'effective-models',
      label: 'Effective Models',
      mediaEntityType: 'effective_model',
      geometry: 'point',
      listColumns: [
        'name',
        'type',
        'phone',
        'status',
      ],
      fields: [
        ...agricultureFields(),
        field('type', 'Type'),
      ],
    },
    {
      key: 'ocop-entities',
      label: 'OCOP Entities',
      mediaEntityType: 'ocop_entity',
      geometry: 'point',
      listColumns: [
        'name',
        'representative',
        'phone',
        'status',
      ],
      fields: [
        field('name', 'Name', { required: true }),
        field('representative', 'Representative'),
        field('address', 'Address', { type: 'textarea' }),
        field('phone', 'Phone'),
        field('status', 'Status'),
        field('note', 'Note', { type: 'textarea' }),
        field('latitude', 'Latitude', {
          type: 'number',
          required: true,
        }),
        field('longitude', 'Longitude', {
          type: 'number',
          required: true,
        }),
      ],
    },
    {
      key: 'ocop-products',
      label: 'OCOP Products',
      mediaEntityType: 'ocop_product',
      geometry: 'none',
      listColumns: [
        'product_name',
        'entity_id',
        'ranking',
        'business_type',
      ],
      fields: [
        field('product_name', 'Product Name', {
          required: true,
        }),
        field('entity_id', 'OCOP Entity ID', {
          type: 'number',
          required: true,
        }),
        field('ranking', 'Ranking'),
        field('business_type', 'Business Type'),
        field('area_ha', 'Area (ha)'),
        field('production_process', 'Production Process', {
          type: 'textarea',
        }),
        field('production', 'Production', { type: 'textarea' }),
        field('sales_channel', 'Sales Channel', {
          type: 'textarea',
        }),
        field('annual_cost', 'Annual Cost'),
        field('annual_income', 'Annual Income'),
        field('annual_profit', 'Annual Profit'),
      ],
    },
    {
      key: 'production-areas',
      label: 'Production Areas',
      mediaEntityType: 'production_area',
      geometry: 'polygon',
      listColumns: [
        'name',
        'representative',
        'phone',
        'status',
      ],
      fields: [
        ...agricultureFields().filter(
          (item) =>
            item.key !== 'latitude' &&
            item.key !== 'longitude',
        ),
        field('geomGeoJson', 'Polygon GeoJSON', {
          type: 'textarea',
          required: true,
        }),
      ],
    },
  ];

export function getAdminEntityConfig(
  key: string,
) {
  const config = ADMIN_ENTITIES.find(
    (entity) => entity.key === key,
  );

  if (!config) {
    throw new Error(`Unknown admin entity: ${key}`);
  }

  return config;
}
