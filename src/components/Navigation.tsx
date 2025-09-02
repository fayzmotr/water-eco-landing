import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.solutions'), path: '/catalogue' },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.projects'), path: '/clients' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleAdminClick = () => {
    window.location.href = '/admin';
  };

  const handleNavItemClick = (path: string) => {
    setIsOpen(false);
    window.location.href = path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="https://i.imgur.com/your-logo-url.png"
                alt="ECO CONSTRUCTION GROUP Logo"
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  // Fallback to a water drop icon if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-xl items-center justify-center shadow-lg hidden">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
                </svg>
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">ECO CONSTRUCTION GROUP</span>
              <span className="text-sm text-gray-500 block font-medium">{t('footer.company.tagline')}</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive(item.path)
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <LanguageSwitcher />
            
            <button
              onClick={handleAdminClick}
              className="ml-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {t('nav.admin')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-700 transition-colors duration-200 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavItemClick(item.path)}
                  className={`text-sm font-medium px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    isActive(item.path)
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleAdminClick();
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 mx-4 mt-2 text-center"
              >
                {t('nav.admin')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;