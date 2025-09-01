import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Users, Award, TrendingUp, Phone, Shield, Zap, Globe, Droplets } from 'lucide-react';
import { getClients, getTestimonials, getProducts } from '../lib/database';
import { Client, Testimonial, Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [clientsResult, testimonialsResult, productsResult] = await Promise.all([
        getClients({ featured: true, limit: 8 }),
        getTestimonials({ featured: true, limit: 3 }),
        getProducts({ featured: true, limit: 4 })
      ]);

      if (clientsResult.data) setClients(clientsResult.data);
      if (testimonialsResult.data) setTestimonials(testimonialsResult.data);
      if (productsResult.data) setProducts(productsResult.data);
    } catch (error) {
      console.warn('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCallNow = () => {
    window.open('tel:+998712005000', '_self');
  };

  const handleEmailUs = () => {
    window.open('mailto:info@waterecobest.uz', '_self');
  };

  const stats = [
    { icon: Users, label: t('home.stats.clients'), value: '20+', color: 'text-blue-600' },
    { icon: Award, label: t('home.stats.years'), value: '8', color: 'text-green-600' },
    { icon: TrendingUp, label: t('home.stats.projects'), value: '1M m³/day', color: 'text-purple-600' },
    { icon: CheckCircle, label: t('home.stats.success'), value: '98-99%', color: 'text-orange-600' }
  ];

  const solutions = [
    {
      title: t('home.solutions.filtration.title'),
      description: t('home.solutions.filtration.desc'),
      icon: Shield,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: t('home.solutions.monitoring.title'),
      description: t('home.solutions.monitoring.desc'),
      icon: Zap,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: t('home.solutions.standards.title'),
      description: t('home.solutions.standards.desc'),
      icon: Globe,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: t('home.solutions.sustainable.title'),
      description: t('home.solutions.sustainable.desc'),
      icon: Droplets,
      gradient: 'from-cyan-500 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium">
                  <Droplets className="w-4 h-4 mr-2" />
                  {t('home.hero.badge')}
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  {t('home.hero.title')}
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {t('home.hero.titleHighlight')}
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  {t('home.hero.subtitle')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/catalogue"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center group shadow-xl"
                >
                  {t('home.hero.exploreSolutions')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <button
                  onClick={handleCallNow}
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                >
                  <Phone className="mr-2" size={20} />
                  {t('home.hero.getConsultation')}
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl transform rotate-6 backdrop-blur-sm"></div>
                <img
                  src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Water Treatment Facility"
                  className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('home.solutions.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.solutions.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => window.location.href = '/catalogue'}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${solution.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section - Only show if we have real clients */}
      {clients.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('home.clients.title')}</h2>
              <p className="text-xl text-gray-600">{t('home.clients.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {clients.slice(0, 6).map((client) => (
                <div key={client.id} className="group cursor-pointer" onClick={() => window.location.href = '/clients'}>
                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      className="w-full h-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section - Only show if we have real testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('home.testimonials.title')}</h2>
              <p className="text-xl text-gray-600">{t('home.testimonials.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="border-t border-gray-100 pt-6">
                    <div className="font-bold text-gray-900">{testimonial.client_name}</div>
                    <div className="text-gray-600 font-medium">{testimonial.client_company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              {t('home.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {t('home.cta.startProject')}
              </Link>
              <Link
                to="/catalogue"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                {t('home.cta.viewSolutions')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;