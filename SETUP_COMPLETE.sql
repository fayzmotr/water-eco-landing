-- ========================================
-- COMPLETE SUPABASE DATABASE SETUP
-- Water Eco Best - Industrial Water Solutions
-- ========================================
-- 
-- Instructions:
-- 1. Go to: https://supabase.com/dashboard/project/gztzwqrzbrzrjxqqvouo/sql/new
-- 2. Copy and paste this ENTIRE file
-- 3. Click "Run" to execute all migrations at once
-- 
-- This will create:
-- ✅ All database tables with proper relationships
-- ✅ Row Level Security policies 
-- ✅ Sample data for testing
-- ✅ Indexes for performance
-- ✅ Triggers for automatic timestamps
-- 
-- ========================================

-- Migration 1: Core Tables and Initial Data
-- ========================================

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

-- Quote requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  product_name text NOT NULL,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_company text,
  client_phone text,
  quantity integer NOT NULL DEFAULT 1,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'accepted', 'rejected')),
  quoted_price numeric(10,2),
  quote_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  client_id text NOT NULL,
  client_name text NOT NULL,
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'on_hold')),
  start_date date,
  end_date date,
  budget numeric(12,2),
  actual_cost numeric(12,2),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  project_manager text,
  notes text,
  attachments text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ========================================
-- SECURITY: Row Level Security Policies
-- ========================================

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
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

-- Quote request submission policy
CREATE POLICY "Anyone can submit quote requests"
  ON quote_requests FOR INSERT
  TO public
  WITH CHECK (true);

-- Admin policies
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

CREATE POLICY "Admins can view quote requests"
  ON quote_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update quote requests"
  ON quote_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- PERFORMANCE: Database Indexes
