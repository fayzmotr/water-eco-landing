import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleSocialClick = (platform: string) => {
    alert(`${platform} social media page will open here. Follow us for updates!`);
  };

  const handleContactClick = (type: 'phone' | 'email' | 'location') => {
    switch (type) {
      case 'phone':
        window.open('tel:+998712562600', '_self');
        break;
      case 'email':
        window.open('mailto:ecgtashkent@gmail.com', '_self');
        break;
      case 'location':
        alert('Location: Tashkent, Mirabadsky district, Shahrisabz str. 36');
        break;
    }
  };

  const handlePolicyClick = (policy: string) => {
    alert(`${policy} page will be available soon. Please contact us for more information.`);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="https://i.imgur.com/your-logo-url.png"
                  alt="ECO CONSTRUCTION GROUP Logo"
                  className="w-12 h-12 object-contain brightness-0 invert"
                  onError={(e) => {
                    // Fallback to a water drop icon if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-xl items-center justify-center hidden">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold">ECO CONSTRUCTION GROUP</span>
                <span className="text-sm text-gray-400 block">{t('footer.company.tagline')}</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              {t('footer.company.description')}
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialClick('Website')}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <Globe size={20} />
              </button>
              <button 
                onClick={() => handleSocialClick('LinkedIn')}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <Linkedin size={20} />
              </button>
              <button 
                onClick={() => handleSocialClick('Twitter')}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <Twitter size={20} />
              </button>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.solutions.title')}</h3>
            <ul className="space-y-3">
              <li><Link to="/catalogue" className="text-gray-300 hover:text-white transition-colors text-sm">Wastewater Treatment Plants</Link></li>
              <li><Link to="/catalogue" className="text-gray-300 hover:text-white transition-colors text-sm">Water Purification Systems</Link></li>
              <li><Link to="/catalogue" className="text-gray-300 hover:text-white transition-colors text-sm">BioSteps BS Systems</Link></li>
              <li><Link to="/catalogue" className="text-gray-300 hover:text-white transition-colors text-sm">Modular Treatment Units</Link></li>
              <li><Link to="/catalogue" className="text-gray-300 hover:text-white transition-colors text-sm">Pumping Stations</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.company.title')}</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">{t('nav.about')}</Link></li>
              <li><Link to="/clients" className="text-gray-300 hover:text-white transition-colors text-sm">{t('nav.projects')}</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors text-sm">{t('nav.pricing')}</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">{t('nav.contact')}</Link></li>
              <li><button onClick={() => alert('Careers page coming soon!')} className="text-gray-300 hover:text-white transition-colors text-sm">Careers</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.contact.title')}</h3>
            <div className="space-y-4">
              <button 
                onClick={() => handleContactClick('location')}
                className="flex items-start space-x-3 text-left hover:bg-gray-800 p-2 rounded transition-colors w-full"
              >
                <MapPin size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">
                  Tashkent, Mirabadsky district<br />
                  Shahrisabz str. 36
                </span>
              </button>
              <button 
                onClick={() => handleContactClick('phone')}
                className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded transition-colors w-full text-left"
              >
                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+998 (71) 256-26-00</span>
              </button>
              <button 
                onClick={() => handleContactClick('email')}
                className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded transition-colors w-full text-left"
              >
                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">ecgtashkent@gmail.com</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ECO CONSTRUCTION GROUP. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button 
                onClick={() => handlePolicyClick('Privacy Policy')}
                className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer"
              >
                {t('footer.privacy')}
              </button>
              <button 
                onClick={() => handlePolicyClick('Terms of Service')}
                className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer"
              >
                {t('footer.terms')}
              </button>
              <button 
                onClick={() => handlePolicyClick('Cookie Policy')}
                className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer"
              >
                {t('footer.cookies')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;