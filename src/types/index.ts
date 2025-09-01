export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url?: string;
  pdf_url?: string;
  specifications: Record<string, string>;
  price?: number;
  is_featured?: boolean;
  is_active?: boolean;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  sort_order?: number;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  logo_url: string;
  description?: string;
  website?: string;
  industry?: string;
  is_featured?: boolean;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string;
  client_position?: string;
  content: string;
  rating: number;
  image_url?: string;
  is_featured?: boolean;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
  updated_at: string;
}

export interface QuoteRequest {
  id: string;
  product_id: string;
  product_name: string;
  client_name: string;
  client_email: string;
  client_company?: string;
  client_phone?: string;
  quantity: number;
  message?: string;
  status: 'pending' | 'quoted' | 'accepted' | 'rejected';
  quoted_price?: number;
  quote_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client_id: string;
  client_name: string;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  start_date: string;
  end_date?: string;
  budget?: number;
  actual_cost?: number;
  progress: number;
  project_manager?: string;
  notes?: string;
  attachments?: string[];
  created_at: string;
  updated_at: string;
}

export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploaded_by: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'editor';
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: any;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Catalogue {
  name: string;
  url: string;
  size: number;
  originalName?: string;
  image: string;
}