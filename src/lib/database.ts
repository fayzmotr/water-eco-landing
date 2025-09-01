import { supabase, isSupabaseReady } from './supabase';
import { Product, Category, Client, Testimonial, ContactSubmission, QuoteRequest, Project, FileAttachment } from '../types';

// File Management
export const uploadFile = async (file: File, folder: string = 'general') => {
  if (!isSupabaseReady) {
    // Simulate file upload for demo
    const mockUrl = `https://via.placeholder.com/400x300/2563eb/ffffff?text=${encodeURIComponent(file.name)}`;
    return { data: { url: mockUrl }, error: null };
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('attachments')
    .upload(filePath, file);

  if (error) return { data: null, error };

  const { data: { publicUrl } } = supabase.storage
    .from('attachments')
    .getPublicUrl(filePath);

  return { data: { url: publicUrl }, error: null };
};

export const deleteFile = async (url: string) => {
  if (!isSupabaseReady) return { error: null };

  const path = url.split('/').pop();
  if (!path) return { error: { message: 'Invalid file path' } };

  return await supabase.storage
    .from('attachments')
    .remove([path]);
};

// Products
export const getProducts = async (options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}) => {
  if (!isSupabaseReady) {
    // Return empty array for demo - no fake products
    return { data: [], error: null };
  }

  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true);

  if (options?.category && options.category !== 'all') {
    query = query.eq('category', options.category);
  }

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  query = query.order('sort_order', { ascending: true });

  return await query;
};

