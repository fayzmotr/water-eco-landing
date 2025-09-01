/*
  # Add Quote Requests Table

  1. New Tables
    - `quote_requests` - Customer quote requests for products

  2. Security
    - Enable RLS on quote_requests table
    - Add policies for public insert and admin read/update
*/

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

-- Enable Row Level Security
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Public insert policy for quote requests
CREATE POLICY "Anyone can submit quote requests"
  ON quote_requests FOR INSERT
  TO public
  WITH CHECK (true);

-- Admin policies for quote requests
CREATE POLICY "Admins can view quote requests"
  ON quote_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update quote requests"
  ON quote_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_product ON quote_requests(product_id);

-- Create updated_at trigger
CREATE TRIGGER update_quote_requests_updated_at 
  BEFORE UPDATE ON quote_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();