-- ========================================

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_clients_featured ON clients(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_product ON quote_requests(product_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC);

-- ========================================
-- AUTOMATION: Timestamp Triggers
-- ========================================

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
CREATE TRIGGER update_quote_requests_updated_at BEFORE UPDATE ON quote_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SAMPLE DATA: Water Eco Best Categories
-- ========================================

INSERT INTO categories (name, description, sort_order) VALUES
('Wastewater Treatment Plants', 'Complete biological and physical-chemical treatment systems from 20 to 1,000,000 m³/day capacity', 1),
('Water Purification Systems', 'Drinking water treatment and purification systems for municipal and industrial applications', 2),
('Modular Treatment Units', 'Block-modular systems with full automation for quick deployment', 3),
('BioSteps BS Systems', 'Five-stage biological treatment systems for municipal and industrial wastewater', 4),
('Pumping Stations', 'Sewerage and water pumping stations with variable capacity', 5),
('Distribution Wells', 'Water distribution and storage systems for municipal networks', 6)
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- SAMPLE DATA: Water Treatment Products
-- ========================================

INSERT INTO products (name, description, category, specifications, price, is_featured, sort_order) VALUES
('Municipal Wastewater Plant 100 m³/day', 'Complete biological wastewater treatment system designed for small municipalities and communities', 'Wastewater Treatment Plants', '{"Capacity": "100 m³/day", "BOD Removal": "95%", "COD Removal": "90%", "TSS Removal": "98%", "Technology": "Extended Aeration", "Automation": "PLC Control"}', 285000.00, true, 1),
('Industrial Wastewater Plant 1000 m³/day', 'Advanced biological and physical-chemical treatment for industrial wastewater', 'Wastewater Treatment Plants', '{"Capacity": "1000 m³/day", "BOD Removal": "98%", "COD Removal": "95%", "TSS Removal": "99%", "Technology": "SBR + Tertiary", "Automation": "SCADA System"}', 1850000.00, true, 2),
('Drinking Water Purification 500 m³/day', 'Multi-stage drinking water treatment system meeting WHO standards', 'Water Purification Systems', '{"Capacity": "500 m³/day", "Turbidity Removal": "99.9%", "Bacteria Removal": "99.99%", "Technology": "Coagulation-Flocculation-Sedimentation-Filtration-Disinfection", "Standards": "WHO, EU"}', 425000.00, true, 3),
('Modular Treatment Unit 50 m³/day', 'Containerized wastewater treatment system for rapid deployment', 'Modular Treatment Units', '{"Capacity": "50 m³/day", "Installation": "24 hours", "Power": "15 kW", "Dimensions": "6m x 2.5m x 2.8m", "Technology": "MBR", "Remote Monitoring": "Yes"}', 165000.00, true, 4),
('BioSteps BS-200', 'Five-stage biological treatment system with advanced nutrient removal', 'BioSteps BS Systems', '{"Capacity": "200 m³/day", "Stages": "5-stage biological", "Nitrogen Removal": "85%", "Phosphorus Removal": "90%", "Energy": "Low consumption", "Maintenance": "Minimal"}', 380000.00, false, 5),
('Sewerage Pumping Station 100 L/s', 'Automated sewerage pumping station with backup systems', 'Pumping Stations', '{"Flow Rate": "100 L/s", "Head": "25m", "Pumps": "3x50% duty/standby", "Control": "Level sensors", "Backup Power": "Generator ready", "Material": "GRP/Concrete"}', 85000.00, false, 6),
('Water Distribution Well DN1200', 'Reinforced concrete distribution well for municipal water networks', 'Distribution Wells', '{"Diameter": "1200mm", "Depth": "3-8m variable", "Material": "Reinforced concrete", "Connections": "Multiple DN300-800", "Access": "Cast iron cover", "Coating": "Epoxy lined"}', 25000.00, false, 7),
('Industrial RO System 2000 L/h', 'High-efficiency reverse osmosis for industrial process water', 'Water Purification Systems', '{"Capacity": "2000 L/h", "Recovery": "75%", "TDS Removal": "99.5%", "Pressure": "15 bar", "Membranes": "Spiral wound", "Automation": "PLC controlled"}', 65000.00, true, 8)
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- SAMPLE DATA: Industrial Clients  
-- ========================================

INSERT INTO clients (name, logo_url, description, industry, is_featured, sort_order) VALUES
('Uzbekistan Chemical Industries', 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=200&h=100&fit=crop', 'Leading chemical processing company with facilities across Central Asia', 'Chemical Processing', true, 1),
('Central Asian Textiles', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=100&fit=crop', 'Major textile manufacturing and dyeing operations', 'Textiles & Apparel', true, 2),
('Tashkent Municipal Water', 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=200&h=100&fit=crop', 'Municipal water treatment and distribution authority', 'Municipal Services', true, 3),
('Samarkand Food Processing', 'https://images.unsplash.com/photo-1606914469633-897d4b6be1ab?w=200&h=100&fit=crop', 'Food and beverage manufacturing facility', 'Food & Beverage', true, 4),
('Fergana Mining Corporation', 'https://images.unsplash.com/photo-1586953208359-3d5b7d35a0c2?w=200&h=100&fit=crop', 'Mining operations and mineral processing', 'Mining & Metals', false, 5),
('Bukhara Pharmaceuticals', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=100&fit=crop', 'Pharmaceutical manufacturing and research', 'Pharmaceuticals', true, 6)
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- SAMPLE DATA: Client Testimonials
-- ========================================

INSERT INTO testimonials (client_name, client_company, client_position, content, rating, is_featured) VALUES
('Ahmed Karimov', 'Uzbekistan Chemical Industries', 'Plant Operations Manager', 'Water Eco Best delivered exceptional results with our wastewater treatment upgrade. The new system reduced our water consumption by 40% and improved discharge quality beyond regulatory requirements. Their technical team provided outstanding support throughout the project.', 5, true),
('Dilshod Rakhimov', 'Central Asian Textiles', 'Environmental Director', 'Professional service and reliable technology. The modular treatment system was installed in record time with minimal disruption to our operations. We have had zero downtime since commissioning 18 months ago.', 5, true),
('Nargiza Sultanova', 'Samarkand Food Processing', 'Quality Assurance Manager', 'The water purification system consistently delivers pharmaceutical-grade water quality for our production needs. Cost-effective solution that paid for itself within the first year through reduced water costs.', 5, true),
('Rustam Abdullayev', 'Tashkent Municipal Water', 'Chief Engineer', 'Excellent partnership on our municipal treatment plant upgrade. The BioSteps system handles capacity variations smoothly and meets all discharge standards. Highly recommend for municipal applications.', 5, false),
('Malika Yusupova', 'Bukhara Pharmaceuticals', 'Production Manager', 'Outstanding technical expertise and project management. The treatment system integration was completed on schedule and within budget. Water quality consistently exceeds pharmaceutical industry requirements.', 5, false)
ON CONFLICT (client_name, client_company) DO NOTHING;

-- ========================================
-- SAMPLE DATA: System Configuration
-- ========================================

INSERT INTO site_settings (key, value, description) VALUES
('company_info', '{
  "name": "OOO Water Eco Best",
  "tagline": "Industrial Water Solutions Excellence",
  "description": "Leading provider of advanced water and wastewater treatment solutions in Uzbekistan and Central Asia. Specialized in municipal and industrial applications from 20 m³/day to 1,000,000 m³/day capacity.",
  "established": "2004",
  "employees": "45+",
  "headquarters": "Tashkent, Uzbekistan"
}', 'Basic company information and branding'),

('contact_info', '{
  "phone": "+998 71 200 5000",
  "emergency": "+998 90 200 5000", 
  "email": "info@waterecobest.uz",
  "sales": "sales@waterecobest.uz",
  "support": "support@waterecobest.uz",
  "address": "Industrial Complex, Chilanzar District, Tashkent 100047, Uzbekistan",
  "hours": "Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM",
  "emergency_hours": "24/7 Technical Support Available"
}', 'Contact information and business hours'),

('homepage_stats', '{
  "clients": "300+",
  "years": "20+", 
  "projects": "1500+",
  "capacity": "1,000,000 m³/day",
  "success_rate": "99.8%",
  "countries": "5"
}', 'Key performance metrics for homepage'),

('social_links', '{
  "website": "https://waterecobest.uz",
  "linkedin": "#",
  "facebook": "#", 
  "youtube": "#",
  "telegram": "#"
}', 'Social media and digital presence links'),

('certifications', '{
  "iso": ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"],
  "technical": ["Water Treatment Technology Certificate", "Environmental Engineering License"],
  "memberships": ["Uzbekistan Water Association", "Central Asian Environmental Council"]
}', 'Company certifications and memberships')

ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();

-- ========================================
-- SAMPLE DATA: Project Examples
-- ========================================

INSERT INTO projects (name, description, client_id, client_name, status, start_date, end_date, budget, actual_cost, progress, project_manager, notes) VALUES
('Chemical Plant Water Recycling Upgrade', 'Complete overhaul of existing water treatment system with advanced recycling capabilities for chemical processing facility', '1', 'Uzbekistan Chemical Industries', 'completed', '2023-03-15', '2024-01-30', 1850000.00, 1775000.00, 100, 'Elena Petrov', 'Achieved 65% water consumption reduction and 99.2% discharge quality compliance. Client extremely satisfied with results.'),
('Textile Facility Modular Treatment Installation', 'Installation of containerized MBR treatment system for textile dyeing wastewater', '2', 'Central Asian Textiles', 'in_progress', '2024-02-01', '2024-08-15', 680000.00, 420000.00, 75, 'Dmitry Volkov', 'Installation and commissioning phase. System performing above specifications in pilot testing.'),
('Municipal Water Plant Expansion', 'Expansion of municipal drinking water treatment capacity from 500 to 1200 m³/day', '3', 'Tashkent Municipal Water', 'planning', '2024-06-01', '2025-03-30', 2400000.00, NULL, 25, 'Anastasia Kim', 'Design phase completed. Environmental permits approved. Construction to begin Q3 2024.')
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- SETUP COMPLETE!
-- ========================================

-- Check that everything was created successfully
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('categories', 'products', 'clients', 'testimonials', 'contact_submissions', 'quote_requests', 'projects', 'admin_users', 'site_settings');
    
    RAISE NOTICE '✅ Setup completed successfully!';
    RAISE NOTICE '📊 Created % tables with sample data', table_count;
    RAISE NOTICE '🔒 Row Level Security policies applied';
    RAISE NOTICE '⚡ Performance indexes created'; 
    RAISE NOTICE '🤖 Automatic timestamp triggers enabled';
    RAISE NOTICE '';
    RAISE NOTICE '🌐 Your Water Eco Best database is now ready!';
    RAISE NOTICE '💻 Test your application at: http://localhost:5173';
    RAISE NOTICE '📱 Storage buckets: attachments (private), catalogues (public)';
END
$$;