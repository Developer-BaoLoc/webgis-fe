import type { CooperativeProperties } from './types';

export function buildCooperativePopupHtml(
  props: CooperativeProperties,
): string {
  const {
    name,
    representative,
    business_type,
    phone,
    status,
  } = props;

  return `
    <div style="font-size:16px;font-weight:700;margin-bottom:10px;line-height:1.3;">
      ${name}
    </div>
    <div style="margin-bottom:8px;">
      <div style="font-weight:600;margin-bottom:2px;">Người đại diện:</div>
      <div>${representative ?? ''}</div>
    </div>
    <div style="margin-bottom:8px;">
      <div style="font-weight:600;margin-bottom:2px;">Ngành nghề:</div>
      <div>${business_type ?? ''}</div>
    </div>
    <div style="margin-bottom:8px;">
      <div style="font-weight:600;margin-bottom:2px;">Số điện thoại:</div>
      <div>${phone ?? ''}</div>
    </div>
    <div>
      <div style="font-weight:600;margin-bottom:2px;">Tình trạng:</div>
      <div>${status ?? ''}</div>
    </div>
  `;
}
