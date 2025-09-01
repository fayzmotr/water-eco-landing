import React, { useState, useEffect } from 'react';
import { Building, Globe, Award, Users, Droplets, TrendingUp, CheckCircle } from 'lucide-react';
import { getClients } from '../lib/database';
import { Client } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Clients: React.FC = () => {
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await getClients();
      
      if (error) {
        console.warn('Error fetching clients:', error);
      } else if (data) {
        setClients(data);
      }
    } catch (error) {
      console.warn('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Users, label: t('clients.stats.partners'), value: '20+', color: 'text-blue-600' },
    { icon: Building, label: t('clients.stats.industries'), value: '8', color: 'text-green-600' },
    { icon: Globe, label: t('clients.stats.countries'), value: '15+', color: 'text-purple-600' },
    { icon: Award, label: t('clients.stats.partnership'), value: '8', color: 'text-orange-600' }
  ];

  const industries = [
    { name: 'Municipal Treatment', count: 12, color: 'bg-blue-500', percentage: 85 },
    { name: 'Industrial Wastewater', count: 5, color: 'bg-green-500', percentage: 72 },
    { name: 'Rural Settlements', count: 8, color: 'bg-purple-500', percentage: 58 },
    { name: 'Agricultural Processing', count: 3, color: 'bg-orange-500', percentage: 45 },
    { name: 'Regional Facilities', count: 4, color: 'bg-red-500', percentage: 38 },
    { name: 'Community Systems', count: 6, color: 'bg-cyan-500', percentage: 32 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Droplets className="w-4 h-4 mr-2" />
              {t('clients.hero.badge')}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('clients.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('clients.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

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

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('clients.industries.title')}</h2>
            <p className="text-xl text-gray-600">{t('clients.industries.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{industry.name}</h3>
                    <p className="text-gray-600 font-medium">{industry.count} {t('clients.industries.projects')}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full ${industry.color}`}></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${industry.color} transition-all duration-1000`}
                    style={{ width: `${industry.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Grid - Only show if we have real clients */}
      {clients.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('clients.partners.title')}</h2>
              <p className="text-xl text-gray-600">{t('clients.partners.subtitle')}</p>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-6 text-lg">{t('clients.partners.loading')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clients.map((client) => (
                  <div key={client.id} className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                    <div className="h-32 bg-white flex items-center justify-center p-8">
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{client.name}</h3>
                      {client.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed">{client.description}</p>
                      )}
                      {client.website && (
                        <a
                          href={client.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                        >
                          {t('common.learnMore')} →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* If no clients, show a message */}
      {clients.length === 0 && !loading && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gray-50 rounded-2xl p-16 border border-gray-100">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Client Portfolio</h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We are building partnerships with municipalities, industries, and communities across Uzbekistan and Central Asia. 
                Contact us to learn more about our water treatment solutions and how we can serve your needs.
              </p>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">{t('clients.cta.title')}</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              {t('clients.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {t('clients.cta.start')}
              </a>
              <a
                href="/catalogue"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                {t('clients.cta.explore')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;