export const getProduct = async (id: string) => {
  if (!isSupabaseReady) {
    return { data: null, error: null };
  }

  return await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  if (!isSupabaseReady) {
    const newProduct = {
      id: Date.now().toString(),
      ...product,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const existingProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
    existingProducts.push(newProduct);
    localStorage.setItem('demo_products', JSON.stringify(existingProducts));
    
    return { data: newProduct, error: null };
  }

  return await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  if (!isSupabaseReady) {
    const existingProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
    const updatedProducts = existingProducts.map((p: any) => 
      p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
    );
    localStorage.setItem('demo_products', JSON.stringify(updatedProducts));
    
    return { data: { id, ...updates }, error: null };
  }

  return await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
};

export const deleteProduct = async (id: string) => {
  if (!isSupabaseReady) {
    const existingProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
    const filteredProducts = existingProducts.filter((p: any) => p.id !== id);
    localStorage.setItem('demo_products', JSON.stringify(filteredProducts));
    
    return { data: null, error: null };
  }

  return await supabase
    .from('products')
    .delete()
    .eq('id', id);
};

// Categories
export const getCategories = async () => {
  if (!isSupabaseReady) {
    // Return real categories based on company info
    const realCategories = [
      { id: '1', name: 'Wastewater Treatment Plants', description: 'Complete biological and physical-chemical treatment systems', sort_order: 1, created_at: '2024-01-01' },
      { id: '2', name: 'Water Purification Systems', description: 'Drinking water treatment and purification', sort_order: 2, created_at: '2024-01-01' },
      { id: '3', name: 'Modular Treatment Units', description: 'Block-modular systems with automation', sort_order: 3, created_at: '2024-01-01' },
      { id: '4', name: 'BioSteps BS Systems', description: 'Five-stage biological treatment systems', sort_order: 4, created_at: '2024-01-01' },
      { id: '5', name: 'Pumping Stations', description: 'Sewerage and water pumping stations', sort_order: 5, created_at: '2024-01-01' },
      { id: '6', name: 'Distribution Wells', description: 'Water distribution and storage systems', sort_order: 6, created_at: '2024-01-01' }
    ];
    
    return { data: realCategories, error: null };
  }

  return await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
};

export const createCategory = async (category: Omit<Category, 'id' | 'created_at'>) => {
  if (!isSupabaseReady) {
    const newCategory = {
      id: Date.now().toString(),
      ...category,
      created_at: new Date().toISOString()
    };
    
    const existingCategories = JSON.parse(localStorage.getItem('demo_categories') || '[]');
    existingCategories.push(newCategory);
    localStorage.setItem('demo_categories', JSON.stringify(existingCategories));
    
    return { data: newCategory, error: null };
  }

  return await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();
};

export const updateCategory = async (id: string, updates: Partial<Category>) => {
  if (!isSupabaseReady) {
    const existingCategories = JSON.parse(localStorage.getItem('demo_categories') || '[]');
    const updatedCategories = existingCategories.map((c: any) => 
      c.id === id ? { ...c, ...updates } : c
    );
    localStorage.setItem('demo_categories', JSON.stringify(updatedCategories));
    
    return { data: { id, ...updates }, error: null };
  }

  return await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
};

export const deleteCategory = async (id: string) => {
  if (!isSupabaseReady) {
    const existingCategories = JSON.parse(localStorage.getItem('demo_categories') || '[]');
    const filteredCategories = existingCategories.filter((c: any) => c.id !== id);
    localStorage.setItem('demo_categories', JSON.stringify(filteredCategories));
    
    return { data: null, error: null };
  }

  return await supabase
    .from('categories')
    .delete()
    .eq('id', id);
};

// Clients
export const getClients = async (options?: {
  featured?: boolean;
  limit?: number;
}) => {
  if (!isSupabaseReady) {
    // Return empty array for demo - no fake clients
    return { data: [], error: null };
  }

  let query = supabase
    .from('clients')
    .select('*');

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  query = query.order('sort_order', { ascending: true });

  return await query;
};

export const createClient = async (client: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => {
  if (!isSupabaseReady) {
    const newClient = {
      id: Date.now().toString(),
      ...client,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const existingClients = JSON.parse(localStorage.getItem('demo_clients') || '[]');
    existingClients.push(newClient);
    localStorage.setItem('demo_clients', JSON.stringify(existingClients));
    
    return { data: newClient, error: null };
  }

  return await supabase
    .from('clients')
    .insert([client])
    .select()
    .single();
};

export const updateClient = async (id: string, updates: Partial<Client>) => {
  if (!isSupabaseReady) {
    const existingClients = JSON.parse(localStorage.getItem('demo_clients') || '[]');
    const updatedClients = existingClients.map((c: any) => 
      c.id === id ? { ...c, ...updates, updated_at: new Date().toISOString() } : c
    );
    localStorage.setItem('demo_clients', JSON.stringify(updatedClients));
    
    return { data: { id, ...updates }, error: null };
  }

  return await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
};

export const deleteClient = async (id: string) => {
  if (!isSupabaseReady) {
    const existingClients = JSON.parse(localStorage.getItem('demo_clients') || '[]');
    const filteredClients = existingClients.filter((c: any) => c.id !== id);
    localStorage.setItem('demo_clients', JSON.stringify(filteredClients));
    
    return { data: null, error: null };
  }

  return await supabase
    .from('clients')
    .delete()
    .eq('id', id);
};

// Testimonials
export const getTestimonials = async (options?: {
  featured?: boolean;
  limit?: number;
}) => {
  if (!isSupabaseReady) {
    // Return empty array for demo - no fake testimonials
    return { data: [], error: null };
  }

  let query = supabase
    .from('testimonials')
    .select('*');

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  query = query.order('created_at', { ascending: false });

  return await query;
};

export const createTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at'>) => {
  if (!isSupabaseReady) return { data: null, error: { message: 'Database not configured' } };

  return await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single();
};

export const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
  if (!isSupabaseReady) return { data: null, error: { message: 'Database not configured' } };

  return await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
};

export const deleteTestimonial = async (id: string) => {
  if (!isSupabaseReady) return { data: null, error: { message: 'Database not configured' } };

  return await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
};

// Contact Submissions
export const createContactSubmission = async (submission: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  if (!isSupabaseReady) {
    const newSubmission = {
      id: Date.now().toString(),
      ...submission,
      status: 'new' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const existingSubmissions = JSON.parse(localStorage.getItem('demo_messages') || '[]');
    existingSubmissions.push(newSubmission);
    localStorage.setItem('demo_messages', JSON.stringify(existingSubmissions));
    
    return { data: newSubmission, error: null };
  }

  return await supabase
    .from('contact_submissions')
    .insert([submission])
    .select()
    .single();
};

export const getContactSubmissions = async (options?: {
  status?: string;
  limit?: number;
}) => {
  if (!isSupabaseReady) {
    const storedMessages = JSON.parse(localStorage.getItem('demo_messages') || '[]');
    let filtered = storedMessages;

    if (options?.status) {
      filtered = filtered.filter((message: any) => message.status === options.status);
    }

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return { data: filtered, error: null };
  }

  let query = supabase
    .from('contact_submissions')
    .select('*');

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  query = query.order('created_at', { ascending: false });

  return await query;
};

export const updateContactSubmission = async (id: string, updates: { status?: string }) => {
  if (!isSupabaseReady) {
    const existingMessages = JSON.parse(localStorage.getItem('demo_messages') || '[]');
    const updatedMessages = existingMessages.map((m: any) => 
      m.id === id ? { ...m, ...updates, updated_at: new Date().toISOString() } : m
    );
    localStorage.setItem('demo_messages', JSON.stringify(updatedMessages));
    
    return { data: { id, ...updates }, error: null };
  }

  return await supabase
    .from('contact_submissions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
};

// Quote Requests
export const createQuoteRequest = async (quote: Omit<QuoteRequest, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  if (!isSupabaseReady) {
    const newQuote = {
      id: Date.now().toString(),
      ...quote,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const existingQuotes = JSON.parse(localStorage.getItem('demo_quotes') || '[]');
    existingQuotes.push(newQuote);
    localStorage.setItem('demo_quotes', JSON.stringify(existingQuotes));
    
    return { data: newQuote, error: null };
  }

  return await supabase
    .from('quote_requests')
    .insert([{ ...quote, status: 'pending' }])
    .select()
    .single();
};

export const getQuoteRequests = async (options?: {
  status?: string;
  limit?: number;
}) => {
  if (!isSupabaseReady) {
    const storedQuotes = JSON.parse(localStorage.getItem('demo_quotes') || '[]');
    let filtered = storedQuotes;

    if (options?.status) {
      filtered = filtered.filter((quote: any) => quote.status === options.status);
    }

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return { data: filtered, error: null };
  }

  let query = supabase
    .from('quote_requests')
    .select('*');

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  query = query.order('created_at', { ascending: false });

  return await query;
};

export const updateQuoteRequest = async (id: string, updates: Partial<QuoteRequest>) => {
  if (!isSupabaseReady) {
    const existingQuotes = JSON.parse(localStorage.getItem('demo_quotes') || '[]');
    const updatedQuotes = existingQuotes.map((q: any) => 
      q.id === id ? { ...q, ...updates, updated_at: new Date().toISOString() } : q
    );
    localStorage.setItem('demo_quotes', JSON.stringify(updatedQuotes));
    
    return { data: { id, ...updates }, error: null };
  }

  return await supabase
    .from('quote_requests')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
};

// Projects
export const getProjects = async (options?: {
  status?: string;
  client_id?: string;
  limit?: number;
}) => {
  if (!isSupabaseReady) {
    // Return empty array for demo - no fake projects
    return { data: [], error: null };
  }

  let query = supabase
    .from('projects')
    .select('*');

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.client_id) {
    query = query.eq('client_id', options.client_id);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  query = query.order('created_at', { ascending: false });

  return await query;
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
  if (!isSupabaseReady) {
    const newProject = {
      id: Date.now().toString(),
      ...project,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const existingProjects = JSON.parse(localStorage.getItem('demo_projects') || '[]');
    existingProjects.push(newProject);
    localStorage.setItem('demo_projects', JSON.stringify(existingProjects));
    
    return { data: newProject, error: null };
  }

  return await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
  if (!isSupabaseReady) {
    const existingProjects = JSON.parse(localStorage.getItem('demo_projects') || '[]');
    const updatedProjects = existingProjects.map((p: any) => 
      p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
    );
    localStorage.setItem('demo_projects', JSON.stringify(updatedProjects));
    
    return { data: { id, ...updates }, error: null };
  }

  return await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
};

export const deleteProject = async (id: string) => {
  if (!isSupabaseReady) {
    const existingProjects = JSON.parse(localStorage.getItem('demo_projects') || '[]');
    const filteredProjects = existingProjects.filter((p: any) => p.id !== id);
    localStorage.setItem('demo_projects', JSON.stringify(filteredProjects));
    
    return { data: null, error: null };
  }

  return await supabase
    .from('projects')
    .delete()
    .eq('id', id);
};

// Site Settings
export const getSiteSettings = async (key?: string) => {
  if (!isSupabaseReady) return { data: [], error: null };

  let query = supabase
    .from('site_settings')
    .select('*');

  if (key) {
    query = query.eq('key', key);
    const result = await query.single();
    return result;
  }

  return await query;
};

export const updateSiteSettings = async (key: string, value: any) => {
  if (!isSupabaseReady) return { data: null, error: { message: 'Database not configured' } };

  return await supabase
    .from('site_settings')
    .upsert([{ key, value }])
    .select()
    .single();
};

// Catalogues
export const getCatalogues = async () => {
  if (!isSupabaseReady) {
    // Return sample catalogues for demo
    return {
      data: [
        {
          name: 'AVK Gaz',
          url: '#demo-catalogue',
          size: 2500000,
          image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'AVK Water',
          url: '#demo-catalogue',
          size: 3200000,
          image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'TIS',
          url: '#demo-catalogue',
          size: 1800000,
          image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      error: null
    };
  }

  try {
    const { data, error } = await supabase.storage
      .from('catalogues')
      .list('', {
        limit: 100,
        offset: 0
      });

    if (error) return { data: [], error };

    // Filter only PDF files
    const pdfFiles = data?.filter(file => file.name.toLowerCase().endsWith('.pdf')) || [];
    
    const catalogues = pdfFiles.map(file => {
      const { data: { publicUrl } } = supabase.storage
        .from('catalogues')
        .getPublicUrl(file.name);

      // Extract display name from filename (remove extension and format)
      let displayName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      
      // Format common names
      if (displayName.toLowerCase().includes('avk') && displayName.toLowerCase().includes('gaz')) {
        displayName = 'AVK Gaz';
      } else if (displayName.toLowerCase().includes('avk') && displayName.toLowerCase().includes('water')) {
        displayName = 'AVK Water';
      } else if (displayName.toLowerCase().includes('tis')) {
        displayName = 'TIS';
      } else {
        // Capitalize first letter of each word
        displayName = displayName.replace(/\b\w/g, l => l.toUpperCase());
      }

      return {
        name: displayName,
        url: publicUrl,
        size: file.metadata?.size || 0,
        originalName: file.name,
        image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400' // Will be updated with actual cover
      };
    });

    // Try to get cover images for each catalogue
    for (const catalogue of catalogues) {
      try {
        const coverNames = [
          `${catalogue.name.toLowerCase().replace(/\s+/g, '-')}-coverPage`,
          `${catalogue.name.toLowerCase().replace(/\s+/g, '_')}-coverPage`,
          `${catalogue.name.toLowerCase()}-cover`,
          'avk-coverPage',
          'Tis-CoverPage'
        ];
        
        for (const coverName of coverNames) {
          const { data: coverList } = await supabase.storage
            .from('catalogues')
            .list('', {
              search: coverName
            });
          
          if (coverList && coverList.length > 0) {
            const { data: { publicUrl } } = supabase.storage
              .from('catalogues')
              .getPublicUrl(coverList[0].name);
            catalogue.image = publicUrl;
            break;
          }
        }
      } catch (e) {
        console.warn('Could not load cover image for', catalogue.name);
      }
    }
    
    return { data: catalogues, error: null };
  } catch (error) {
    console.error('Error fetching catalogues:', error);
    return { data: [], error };
  }
};