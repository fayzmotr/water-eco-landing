import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Clock, Users, Award, CheckCircle, Wrench, Zap, Globe } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SolutionDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onGetQuote: () => void;
}

const SolutionDetailsModal: React.FC<SolutionDetailsModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onGetQuote 
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'specifications', label: 'Technical Specs', icon: Wrench },
    { id: 'construction', label: 'Construction Process', icon: Users },
    { id: 'technology', label: 'European Technology', icon: Zap }
  ];

  const europeanPartners = [
    { name: 'REKO', country: 'Germany', specialty: 'Filtration Systems' },
    { name: 'TORAY', country: 'Japan', specialty: 'Membrane Technology' },
    { name: 'Pieralisi', country: 'Italy', specialty: 'Separation Technology' },
    { name: 'BÖRGER', country: 'Germany', specialty: 'Pumping Systems' },
    { name: 'WILO', country: 'Germany', specialty: 'High-Efficiency Pumps' }
  ];

  const constructionPhases = [
    {
      phase: 1,
      title: 'Site Assessment & Design',
      duration: '2-4 weeks',
      activities: [
        'Geological and environmental assessment',
        'Water quality and flow rate analysis',
        'Capacity requirements calculation',
        'Technology selection and system design',
        'Regulatory compliance planning'
      ]
    },
    {
      phase: 2,
      title: 'Construction & Installation',
      duration: '3-20 months',
      activities: [
        'Site preparation and civil works',
        'HDPE container installation',
        'European equipment integration',
        'Piping and electrical systems',
        'Control system programming',
        'Quality assurance testing'
      ]
    },
    {
      phase: 3,
      title: 'Commissioning & Training',
      duration: '2-6 weeks',
      activities: [
        'System performance testing',
        'Process optimization',
        'Operator training programs',
        'Documentation handover',
        'Warranty activation'
      ]
    }
  ];

  const includedServices = [
    'Site assessment and design consultation',
    'European technology integration',
    'Construction project management',
    'Quality control and testing',
    'Commissioning and startup',
    'Staff training and support',
    'Ongoing technical support',
    'Performance monitoring',
    'Maintenance planning',
    'Warranty and support services'
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative">
              <img
                src={product.image_url || product.images?.[0] || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'}
                alt={product.name}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-blue-200 font-medium">{product.category}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Project Scope</h4>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Included Services</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {includedServices.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 border border-blue-100">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Proven Performance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-gray-600 text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">98-99%</div>
                  <div className="text-gray-600 text-sm">Treatment Efficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                  <div className="text-gray-600 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">35,000</div>
                  <div className="text-gray-600 text-sm">m³/day Max Capacity</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Technical Parameters</h4>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className="font-bold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Design Standards */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Design Standards & Compliance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">European Standards</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• EN 12566 - Small wastewater treatment systems</li>
                    <li>• ISO 9001:2015 - Quality management</li>
                    <li>• ISO 14001:2015 - Environmental management</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Local Compliance</h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Uzbekistan environmental regulations</li>
                    <li>• Municipal water quality standards</li>
                    <li>• Industrial discharge requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Drawings */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Technical Documentation</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Wrench className="w-6 h-6 text-blue-600 mr-3" />
                  <span className="font-semibold text-gray-900">Complete Technical Package Available</span>
                </div>
                <ul className="text-gray-700 space-y-2">
                  <li>• Process flow diagrams</li>
                  <li>• Equipment layouts and dimensions</li>
                  <li>• Electrical and control schematics</li>
                  <li>• Installation and maintenance manuals</li>
                  <li>• Performance guarantee documentation</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'construction':
        return (
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Construction Methodology</h4>
              <div className="space-y-6">
                {constructionPhases.map((phase) => (
                  <div key={phase.phase} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center text-white font-bold mr-4">
                        {phase.phase}
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-gray-900">{phase.title}</h5>
                        <div className="flex items-center text-blue-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-16">
                      <ul className="space-y-2">
                        {phase.activities.map((activity, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Management */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Project Management Excellence</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h5 className="font-semibold text-gray-900 mb-2">Quality Assurance</h5>
                  <p className="text-gray-600 text-sm">Rigorous quality control at every construction phase</p>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h5 className="font-semibold text-gray-900 mb-2">On-Time Delivery</h5>
                  <p className="text-gray-600 text-sm">99.2% on-time project completion rate</p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h5 className="font-semibold text-gray-900 mb-2">Expert Team</h5>
                  <p className="text-gray-600 text-sm">Experienced engineers and project managers</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'technology':
        return (
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">European Technology Partners</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {europeanPartners.map((partner, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold mr-4">
                        {partner.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">{partner.name}</h5>
                        <p className="text-blue-600 text-sm">🇪🇺 {partner.country}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{partner.specialty}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Benefits */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Technology Integration Benefits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <Zap className="w-8 h-8 text-blue-600 mb-4" />
                  <h5 className="font-bold text-gray-900 mb-3">Advanced Automation</h5>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• PLC-based process control</li>
                    <li>• SCADA monitoring systems</li>
                    <li>• Remote monitoring capabilities</li>
                    <li>• Predictive maintenance alerts</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <Award className="w-8 h-8 text-green-600 mb-4" />
                  <h5 className="font-bold text-gray-900 mb-3">Superior Performance</h5>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• 98-99% treatment efficiency</li>
                    <li>• Energy optimization algorithms</li>
                    <li>• Extended equipment lifespan</li>
                    <li>• Reduced maintenance costs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Innovation Highlight */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">HDPE Container Technology</h4>
              <p className="text-gray-700 mb-4">
                Revolutionary modular treatment systems built with High-Density Polyethylene containers 
                for rapid deployment, excellent chemical resistance, and long-term durability.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">3-6</div>
                  <div className="text-gray-600 text-xs">months deployment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">25+</div>
                  <div className="text-gray-600 text-xs">year lifespan</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                  <div className="text-gray-600 text-xs">chemical resistant</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">40%</div>
                  <div className="text-gray-600 text-xs">energy savings</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-blue-100">{product.category}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                +998 (71) 256-26-00
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                ecgtashkent@gmail.com
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={onGetQuote}
                className="px-8 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all font-semibold"
              >
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetailsModal;