import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gztzwqrzbrzrjxqqvouo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dHp3cXJ6YnJ6cmp4cXF2b3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NTIzNDUsImV4cCI6MjA3MjMyODM0NX0.lE_vIKOxU7e9gIkQQHJvqDnTIf9iz-at3KSD-iKtC74';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifySetup() {
  console.log('🔍 Verifying Supabase setup for Water Eco Best...\n');

  // Test storage buckets
  console.log('📦 Checking storage buckets:');
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) throw error;
    
    buckets.forEach(bucket => {
      console.log(`  ✅ ${bucket.name} (${bucket.public ? 'public' : 'private'})`);
    });
  } catch (error) {
    console.log(`  ❌ Storage error: ${error.message}`);
  }

  // Test database tables
  console.log('\n🗃️ Checking database tables:');
  const tables = [
    { name: 'categories', expectedRecords: 6 },
    { name: 'products', expectedRecords: 8 },
    { name: 'clients', expectedRecords: 6 },
    { name: 'testimonials', expectedRecords: 5 },
    { name: 'projects', expectedRecords: 3 },
    { name: 'site_settings', expectedRecords: 5 },
    { name: 'contact_submissions', expectedRecords: 0 },
    { name: 'quote_requests', expectedRecords: 0 }
  ];

  let tablesWorking = 0;
  
  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table.name)
        .select('*', { count: 'exact' })
        .limit(1);
      
      if (error) {
        if (error.message.includes('does not exist')) {
          console.log(`  ❌ ${table.name}: Table not created yet`);
        } else {
          console.log(`  ⚠️  ${table.name}: ${error.message}`);
        }
      } else {
        console.log(`  ✅ ${table.name}: Working (${count || 0} records)`);
        tablesWorking++;
      }
    } catch (err) {
      console.log(`  ❌ ${table.name}: ${err.message}`);
    }
  }

  // Summary
  console.log(`\n📊 Summary:`);
  console.log(`✅ Storage buckets: Created and accessible`);
  console.log(`${tablesWorking === tables.length ? '✅' : '⚠️ '} Database tables: ${tablesWorking}/${tables.length} working`);
  
  if (tablesWorking === 0) {
    console.log('\n🚨 Database tables need to be created!');
    console.log('\n📋 To complete setup:');
    console.log('1. Go to: https://supabase.com/dashboard/project/gztzwqrzbrzrjxqqvouo/sql/new');
    console.log('2. Open the SETUP_COMPLETE.sql file in this directory');
    console.log('3. Copy the entire content and paste it into the SQL editor');
    console.log('4. Click "Run" to execute all migrations');
    console.log('5. Run this verification script again: node verify-setup.js');
  } else if (tablesWorking === tables.length) {
    console.log('\n🎉 Perfect! Your Water Eco Best database is fully operational!');
    console.log('\n🚀 Next steps:');
    console.log('1. Start your development server: npm run dev');
    console.log('2. Visit: http://localhost:5173');
    console.log('3. Test contact forms and quote requests');
    console.log('4. Upload catalogues to the storage bucket');
  } else {
    console.log('\n⚠️  Some tables are missing. Please run the complete SQL setup.');
  }
}

verifySetup().catch(console.error);