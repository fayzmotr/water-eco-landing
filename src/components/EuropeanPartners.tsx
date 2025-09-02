import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const EuropeanPartners: React.FC = () => {
  const { t } = useLanguage();

  const partners = [
    {
      name: 'REKO',
      country: 'Germany',
      specialty: 'Filtration Systems & Water Treatment',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center',
      description: 'Advanced filtration technology and water treatment solutions'
    },
    {
      name: 'TORAY',
      country: 'Japan',
      specialty: 'Membrane Technology',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop&crop=center',
      description: 'World-leading membrane filtration and reverse osmosis technology'
    },
    {
      name: 'Pieralisi',
      country: 'Italy',
      specialty: 'Separation Technology',
      logo: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=200&h=100&fit=crop&crop=center',
      description: 'Industrial separation equipment and centrifugal technology'
    },
    {
      name: 'BÖRGER',
      country: 'Germany', 
      specialty: 'Pumping Systems',
      logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=100&fit=crop&crop=center',
      description: 'Rotary lobe pumps and advanced pumping solutions'
    },
    {
      name: 'WILO',
      country: 'Germany',
      specialty: 'Pump Technology',
      logo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=100&fit=crop&crop=center',
      description: 'High-efficiency pumps and intelligent pumping systems'
    },
    {
      name: 'BOSMAN',
      country: 'Netherlands',
      specialty: 'Water Technology',
      logo: 'https://images.unsplash.com/photo-1572798635681-edb1a7aee5e7?w=200&h=100&fit=crop&crop=center',
      description: 'Innovative water treatment and environmental technology'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
            🇪🇺 European Technology Integration
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('partners.title', 'Trusted European Partners')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('partners.subtitle', 'We integrate cutting-edge European technology from world-renowned manufacturers to deliver superior water treatment solutions with proven reliability and efficiency.')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-w-16 aspect-h-8 mb-4">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-full h-12 object-contain rounded-lg bg-gray-50 p-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center&sig=${index}`;
                    }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{partner.name}</h3>
                  <p className="text-xs text-blue-600 font-medium mb-2">🇪🇺 {partner.country}</p>
                  <p className="text-xs text-gray-600">{partner.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('partners.quality.title', 'European Quality Standards')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('partners.quality.description', 'All equipment meets strict European quality and environmental standards, ensuring long-term reliability and performance.')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('partners.innovation.title', 'Cutting-Edge Innovation')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('partners.innovation.description', 'Latest technological innovations in membrane filtration, pumping systems, and automated controls for optimal efficiency.')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v4m0 12v4m10-12h-4M6 12H2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('partners.support.title', 'Comprehensive Support')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('partners.support.description', 'Direct technical support from European manufacturers, with local expertise for installation, maintenance, and optimization.')}
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-10 border border-blue-100">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('partners.cta.title', '5+ Years of European Technology Integration')}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('partners.cta.subtitle', 'Over 25 completed projects utilizing European technology partnerships, delivering superior performance and reliability across Uzbekistan.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.location.href = '/clients'}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('partners.cta.projects', 'View Our Projects')}
              </button>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 px-10 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                {t('partners.cta.discuss', 'Discuss Your Project')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EuropeanPartners;