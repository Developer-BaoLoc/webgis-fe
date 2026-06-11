const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? '';

export function resolveMediaUrl(
  fileUrl?: string | null,
): string {
  if (!fileUrl) {
    return '';
  }

  if (
    fileUrl.startsWith('http://') ||
    fileUrl.startsWith('https://')
  ) {
    return fileUrl;
  }

  return `${API_URL}${fileUrl}`;
}

export interface MediaRecord {
  id: number;
  entity_type: string;
  entity_id: number;
  file_type: 'icon' | 'image';
  file_url: string;
  original_name?: string;
  description?: string;
  sort_order?: number;
  created_at?: string;
}
