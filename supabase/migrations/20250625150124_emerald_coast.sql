/*
  # Initial Database Schema for Water Eco Best

  1. New Tables
    - `categories` - Product categories for water treatment systems
    - `products` - Water treatment products/systems catalog
    - `clients` - Client companies and partners
    - `testimonials` - Client testimonials and reviews
    - `contact_submissions` - Contact form submissions
    - `admin_users` - Admin panel users
    - `site_settings` - Website configuration settings

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access where appropriate
    - Add policies for admin write access
    - Add policies for contact form submissions

  3. Sample Data
    - Insert initial categories
    - Insert sample products
    - Insert sample clients
    - Insert sample testimonials
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  image_url text,
  pdf_url text,
  specifications jsonb DEFAULT '{}',
  price numeric(10,2),
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  description text,
  website text,
  industry text,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_company text NOT NULL,
  client_position text,
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Clients are publicly readable"
  ON clients FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Testimonials are publicly readable"
  ON testimonials FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Site settings are publicly readable"
  ON site_settings FOR SELECT
  TO public
  USING (true);

-- Contact form submission policy
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (true);

-- Admin policies (will be updated when auth is implemented)
CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage clients"
  ON clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial categories
INSERT INTO categories (name, description, sort_order) VALUES
('Reverse Osmosis Systems', 'Advanced reverse osmosis water purification systems for industrial applications', 1),
('Filtration Systems', 'Multi-stage filtration systems for suspended solids and contaminant removal', 2),
('Chemical Dosing', 'Automated chemical dosing systems for water treatment processes', 3),
('UV Sterilization', 'Ultraviolet disinfection systems for microbial control', 4),
('Water Softening', 'Ion exchange systems for hardness removal and water conditioning', 5),
('Wastewater Treatment', 'Complete wastewater treatment and recycling solutions', 6);

-- Insert sample products
INSERT INTO products (name, description, category, specifications, price, is_featured, sort_order) VALUES
('Industrial RO System 1000L/h', 'High-efficiency reverse osmosis system designed for small to medium industrial applications', 'Reverse Osmosis Systems', '{"Capacity": "1000 L/h", "Recovery Rate": "75%", "Power": "5.5 kW", "Pressure": "15 bar", "Material": "SS316"}', 12500.00, true, 1),
('Industrial RO System 5000L/h', 'Large capacity reverse osmosis system for high-demand industrial processes', 'Reverse Osmosis Systems', '{"Capacity": "5000 L/h", "Recovery Rate": "75%", "Power": "22 kW", "Pressure": "15 bar", "Material": "SS316"}', 45000.00, true, 2),
('Industrial RO System 10000L/h', 'Ultra-high capacity reverse osmosis system for major industrial facilities', 'Reverse Osmosis Systems', '{"Capacity": "10000 L/h", "Recovery Rate": "80%", "Power": "45 kW", "Pressure": "18 bar", "Material": "SS316"}', 85000.00, false, 3),
('Multi-Media Filter 5m³/h', 'Compact multi-media filtration system for suspended solids removal', 'Filtration Systems', '{"Flow Rate": "5 m³/h", "Filtration": "5 micron", "Material": "FRP", "Backwash": "Automatic", "Media": "Sand/Anthracite"}', 8500.00, true, 4),
('Multi-Media Filter 20m³/h', 'High-capacity multi-media filtration system for large-scale applications', 'Filtration Systems', '{"Flow Rate": "20 m³/h", "Filtration": "5 micron", "Material": "FRP", "Backwash": "Automatic", "Media": "Sand/Anthracite"}', 18500.00, false, 5),
('Chemical Dosing System', 'Precision chemical dosing system with PLC control for automated operation', 'Chemical Dosing', '{"Dosing Rate": "0.1-50 L/h", "Pressure": "10 bar", "Control": "PLC", "Pumps": "Diaphragm", "Material": "PP/PVDF"}', 3200.00, true, 6),
('UV Sterilization 10m³/h', 'High-intensity UV disinfection system for microbial control', 'UV Sterilization', '{"Flow Rate": "10 m³/h", "UV Dose": "40 mJ/cm²", "Power": "320W", "Lamps": "Low Pressure", "Material": "SS316"}', 2800.00, false, 7),
('Water Softener 15m³/h', 'Ion exchange water softening system for hardness removal', 'Water Softening', '{"Flow Rate": "15 m³/h", "Hardness Removal": "99%", "Resin": "Strong Acid Cation", "Regeneration": "Automatic", "Salt Usage": "150g/L"}', 6500.00, false, 8),
('Wastewater Treatment Plant', 'Complete biological wastewater treatment system with advanced controls', 'Wastewater Treatment', '{"Capacity": "100 m³/day", "BOD Removal": "95%", "COD Removal": "90%", "TSS Removal": "98%", "Control": "SCADA"}', 125000.00, true, 9);

-- Insert sample clients
INSERT INTO clients (name, logo_url, description, industry, is_featured, sort_order) VALUES
('Uzbekistan Chemical Industries', 'https://via.placeholder.com/200x100/2563eb/ffffff?text=UCI', 'Leading chemical processing and manufacturing company in Central Asia', 'Chemical Processing', true, 1),
('Central Asian Textiles', 'https://via.placeholder.com/200x100/059669/ffffff?text=CAT', 'Major textile manufacturing and processing facility', 'Textiles', true, 2),
('Tashkent Power Generation', 'https://via.placeholder.com/200x100/dc2626/ffffff?text=TPG', 'Thermal and renewable energy production company', 'Power Generation', true, 3),
('Samarkand Food Processing', 'https://via.placeholder.com/200x100/7c3aed/ffffff?text=SFP', 'Food and beverage manufacturing and processing', 'Food & Beverage', true, 4),
('Fergana Mining Corporation', 'https://via.placeholder.com/200x100/ea580c/ffffff?text=FMC', 'Mining and mineral processing operations', 'Mining & Metals', false, 5),
('Bukhara Pharmaceuticals', 'https://via.placeholder.com/200x100/0891b2/ffffff?text=BP', 'Pharmaceutical manufacturing and research facility', 'Pharmaceuticals', true, 6),
('Andijan Steel Works', 'https://via.placeholder.com/200x100/4338ca/ffffff?text=ASW', 'Steel production and metal processing plant', 'Steel & Metals', false, 7),
('Namangan Petrochemicals', 'https://via.placeholder.com/200x100/16a34a/ffffff?text=NP', 'Petrochemical processing and refining operations', 'Petrochemicals', false, 8);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_company, client_position, content, rating, is_featured) VALUES
('Ahmed Karimov', 'Uzbekistan Chemical Industries', 'Plant Manager', 'Outstanding water treatment solutions that exceeded our expectations. The system efficiency improved our production by 40% while reducing water consumption significantly.', 5, true),
('Dilshod Rakhimov', 'Central Asian Textiles', 'Operations Director', 'Professional service and reliable systems. Their technical support team is exceptional and always available when needed. We have had zero downtime since installation.', 5, true),
('Nargiza Sultanova', 'Samarkand Food Processing', 'Quality Manager', 'Cost-effective solutions with impressive results. We achieved 60% water savings within the first year of implementation, exceeding our sustainability goals.', 5, true),
('Rustam Abdullayev', 'Tashkent Power Generation', 'Chief Engineer', 'The reverse osmosis system has been running flawlessly for over two years. Water quality consistently meets our strict boiler feed requirements.', 5, false),
('Malika Yusupova', 'Bukhara Pharmaceuticals', 'Production Manager', 'Pharmaceutical-grade water quality achieved with their advanced purification systems. FDA compliance maintained throughout our operations.', 5, false);

-- Insert site settings
INSERT INTO site_settings (key, value, description) VALUES
('company_info', '{"name": "Water Eco Best", "tagline": "Industrial Water Solutions", "description": "Leading provider of advanced water treatment technologies and industrial filtration systems"}', 'Basic company information'),
('contact_info', '{"phone": "+998 71 200 5000", "email": "info@waterecobest.uz", "address": "Industrial Complex, Tashkent, Uzbekistan 100047", "hours": "Monday - Friday: 8:00 AM - 6:00 PM"}', 'Contact information'),
('social_links', '{"website": "#", "linkedin": "#", "twitter": "#"}', 'Social media links'),
('homepage_stats', '{"clients": "300+", "years": "20+", "projects": "1500+", "success_rate": "99.8%"}', 'Homepage statistics');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_clients_featured ON clients(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();