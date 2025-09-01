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

  const pricingTiers = [
    {
      name: t('pricing.tiers.standard'),
      description: 'Perfect for small to medium facilities',
      features: [
        'Standard water treatment systems',
        'Basic technical support',
        '1-year warranty',
        'Email support',
        'Installation guidance'
      ],
      discount: '0%',
      color: 'border-gray-300',
      bgColor: 'bg-white',
      buttonAction: () => handleContactSales()
    },
    {
      name: t('pricing.tiers.professional'),
      description: 'Ideal for large industrial operations',
      features: [
        'Advanced treatment systems',
        'Priority technical support',
        '2-year extended warranty',
        'Phone & email support',
        'On-site installation',
        'Quarterly maintenance'
      ],
      discount: '12%',
      color: 'border-blue-500',
      bgColor: 'bg-blue-50',
      popular: true,
      buttonAction: () => handleContactSales()
    },
    {
      name: t('pricing.tiers.enterprise'),
      description: 'For complex industrial applications',
      features: [
        'Custom engineered solutions',
        '24/7 technical support',
        '3-year comprehensive warranty',
        'Dedicated account manager',
        'Complete installation & commissioning',
        'Monthly maintenance contracts',
        'Performance optimization'
      ],
      discount: '18%',
      color: 'border-green-500',
      bgColor: 'bg-green-50',
      buttonAction: () => handleContactSales()
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
        {/* Pricing Tiers */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('pricing.tiers.title')}</h2>
            <p className="text-xl text-gray-600">{t('pricing.tiers.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`${tier.bgColor} rounded-2xl p-8 border-2 ${tier.color} relative shadow-sm hover:shadow-lg transition-all duration-300`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {t('pricing.tiers.popular')}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{tier.name}</h3>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {tier.discount} OFF
                  </div>
                  <p className="text-sm text-gray-500">on system packages</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={tier.buttonAction}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('common.getQuote')}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Product Pricing */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('pricing.systems.title')}</h2>
            <p className="text-xl text-gray-600">{t('pricing.systems.subtitle')}</p>
          </div>

          {!isAuthenticated ? (
            <LoginPrompt />
          ) : loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-6 text-lg">{t('common.loading')}</p>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <div key={category} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                            System
                          </th>
                          <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                            Specifications
                          </th>
                          <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                            Price (USD)
                          </th>
                          <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {categoryProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-8 py-6">
                              <div className="font-semibold text-gray-900 text-lg">{product.name}</div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="space-y-1">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                  <div key={key} className="text-sm">
                                    <span className="font-medium text-gray-600">{key}:</span>{' '}
                                    <span className="text-gray-900">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="text-2xl font-bold text-blue-600">
                                ${product.price?.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <button 
                                onClick={() => handleGetQuote(product.name)}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                              >
                                {t('common.requestQuote')}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show sample data option */}
          <div className="text-center mt-12">
            <button
              onClick={() => setIsAuthenticated(!isAuthenticated)}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              {isAuthenticated ? 'Hide' : 'Show'} Sample Pricing Data
            </button>
          </div>
        </section>

        {/* Additional Info */}
        <section className="mt-20 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-10 border border-blue-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('pricing.custom.title')}</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('pricing.custom.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleContactSales}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('pricing.custom.contact')}
              </button>
              <button 
                onClick={handleDownloadPriceList}
                className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 px-10 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
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