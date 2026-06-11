import { resolveMediaUrl } from '@/lib/media';

export interface EntityPopupFields {
  name: string;
  representative?: string;
  address?: string;
  business_type?: string;
  phone?: string;
  status?: string;
  type?: string;
  images?: string[] | null;
}

export function buildEntityPopupHtml(
  props: EntityPopupFields,
): string {
  const {
    name,
    representative,
    address,
    business_type,
    phone,
    status,
    type,
    images,
  } = props;

  const imageList = Array.isArray(images)
    ? images
    : [];

  const gallery =
    imageList.length > 0
      ? `
    <div style="margin-top:12px;">
      <div style="font-weight:600;margin-bottom:6px;">Hình ảnh:</div>
      <div style="display:flex;gap:6px;overflow-x:auto;max-width:260px;padding-bottom:4px;">
        ${imageList
          .map((imageUrl) => {
            const fullUrl =
              resolveMediaUrl(imageUrl);

            return `
              <img
                src="${fullUrl}"
                alt=""
                style="width:64px;height:64px;object-fit:cover;border-radius:6px;cursor:pointer;flex:0 0 auto;"
                onclick="window.open('${fullUrl}', '_blank')"
              />
            `;
          })
          .join('')}
      </div>
    </div>
  `
      : '';

  const sections = [
    representative
      ? `<div style="margin-bottom:8px;"><div style="font-weight:600;margin-bottom:2px;">Người đại diện:</div><div>${representative}</div></div>`
      : '',
    address
      ? `<div style="margin-bottom:8px;"><div style="font-weight:600;margin-bottom:2px;">Địa chỉ:</div><div>${address}</div></div>`
      : '',
    business_type
      ? `<div style="margin-bottom:8px;"><div style="font-weight:600;margin-bottom:2px;">Ngành nghề:</div><div>${business_type}</div></div>`
      : '',
    type
      ? `<div style="margin-bottom:8px;"><div style="font-weight:600;margin-bottom:2px;">Loại:</div><div>${type}</div></div>`
      : '',
    phone
      ? `<div style="margin-bottom:8px;"><div style="font-weight:600;margin-bottom:2px;">Số điện thoại:</div><div>${phone}</div></div>`
      : '',
    status
      ? `<div><div style="font-weight:600;margin-bottom:2px;">Tình trạng:</div><div>${status}</div></div>`
      : '',
  ].join('');

  return `
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;line-height:1.3;">
      ${name}
    </div>
    ${sections}
    ${gallery}
  `;
}
