import React, { useState, useEffect } from 'react';
import { Check, Download, Lock, Mail, Droplets, Calculator } from 'lucide-react';
import { getProducts } from '../lib/database';
import { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await getProducts();
      
      if (error) {
        console.warn('Error fetching products:', error);
      } else if (data) {
        // Filter products that have prices
        const productsWithPrices = data.filter(product => product.price && product.price > 0);
        setProducts(productsWithPrices);
      }
    } catch (error) {
      console.warn('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccess = () => {
    window.location.href = '/contact';
  };

  const handleContactSales = () => {
    window.location.href = '/contact';
  };

  const handleGetQuote = (productName: string) => {
    alert(`Quote request for ${productName} will be processed. Please contact our sales team for detailed pricing.`);
  };

  const handleDownloadPriceList = () => {
    alert('Complete price list will be sent to your email. Please contact our sales team.');
  };

  // Sample pricing data for demonstration
  const sampleProducts = [
    {
      id: '1',
      name: 'Industrial RO System 1000L/h',
      category: 'Reverse Osmosis Systems',
      price: 12500,
      specifications: { 'Capacity': '1000 L/h', 'Recovery Rate': '75%', 'Power': '5.5 kW' },
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      description: ''
    },
    {
      id: '2',
      name: 'Industrial RO System 5000L/h',
      category: 'Reverse Osmosis Systems',
      price: 45000,
      specifications: { 'Capacity': '5000 L/h', 'Recovery Rate': '75%', 'Power': '22 kW' },
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      description: ''
    },
    {
      id: '3',
      name: 'Multi-Media Filter 5m³/h',
      category: 'Filtration Systems',
      price: 8500,
      specifications: { 'Flow Rate': '5 m³/h', 'Filtration': '5 micron', 'Material': 'FRP' },
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      description: ''
    },
    {
      id: '4',
      name: 'Multi-Media Filter 20m³/h',
      category: 'Filtration Systems',
      price: 18500,
      specifications: { 'Flow Rate': '20 m³/h', 'Filtration': '5 micron', 'Material': 'FRP' },
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      description: ''
    },
    {
      id: '5',
      name: 'Chemical Dosing System',
      category: 'Chemical Dosing',
      price: 3200,
      specifications: { 'Dosing Rate': '0.1-50 L/h', 'Pressure': '10 bar', 'Control': 'PLC' },
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      description: ''
    },
    {
      id: '6',
      name: 'UV Sterilization System',
      category: 'UV Sterilization',
      price: 2800,
      specifications: { 'Flow Rate': '10 m³/h', 'UV Dose': '40 mJ/cm²', 'Power': '320W' },
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      description: ''
    }
  ];

  const displayProducts = products.length > 0 ? products : sampleProducts;

  // Group products by category
  const groupedProducts = displayProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof displayProducts>);

  const consultationServices = [
    {
      title: 'Site Assessment & Design',
      description: 'Comprehensive site evaluation and custom facility design',
      features: [
        'Site inspection and assessment',
        'Water quality analysis',
        'Capacity requirements evaluation',
        'Preliminary design concepts',
        'Technology selection guidance'
      ],
      icon: '🔍',
      color: 'border-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Engineering & Construction',
      description: 'Complete facility construction with European technology',
      features: [
        'Detailed engineering design',
        'Construction project management',
        'European technology integration',
        'Quality control and testing',
        'Commissioning and startup',
        'Staff training and support'
      ],
      icon: '🏗️',
      color: 'border-green-500',
      bgColor: 'bg-green-50',
      featured: true
    },
    {
      title: 'Facility Reconstruction',
      description: 'Modernization and upgrade of existing treatment facilities',
      features: [
        'Existing facility assessment',
        'Upgrade and modernization planning',
        'Technology retrofit solutions',
        'Phased reconstruction approach',
        'Minimal downtime implementation',
        'Performance optimization'
      ],
      icon: '⚙️',
      color: 'border-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const LoginPrompt = () => (
    <div className="bg-white rounded-2xl shadow-sm p-10 text-center border border-gray-100">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Lock className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {t('pricing.access.title')}
      </h3>
      <p className="text-gray-600 mb-8 leading-relaxed">
        {t('pricing.access.subtitle')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={handleRequestAccess}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {t('pricing.access.request')}
        </button>
        <button
          onClick={handleContactSales}
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          {t('pricing.access.contact')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              {t('pricing.hero.badge')}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('pricing.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('pricing.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Consultation Services */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('pricing.tiers.title')}</h2>
            <p className="text-xl text-gray-600">{t('pricing.tiers.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {consultationServices.map((service, index) => (
              <div key={index} className={`${service.bgColor} rounded-2xl p-8 border-2 ${service.color} relative shadow-sm hover:shadow-lg transition-all duration-300`}>
                {service.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Common
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={handleContactSales}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    service.featured
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Request Consultation
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Project Capabilities */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('pricing.systems.title')}</h2>
            <p className="text-xl text-gray-600">{t('pricing.systems.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500</div>
              <div className="text-gray-600 font-medium">m³/day minimum capacity</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">35,000</div>
              <div className="text-gray-600 font-medium">m³/day proven maximum</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
              <div className="text-gray-600 font-medium">years proven experience</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600 font-medium">successful projects</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-10 border border-gray-200">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Project-Based Consultation</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Every water treatment facility is unique. Our engineering team provides comprehensive consultation 
                and custom solutions tailored to your specific requirements, capacity, and site conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={handleContactSales}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Request Site Assessment
                </button>
                <button 
                  onClick={handleDownloadPriceList}
                  className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 px-10 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Download Company Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Engineering Team */}
        <section className="mt-20 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-10 border border-green-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('pricing.custom.title')}</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('pricing.custom.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleContactSales}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('pricing.custom.contact')}
              </button>
              <button 
                onClick={handleDownloadPriceList}
                className="border-2 border-green-300 text-green-700 hover:bg-green-100 px-10 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
              >
                <Download className="mr-3" size={20} />
                {t('pricing.custom.download')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;