import React from 'react';
import { Cpu, Wifi, Container, Settings, BarChart3, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TechnologyInnovation: React.FC = () => {
  const { t } = useLanguage();

  const innovations = [
    {
      icon: Container,
      title: 'HDPE Container Technology',
      description: 'Revolutionary modular treatment systems built with High-Density Polyethylene containers for rapid deployment, excellent chemical resistance, and long-term durability.',
      features: [
        'Modular containerized design',
        'Chemical-resistant HDPE construction', 
        'Rapid 3-6 month deployment',
        'Scalable capacity expansion',
        'Weather-resistant operation',
        'Minimal site preparation required'
      ],
      image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop',
      color: 'blue'
    },
    {
      icon: Cpu,
      title: 'Advanced Process Automation',
      description: 'Cutting-edge SCADA systems and PLC controls provide fully automated operation with real-time optimization for maximum efficiency and minimal operator intervention.',
      features: [
        'PLC-based process control',
        'SCADA monitoring systems',
        'Automated chemical dosing',
        'Self-optimizing processes',
        'Alarm and notification systems',
        'Energy optimization algorithms'
      ],
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
      color: 'green'
    },
    {
      icon: Wifi,
      title: 'Remote Monitoring & Control',
      description: 'IoT-enabled remote monitoring systems allow 24/7 oversight, predictive maintenance, and immediate response to operational changes from anywhere.',
      features: [
        'IoT sensor integration',
        '24/7 remote monitoring',
        'Mobile app control',
        'Predictive maintenance alerts',
        'Performance analytics',
        'Cloud-based data storage'
      ],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
      color: 'purple'
    }
  ];

  const technicalAdvantages = [
    {
      icon: Shield,
      title: 'Proven Reliability',
      description: '25+ successful implementations across diverse conditions',
      stat: '99.2%',
      statLabel: 'System Uptime'
    },
    {
      icon: BarChart3,
      title: 'Performance Excellence',
      description: 'Consistently achieving superior treatment efficiency',
      stat: '98-99%',
      statLabel: 'Treatment Efficiency'
    },
    {
      icon: Settings,
      title: 'Adaptive Technology',
      description: 'Systems that adapt to varying loads and conditions',
      stat: '40%',
      statLabel: 'Energy Savings'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          gradient: 'from-blue-600 to-blue-700'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-600',
          gradient: 'from-green-600 to-green-700'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-600',
          gradient: 'from-purple-600 to-purple-700'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-600',
          gradient: 'from-gray-600 to-gray-700'
        };
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Cpu className="w-4 h-4 mr-2" />
            Innovation & Technology
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('technology.title', 'Leading Technology Integration')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('technology.subtitle', 'Our advanced technology stack combines European engineering excellence with innovative automation and monitoring systems for superior performance and reliability.')}
          </p>
        </div>

        {/* Main Technology Features */}
        <div className="space-y-24 mb-20">
          {innovations.map((innovation, index) => {
            const colors = getColorClasses(innovation.color);
            const isReverse = index % 2 === 1;
            
            return (
              <div key={index} className={`flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                <div className="flex-1">
                  <div className={`${colors.bg} rounded-2xl p-10 border-2 ${colors.border}`}>
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${colors.gradient} rounded-2xl flex items-center justify-center mr-6`}>
                        <innovation.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">{innovation.title}</h3>
                    </div>
                    
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                      {innovation.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {innovation.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className={`w-2 h-2 ${colors.text.replace('text-', 'bg-')} rounded-full mr-3`}></div>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-2xl transform rotate-3 opacity-20`}></div>
                    <img
                      src={innovation.image}
                      alt={innovation.title}
                      className="relative rounded-2xl shadow-2xl w-full h-80 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop&sig=${index}`;
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Advantages */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12 border border-gray-100">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('technology.advantages.title', 'Technical Excellence')}
            </h3>
            <p className="text-xl text-gray-600">
              {t('technology.advantages.subtitle', 'Proven performance metrics from our deployed systems')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technicalAdvantages.map((advantage, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{advantage.stat}</div>
                <div className="text-sm text-blue-600 font-medium mb-4">{advantage.statLabel}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h4>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              {t('technology.cta.title', 'Experience Innovation in Action')}
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {t('technology.cta.subtitle', 'See how our advanced technology solutions can transform your water treatment operations.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.location.href = '/clients'}
                className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg"
              >
                {t('technology.cta.projects', 'View Technology Projects')}
              </button>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                {t('technology.cta.discuss', 'Discuss Your Requirements')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyInnovation;