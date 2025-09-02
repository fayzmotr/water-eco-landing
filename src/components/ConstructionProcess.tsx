import React from 'react';
import { FileText, Wrench, CheckCircle2, PlayCircle, Users, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ConstructionProcess: React.FC = () => {
  const { t } = useLanguage();

  const processSteps = [
    {
      icon: FileText,
      title: 'Site Assessment & Design',
      duration: '2-4 weeks',
      description: 'Comprehensive site evaluation, water quality analysis, and detailed engineering design with European technology specifications.',
      activities: [
        'Geological and environmental assessment',
        'Water quality and flow rate analysis',
        'Capacity requirements calculation',
        'Technology selection and system design',
        'Regulatory compliance planning',
        'Construction timeline development'
      ],
      color: 'blue'
    },
    {
      icon: Wrench,
      title: 'Construction & Installation',
      duration: '3-20 months',
      description: 'Professional construction management with European technology integration, quality control, and safety compliance.',
      activities: [
        'Site preparation and civil works',
        'HDPE container installation',
        'European equipment integration',
        'Piping and electrical systems',
        'Control system programming',
        'Quality assurance testing'
      ],
      color: 'green'
    },
    {
      icon: CheckCircle2,
      title: 'Commissioning & Training',
      duration: '2-6 weeks',
      description: 'System testing, performance optimization, and comprehensive operator training for long-term success.',
      activities: [
        'System performance testing',
        'Process optimization',
        'Operator training programs',
        'Documentation handover',
        'Warranty activation',
        'Ongoing support setup'
      ],
      color: 'purple'
    }
  ];

  const projectExamples = [
    {
      name: 'Almalyk Mining Complex',
      location: 'Tashkent Region',
      capacity: '35,000 m³/day',
      duration: '24 months',
      challenge: 'Heavy metal removal and acid mine drainage treatment',
      solution: 'Advanced chemical precipitation with metal recovery systems',
      technology: ['Heavy Metal Removal', 'pH Neutralization', 'Sludge Dewatering', 'Water Recycling'],
      image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop',
      year: '2014-2016'
    },
    {
      name: 'Namangan Municipal Plant',
      location: 'Namangan Region',
      capacity: '22,000 m³/day',
      duration: '22 months',
      challenge: 'Municipal wastewater with high textile industry load',
      solution: 'Specialized pretreatment with biological systems and color removal',
      technology: ['Textile Pretreatment', 'Biological Treatment', 'Color Removal', 'Advanced Oxidation'],
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
      year: '2014-2016'
    },
    {
      name: 'Termez Industrial Complex',
      location: 'Surkhandarya Region',
      capacity: '10,000 m³/day',
      duration: '14 months',
      challenge: 'Industrial wastewater treatment with remote monitoring',
      solution: 'HDPE container technology with German BÖRGER pumping systems',
      technology: ['BÖRGER Pumping', 'Chemical Treatment', 'Remote Monitoring', 'Biological Treatment'],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
      year: '2019-2020'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          gradient: 'from-blue-600 to-blue-700',
          ring: 'ring-blue-600'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          gradient: 'from-green-600 to-green-700',
          ring: 'ring-green-600'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          gradient: 'from-purple-600 to-purple-700',
          ring: 'ring-purple-600'
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-600',
          gradient: 'from-gray-600 to-gray-700',
          ring: 'ring-gray-600'
        };
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-6">
            <Wrench className="w-4 h-4 mr-2" />
            Construction Excellence
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('construction.title', 'Proven Construction Process')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('construction.subtitle', 'Our systematic approach to construction ensures successful project delivery from initial assessment to final commissioning, backed by 25+ completed projects.')}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {processSteps.map((step, index) => {
            const colors = getColorClasses(step.color);
            
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-r ${colors.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-8 h-8 ${colors.bg} ${colors.text} rounded-full flex items-center justify-center font-bold mr-3`}>
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-medium mb-4`}>
                      <Clock className="w-4 h-4 mr-1" />
                      {step.duration}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-3">
                    {step.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex items-start">
                        <CheckCircle2 className={`w-5 h-5 ${colors.text} mr-3 mt-0.5 flex-shrink-0`} />
                        <span className="text-gray-600 text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Real Project Examples */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              {t('construction.examples.title', 'Real Project Examples')}
            </h3>
            <p className="text-xl text-gray-600">
              {t('construction.examples.subtitle', 'See our construction process in action through completed projects')}
            </p>
          </div>

          <div className="space-y-16">
            {projectExamples.map((project, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center mr-4">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900">{project.name}</h4>
                          <p className="text-gray-600">{project.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{project.year}</div>
                        <div className="text-lg font-semibold text-blue-600">{project.capacity}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Challenge:</h5>
                        <p className="text-gray-600 text-sm">{project.challenge}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Solution:</h5>
                        <p className="text-gray-600 text-sm">{project.solution}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-900 mb-3">Technologies Applied:</h5>
                      <div className="flex flex-wrap gap-2">
                        {project.technology.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      Construction Duration: {project.duration}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl transform rotate-2 opacity-20"></div>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="relative rounded-2xl shadow-2xl w-full h-80 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop&sig=${index}`;
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                      <div className="text-sm font-medium">{project.capacity}</div>
                      <div className="text-xs opacity-75">Daily Capacity</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              {t('construction.metrics.title', 'Construction Success Metrics')}
            </h3>
            <p className="text-xl opacity-90">
              {t('construction.metrics.subtitle', 'Proven track record of successful project delivery')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="opacity-75">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99.2%</div>
              <div className="opacity-75">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="opacity-75">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="opacity-75">Years Experience</div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg"
            >
              {t('construction.cta', 'Start Your Project')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionProcess;