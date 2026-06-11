export interface SelectedOcopEntity {
  id: number;
  name: string;
  representative: string;
  address: string;
  phone: string;
  status: string;
  icon?: string | null;
  images?: string[];
}

export interface OcopEntityProperties {
  id: number;
  name: string;
  representative: string;
  address: string;
  phone: string;
  status: string;
  icon?: string | null;
  images?: string[];
}
