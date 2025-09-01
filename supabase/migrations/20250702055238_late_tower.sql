/*
  # Add Projects Table

  1. New Tables
    - `projects` - Project management for client implementations

  2. Security
    - Enable RLS on projects table
    - Add policies for admin access
*/

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

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Admin policies for projects
CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample projects
INSERT INTO projects (name, description, client_id, client_name, status, start_date, end_date, budget, actual_cost, progress, project_manager, notes) VALUES
('Chemical Plant Water Recycling System', 'Implementation of advanced water recycling system for chemical processing facility', '1', 'Uzbekistan Chemical Industries', 'completed', '2023-06-01', '2024-02-15', 850000.00, 820000.00, 100, 'Elena Petrov', 'Successfully reduced water consumption by 60% and achieved $2.5M annual savings'),
('Textile Factory Filtration Upgrade', 'Upgrade of existing filtration systems with advanced multi-media filters', '2', 'Central Asian Textiles', 'in_progress', '2024-01-15', '2024-06-30', 450000.00, 280000.00, 65, 'Michael Rodriguez', 'Installation phase completed, commissioning in progress'),
('Power Plant Water Treatment', 'Complete water treatment solution for thermal power generation facility', '3', 'Tashkent Power Generation', 'planning', '2024-03-01', '2024-12-31', 1200000.00, NULL, 15, 'Sarah Chen', 'Design phase in progress, environmental permits pending');