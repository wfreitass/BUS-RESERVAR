export interface SearchRequest {
  origin_id?: string;
  destination_id?: string;
  origin_state?: string;
  destination_state?: string;
  date?: string;
  from?: string;
  to?: string;
  travelDate?: string;
  'include-connections'?: boolean;
  [key: string]: any;
}
