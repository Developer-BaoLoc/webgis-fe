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
  | 'number'
  | 'select';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  unit?: string;
}

function field(
  key: string,
  label: string,
  options: Pick<
    AdminField,
    'type' | 'required' | 'placeholder' | 'unit'
  > = {},
): AdminField {
  return { key, label, ...options };
}

// Status options
const STATUS_OPTIONS = [
  { label: 'Đang hoạt động', value: 'Đang hoạt động' },
  { label: 'Ngưng hoạt động', value: 'Ngưng hoạt động' },
  { label: 'Tạm ngưng hoạt động', value: 'Tạm ngưng hoạt động' },
  { label: 'Hoạt động theo mùa (Hiện đang ngưng)', value: 'Hoạt động theo mùa (Hiện đang ngưng)' },
  { label: 'Hoạt động theo mùa (Hiện đang hoạt động)', value: 'Hoạt động theo mùa (Hiện đang hoạt động)' },
];

function agricultureFields(
  numeric = false,
): AdminField[] {
  const numericType = numeric ? 'number' : 'text';

  return [
    field('name', 'Tên', { required: true }),
    field('representative', 'Người đại diện', { required: true }),
    field('address', 'Địa chỉ', { type: 'select', required: true }),
    field('business_type', 'Loại hình kinh doanh'),
    field('area_ha', 'Diện tích', { type: numericType, placeholder: 'nhập số, đơn vị: m2 hoặc ha' }),
    field('production_process', 'Quy trình sản xuất', {
      type: 'textarea',
    }),
    field('members', 'Số thành viên', {
      type: numeric ? 'number' : 'text',
    }),
    field('production', 'Sản lượng', { type: 'textarea', placeholder: 'tấn hoặc ha' }),
    field('sales_channel', 'Kênh tiêu thụ', {
      type: 'textarea',
    }),
    field('annual_cost', 'Chi phí/năm', { type: numericType, unit: 'triệu đồng' }),
    field('annual_income', 'Thu nhập/năm', {
      type: numericType,
      unit: 'triệu đồng',
    }),
    field('annual_profit', 'Lợi nhuận/năm', {
      type: numericType,
      unit: 'triệu đồng',
    }),
    field('phone', 'Điện thoại'),
    field('status', 'Trạng thái', { type: 'select', required: true }),
    field('note', 'Ghi chú', { type: 'textarea' }),
    field('latitude', 'Vĩ độ', {
      type: 'number',
      required: true,
    }),
    field('longitude', 'Kinh độ', {
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
      label: 'Hợp tác xã',
      mediaEntityType: 'cooperative',
      geometry: 'point',
      listColumns: [
        'name',
        'representative',
        'phone',
        'status',
      ],
      fields: agricultureFields(true).map(f => {
        if (f.key === 'status' || f.key === 'address') {
          return { ...f, options: f.key === 'status' ? STATUS_OPTIONS : undefined };
        }
        return f;
      }),
    },
    {
      key: 'cooperative-groups',
      label: 'Tổ hợp tác xã',
      mediaEntityType: 'cooperative_group',
      geometry: 'point',
      listColumns: [
        'name',
        'representative',
        'phone',
        'status',
      ],
      fields: agricultureFields().map(f => {
        if (f.key === 'status' || f.key === 'address') {
          return { ...f, options: f.key === 'status' ? STATUS_OPTIONS : undefined };
        }
        return f;
      }),
    },
    {
      key: 'irrigations',
      label: 'Thủy lợi',
      mediaEntityType: 'irrigation',
      geometry: 'point',
      listColumns: [
        'name',
        'representative',
        'phone',
        'status',
      ],
      fields: agricultureFields().map(f => {
        if (f.key === 'status' || f.key === 'address') {
          return { ...f, options: f.key === 'status' ? STATUS_OPTIONS : undefined };
        }
        return f;
      }),
    },
    {
      key: 'effective-models',
      label: 'Mô hình hiệu quả',
      mediaEntityType: 'effective_model',
      geometry: 'point',
      listColumns: [
        'name',
        'type',
        'phone',
        'status',
      ],
      fields: [
        ...agricultureFields().map(f => {
          if (f.key === 'status' || f.key === 'address') {
            return { ...f, options: f.key === 'status' ? STATUS_OPTIONS : undefined };
          }
          return f;
        }),
        field('type', 'Loại mô hình'),
      ],
    },
    {
      key: 'ocop-entities',
      label: 'Sản phẩm OCOP',
      mediaEntityType: 'ocop_entity',
      geometry: 'point',
      listColumns: [
        'name',
        'representative',
        'phone',
        'status',
      ],
      fields: [
        field('name', 'Tên', { required: true }),
        field('representative', 'Người đại diện', { required: true }),
        field('address', 'Địa chỉ', { type: 'select', required: true }),
        field('phone', 'Điện thoại'),
        field('status', 'Trạng thái', { type: 'select', required: true, options: STATUS_OPTIONS }),
        field('note', 'Ghi chú', { type: 'textarea' }),
        field('latitude', 'Vĩ độ', {
          type: 'number',
          required: true,
        }),
        field('longitude', 'Kinh độ', {
          type: 'number',
          required: true,
        }),
      ],
    },
    {
      key: 'ocop-products',
      label: 'Chi tiết sản phẩm OCOP',
      mediaEntityType: 'ocop_product',
      geometry: 'none',
      listColumns: [
        'product_name',
        'entity_id',
        'ranking',
        'business_type',
      ],
      fields: [
        field('product_name', 'Tên sản phẩm', {
          required: true,
        }),
        field('entity_id', 'ID thực thể OCOP', {
          type: 'number',
          required: true,
        }),
        field('ranking', 'Xếp hạng'),
        field('business_type', 'Loại hình kinh doanh'),
        field('area_ha', 'Diện tích', { type: 'number', placeholder: 'nhập số, đơn vị: m2 hoặc ha' }),
        field('production_process', 'Quy trình sản xuất', {
          type: 'textarea',
        }),
        field('production', 'Sản lượng', { type: 'textarea', placeholder: 'tấn hoặc ha' }),
        field('sales_channel', 'Kênh tiêu thụ', {
          type: 'textarea',
        }),
        field('annual_cost', 'Chi phí/năm', { type: 'number', unit: 'triệu đồng' }),
        field('annual_income', 'Thu nhập/năm', { type: 'number', unit: 'triệu đồng' }),
        field('annual_profit', 'Lợi nhuận/năm', { type: 'number', unit: 'triệu đồng' }),
      ],
    },
    {
      key: 'production-areas',
      label: 'Khu vực sản xuất',
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
        ).map(f => {
          if (f.key === 'status' || f.key === 'address') {
            return { ...f, options: f.key === 'status' ? STATUS_OPTIONS : undefined };
          }
          return f;
        }),
        field('geomGeoJson', 'GeoJSON Polygon', {
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
