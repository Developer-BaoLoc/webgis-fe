export interface SelectedCooperativeGroup {
  id: number;
  name: string;
  representative: string;
  address: string;
  business_type: string;
  phone: string;
  status: string;
  icon?: string | null;
  images?: string[];
}

export interface CooperativeGroupProperties {
  id: number;
  name: string;
  representative: string;
  address: string;
  business_type: string;
  phone: string;
  status: string;
  icon?: string | null;
  images?: string[];
}
