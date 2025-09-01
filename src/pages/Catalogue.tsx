import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, ShoppingCart, Droplets, Calculator, FileText, BookOpen } from 'lucide-react';
import { getProducts, getCategories, getCatalogues } from '../lib/database';
import { Product, Category } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import QuoteModal from '../components/QuoteModal';

const Catalogue: React.FC = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [catalogues, setCatalogues] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  const fetchData = async () => {
    try {
      const [productsResult, categoriesResult, cataloguesResult] = await Promise.all([
        getProducts(),
        getCategories(),
        getCatalogues()
      ]);

      if (productsResult.data) setProducts(productsResult.data);
      if (categoriesResult.data) setCategories(categoriesResult.data);
      if (cataloguesResult.data) setCatalogues(cataloguesResult.data);
    } catch (error) {
      console.warn('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleGetQuote = (product: Product) => {
    setSelectedProduct(product);
    setShowQuoteModal(true);
  };

  const handleViewDetails = (product: Product) => {
    alert(`Product Details:\n\nName: ${product.name}\nCategory: ${product.category}\nDescription: ${product.description}\n\nSpecifications:\n${Object.entries(product.specifications).map(([key, value]) => `${key}: ${value}`).join('\n')}`);
  };

  const handleDownloadPDF = (product: Product) => {
    if (product.pdf_url) {
      window.open(product.pdf_url, '_blank');
    } else {
      alert('PDF specification sheet will be available soon for this product.');
    }
  };

  const handleDownloadCatalog = () => {
    if (catalogues.length > 0) {
      // If we have catalogues, show them in a modal or list
      const catalogueList = catalogues.map(cat => `${cat.name}: ${cat.url}`).join('\n');
      alert(`Available Catalogues:\n\n${catalogueList}\n\nClick on individual catalogue links to download.`);
    } else {
      alert('Product catalogues will be available soon. Please contact us for detailed specifications.');
    }
  };

  const handleDownloadSpecificCatalogue = (catalogue: any) => {
    if (catalogue.url === '#demo-catalogue') {
      alert(`Демо каталог: ${catalogue.name}\n\nВ реальной версии здесь будет скачиваться PDF файл из Supabase Storage.\n\nЗагрузите PDF файлы в bucket 'catalogues' в Supabase для автоматического отображения.`);
    } else {
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = catalogue.url;
      link.download = `${catalogue.name}-catalogue.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const categories_list = categories.length > 0 
    ? categories.map(cat => cat.name)
    : [
        'Reverse Osmosis Systems',
        'Filtration Systems', 
        'Chemical Dosing',
        'UV Sterilization',
        'Water Softening',
        'Wastewater Treatment'
      ];

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Droplets className="w-4 h-4 mr-2" />
              {t('catalogue.hero.badge')}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('catalogue.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('catalogue.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-24 border border-gray-100">
              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  {t('catalogue.search.label')}
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('catalogue.search.placeholder')}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  {t('catalogue.categories.label')}
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                      selectedCategory === 'all'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    {t('catalogue.categories.all')}
                  </button>
                  {categories_list.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                        selectedCategory === category
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Download Catalog */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('catalogue.catalogues.title')}</h3>
                {catalogues.length > 0 ? (
                  catalogues.map((catalogue, index) => (
                    <button
                      key={index}
                      onClick={() => handleDownloadSpecificCatalogue(catalogue)}
                      className="w-full bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-between group"
                    >
                      <div className="flex items-center">
                        <BookOpen className="mr-3 text-blue-600" size={18} />
                        <span>{catalogue.name}</span>
                      </div>
                      <Download className="text-gray-400 group-hover:text-blue-600 transition-colors" size={16} />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">{t('catalogue.catalogues.loading')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-6 text-lg">{t('catalogue.loading.solutions')}</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? t('catalogue.categories.all') : selectedCategory}
                  </h2>
                  <p className="text-gray-600 font-medium">
                    {displayProducts.length} {displayProducts.length === 1 ? t('catalogue.solutions.available') : t('catalogue.solutions.availablePlural')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {displayProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group border border-gray-100">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image_url || 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={product.name}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {product.category}
                          </span>
                        </div>
                        {product.is_featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                        {/* Specifications */}
                        <div className="space-y-2 mb-6">
                          {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-gray-500 font-medium">{key}:</span>
                              <span className="text-gray-900 font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>

                        {product.price && (
                          <div className="mb-6">
                            <span className="text-2xl font-bold text-blue-600">
                              ${product.price.toLocaleString()}
                            </span>
                            <span className="text-gray-500 text-sm ml-2">starting from</span>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleGetQuote(product)}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                          >
                            <Calculator className="mr-2" size={16} />
                            {t('common.getQuote')}
                          </button>
                          <button 
                            onClick={() => handleViewDetails(product)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-all duration-300"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleDownloadPDF(product)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-all duration-300"
                            title="Download PDF"
                          >
                            <FileText size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {displayProducts.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('catalogue.no.products')}</h3>
                    <p className="text-gray-600">{t('catalogue.no.products.desc')}</p>
                  </div>
                )}
              </>
            )}

            {/* Catalogues Section */}
            {catalogues.length > 0 && (
              <div className="mt-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('catalogue.catalogues.title')}</h2>
                  <p className="text-lg text-gray-600">{t('catalogue.catalogues.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {catalogues.map((catalogue, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group border border-gray-100">
                      <div className="relative overflow-hidden">
                        <img
                          src={catalogue.image}
                          alt={catalogue.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {t('catalogue.catalogues.pdf')}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {catalogue.name} {t('catalogue.catalogues.title').slice(0, -1)}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {t('catalogue.catalogues.subtitle')} {catalogue.name}.
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                          <span>{t('catalogue.catalogues.pdf')}</span>
                          <span>{(catalogue.size / 1024 / 1024).toFixed(1)} {t('catalogue.catalogues.size')}</span>
                        </div>

                        <button 
                          onClick={() => handleDownloadSpecificCatalogue(catalogue)}
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                        >
                          <Download className="mr-2" size={16} />
                          {t('catalogue.catalogues.download.pdf')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {selectedProduct && (
        <QuoteModal
          product={selectedProduct}
          isOpen={showQuoteModal}
          onClose={() => {
            setShowQuoteModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Catalogue;