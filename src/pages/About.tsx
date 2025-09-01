import React from 'react';
import { Award, Users, Target, Zap, Shield, Globe, Droplets, CheckCircle, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.desc')
    },
    {
      icon: Users,
      title: t('about.values.partnership.title'),
      description: t('about.values.partnership.desc')
    },
    {
      icon: Zap,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.desc')
    },
    {
      icon: Globe,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.desc')
    }
  ];

  const certifications = [
    'ISO 9001:2015 Quality Management Systems',
    'ISO 14001:2015 Environmental Management',
    'Water Treatment Equipment Certification',
    'Municipal Engineering License',
    'Industrial Wastewater Treatment Permit',
    'Environmental Protection Compliance'
  ];

  const milestones = [
    { year: '2016', title: 'Company Founded', description: 'Established as water and wastewater treatment specialist' },
    { year: '2017', title: 'First Major Project', description: 'Completed initial rural settlement projects' },
    { year: '2018', title: 'Technology Advancement', description: 'Implemented BioSteps biological treatment systems' },
    { year: '2020', title: 'Industrial Expansion', description: 'Completed large-scale poultry farm treatment plant' },
    { year: '2024', title: 'Regional Leadership', description: 'Recognized as leading water treatment provider in Central Asia' }
  ];

  const handleGetInTouch = () => {
    window.location.href = '/contact';
  };

  const handleViewProjects = () => {
    window.location.href = '/clients';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium mb-8">
              <Droplets className="w-4 h-4 mr-2" />
              {t('about.hero.badge')}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8">
              {t('about.hero.title')}
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('about.hero.titleHighlight')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.journey.title')}</h2>
                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                  <p>
                    Founded in 2016, our company has specialized in water and wastewater treatment 
                    solutions across Uzbekistan. With 8 years of dedicated service, we have completed 
                    over 20 successful projects ranging from small rural settlements to large 
                    industrial facilities.
                  </p>
                  <p>
                    Our expertise spans from 20 m³/day systems for small communities to massive 
                    1,000,000 m³/day municipal treatment plants. We pride ourselves on delivering 
                    98-99% treatment efficiency using advanced biological and physical-chemical 
                    treatment technologies.
                  </p>
                  <p>
                    Today, we stand as a trusted partner for municipalities, industries, and 
                    communities seeking reliable, efficient, and environmentally responsible 
                    water treatment solutions.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleGetInTouch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get In Touch
                  </button>
                  <button
                    onClick={handleViewProjects}
                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Our Projects
                  </button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Water treatment facility"
                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{t('about.mission.title')}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('about.mission.content')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mr-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{t('about.vision.title')}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('about.vision.content')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.values.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group cursor-pointer" onClick={handleGetInTouch}>
                <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.journey.title')}</h2>
            <p className="text-xl text-gray-600">Key milestones in our growth and innovation</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow" onClick={handleGetInTouch}>
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Removed fake team members */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.team.title')}</h2>
            <p className="text-xl text-gray-600">{t('about.team.subtitle')}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-16 text-center border border-gray-100">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Professional Team</h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Our team consists of experienced water treatment engineers, project managers, and technical specialists 
              dedicated to delivering exceptional results for every project.
            </p>
            <button
              onClick={handleGetInTouch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Meet Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.certifications.title')}</h2>
            <p className="text-xl text-gray-600">{t('about.certifications.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center cursor-pointer" onClick={handleGetInTouch}>
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-gray-900">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;