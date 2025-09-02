import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ru' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.solutions': 'Solutions',
    'nav.pricing': 'Services',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin Portal',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.download': 'Download',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.featured': 'Featured',
    'common.more': 'More',
    'common.less': 'Less',
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.getQuote': 'Get Quote',
    'common.requestQuote': 'Request Quote',
    'common.contactUs': 'Contact Us',
    'common.callNow': 'Call Now',
    'common.emailUs': 'Email Us',

    // Home Page
    'home.hero.badge': 'Design, Construction & Reconstruction of Treatment Facilities',
    'home.hero.title': 'Water Treatment',
    'home.hero.titleHighlight': 'Engineering Excellence',
    'home.hero.subtitle': 'Specialized in design, construction and reconstruction of wastewater treatment facilities from 20 m³/day to 1,000,000 m³/day. European technology integration for municipal and industrial applications.',
    'home.hero.exploreSolutions': 'View Projects',
    'home.hero.getConsultation': 'Get Engineering Consultation',

    'home.stats.clients': 'Projects Completed',
    'home.stats.years': 'Years of Experience',
    'home.stats.projects': 'Treatment Capacity', 
    'home.stats.success': 'Efficiency Rate',

    'home.solutions.title': 'Engineering & Construction Services',
    'home.solutions.subtitle': 'From small settlements to large cities, we design, construct and reconstruct treatment facilities using European technologies and HDPE equipment',
    'home.solutions.filtration.title': 'Biological Treatment Plants',
    'home.solutions.filtration.desc': 'Design and construction of biological wastewater treatment facilities for municipal and industrial applications',
    'home.solutions.monitoring.title': 'Storm Water Treatment',
    'home.solutions.monitoring.desc': 'Sand-oil separators and storm water treatment facilities using innovative HDPE materials',
    'home.solutions.standards.title': 'Pumping Stations',
    'home.solutions.standards.desc': 'Sewerage and pressure boosting pumping stations with automated control systems',
    'home.solutions.sustainable.title': 'Modular Drinking Water Units',
    'home.solutions.sustainable.desc': 'Membrane-based modular drinking water treatment systems with full automation and remote monitoring',

    'home.clients.title': 'Trusted by Communities & Industries',
    'home.clients.subtitle': 'Serving municipalities, industries, and communities across Uzbekistan and Central Asia',

    'home.testimonials.title': 'Client Success Stories',
    'home.testimonials.subtitle': 'Real results from our water treatment implementations',

    'home.cta.title': 'Ready to Solve Your Water Treatment Challenges?',
    'home.cta.subtitle': 'Partner with us to implement proven water and wastewater treatment solutions that ensure compliance, efficiency, and environmental protection.',
    'home.cta.startProject': 'Start Your Project',
    'home.cta.viewSolutions': 'View Solutions',

    // About Page
    'about.hero.badge': 'About ECO CONSTRUCTION GROUP',
    'about.hero.title': 'Engineering & Construction',
    'about.hero.titleHighlight': 'Excellence',
    'about.hero.subtitle': 'Five years of specialized experience in designing, constructing and reconstructing water treatment facilities across Uzbekistan, integrating European technology standards with local expertise',

    'about.journey.title': 'Our Journey',
    'about.mission.title': 'Our Mission',
    'about.mission.content': 'To deliver comprehensive engineering and construction solutions for water treatment infrastructure, from initial design through construction and reconstruction of facilities ranging from 20 m³/day to 1,000,000 m³/day capacity.',
    'about.vision.title': 'Our Vision',
    'about.vision.content': 'To be the leading engineering firm in Central Asia for water treatment infrastructure, recognized for integrating European technology standards with innovative construction methodologies and exceptional project delivery.',

    'about.values.title': 'Our Core Values',
    'about.values.subtitle': 'The principles that drive our engineering excellence and construction quality',
    'about.values.quality.title': 'Engineering Excellence',
    'about.values.quality.desc': 'Delivering superior engineering design and construction quality with proven European technology integration',
    'about.values.partnership.title': 'Project Partnership',
    'about.values.partnership.desc': 'Collaborative approach from design through commissioning, ensuring complete client satisfaction',
    'about.values.innovation.title': 'Technology Integration',
    'about.values.innovation.desc': 'Implementing cutting-edge European technology standards in all our construction projects',
    'about.values.sustainability.title': 'Sustainable Construction',
    'about.values.sustainability.desc': 'Building long-lasting infrastructure that protects environmental resources and ensures operational efficiency',

    'about.team.title': 'Engineering Team',
    'about.team.subtitle': 'Experienced professionals in water treatment facility design, construction management and European technology integration',

    'about.certifications.title': 'Standards & Quality',
    'about.certifications.subtitle': 'Our commitment to European technology standards and construction quality excellence',

    // Catalogue Page
    'catalogue.hero.badge': 'Engineering Solutions',
    'catalogue.hero.title': 'Treatment Facility Construction',
    'catalogue.hero.subtitle': 'Complete design and construction services for water treatment facilities from 20 m³/day to 1,000,000 m³/day capacity with European technology integration',

    'catalogue.search.label': 'Search Solutions',
    'catalogue.search.placeholder': 'Search treatment systems...',
    'catalogue.categories.label': 'Categories',
    'catalogue.categories.all': 'All Solutions',
    'catalogue.download.catalog': 'Download Catalog',
    'catalogue.catalogues.title': 'Product Catalogues',
    'catalogue.catalogues.subtitle': 'Download detailed specifications and product information',
    'catalogue.catalogues.loading': 'Catalogues loading...',
    'catalogue.catalogues.download': 'Download Catalogue',
    'catalogue.catalogues.download.pdf': 'Download PDF',
    'catalogue.catalogues.pdf': 'PDF Format',
    'catalogue.catalogues.size': 'MB',
    'catalogue.solutions.available': 'solution available',
    'catalogue.solutions.availablePlural': 'solutions available',
    'catalogue.product.viewDetails': 'View Details',
    'catalogue.loading.solutions': 'Loading solutions...',
    'catalogue.no.products': 'No products found',
    'catalogue.no.products.desc': 'Try adjusting your search or filter criteria',

    // Services Page (formerly Pricing)
    'pricing.hero.badge': 'Project Consultation',
    'pricing.hero.title': 'Engineering & Construction Services',
    'pricing.hero.subtitle': 'Complete design-build solutions for water treatment facilities from initial concept to final commissioning with European technology standards',

    'pricing.tiers.title': 'Project Consultation Process',
    'pricing.tiers.subtitle': 'Every facility is unique - our engineering team provides customized solutions based on your specific requirements',

    'pricing.systems.title': 'Construction Capabilities',
    'pricing.systems.subtitle': 'We design and construct water treatment facilities for any capacity from small municipal to large industrial applications',
    'pricing.access.title': 'Custom Project Consultation',
    'pricing.access.subtitle': 'Every water treatment facility project is unique. Contact our engineering team for detailed site assessment and custom facility design.',
    'pricing.access.request': 'Request Site Assessment',
    'pricing.access.contact': 'Contact Engineering Team',

    'pricing.custom.title': 'Ready to Start Your Project?',
    'pricing.custom.subtitle': 'We offer complete design-build services for water treatment facilities, from initial site assessment to final commissioning and startup.',
    'pricing.custom.contact': 'Contact Engineering Team',
    'pricing.custom.download': 'Download Company Profile',

    // Clients Page
    'clients.hero.badge': 'Our Project Portfolio',
    'clients.hero.title': 'Proven Track Record',
    'clients.hero.subtitle': 'Over 20 successful water treatment projects across Uzbekistan, from small rural settlements to large industrial facilities',

    'clients.stats.partners': 'Projects Completed',
    'clients.stats.industries': 'Regions Served',
    'clients.stats.countries': 'Treatment Plants',
    'clients.stats.partnership': 'Years Experience',

    'clients.industries.title': 'Applications We Serve',
    'clients.industries.subtitle': 'Specialized treatment solutions across diverse applications and industries',
    'clients.industries.projects': 'active projects',

    'clients.partners.title': 'Our Projects',
    'clients.partners.subtitle': 'Communities and industries that trust our water treatment expertise',
    'clients.partners.loading': 'Loading projects...',

    'clients.cases.title': 'Success Stories',
    'clients.cases.subtitle': 'Real projects delivering measurable environmental and operational benefits',
    'clients.cases.duration': 'Duration',
    'clients.cases.value': 'Project Value',

    'clients.cta.title': 'Ready to Start Your Water Treatment Project?',
    'clients.cta.subtitle': 'Experience the same reliable results and professional service that have made us the trusted choice for water treatment solutions.',
    'clients.cta.start': 'Start Your Project',
    'clients.cta.explore': 'Explore Solutions',

    // Contact Page
    'contact.hero.badge': 'Contact ECO CONSTRUCTION GROUP',
    'contact.hero.title': 'Engineering Consultation',
    'contact.hero.subtitle': 'Ready to discuss your water treatment facility project? Our engineering team provides comprehensive consultation, design services, and construction management.',

    'contact.info.title': 'Contact Information',
    'contact.info.headquarters': 'Office Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Business Hours',

    'contact.services.title': 'Engineering Services',
    'contact.form.title': 'Send us a Message',
    'contact.form.success': 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Organization',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Message',
    'contact.form.nameRequired': 'Name is required',
    'contact.form.emailRequired': 'Email is required',
    'contact.form.emailInvalid': 'Invalid email address',
    'contact.form.messageRequired': 'Message is required',
    'contact.form.namePlaceholder': 'Enter your full name',
    'contact.form.emailPlaceholder': 'Enter your email',
    'contact.form.companyPlaceholder': 'Your organization name',
    'contact.form.phonePlaceholder': 'Your phone number',
    'contact.form.messagePlaceholder': 'Tell us about your water treatment requirements...',
    'contact.form.sending': 'Sending Message...',
    'contact.form.send': 'Send Message',

    'contact.urgent.title': 'Need Technical Support?',
    'contact.urgent.subtitle': 'Our engineering team is available for urgent water treatment system issues and emergency consultations.',

    // Footer
    'footer.company.tagline': 'Engineering & Construction Excellence',
    'footer.company.description': 'ECO CONSTRUCTION GROUP - specialized engineering and construction company for water treatment facilities. We design, construct and reconstruct treatment plants from 20 m³/day to 1,000,000 m³/day capacity.',
    'footer.solutions.title': 'Engineering Services',
    'footer.company.title': 'Company',
    'footer.contact.title': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',

    // Admin
    'admin.title': 'Admin Portal',
    'admin.subtitle': 'Water Treatment Management System',
    'admin.login.title': 'Admin Portal',
    'admin.login.username': 'Username',
    'admin.login.password': 'Password',
    'admin.login.signin': 'Sign In',
    'admin.login.demo': 'Demo Access',
    'admin.signout': 'Sign Out',
    'admin.dashboard': 'Dashboard',
    'admin.products': 'Solutions',
    'admin.clients': 'Projects',
    'admin.messages': 'Messages',
    'admin.settings': 'Settings',
  },

  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О компании',
    'nav.solutions': 'Решения',
    'nav.pricing': 'Услуги',
    'nav.projects': 'Проекты',
    'nav.contact': 'Контакты',
    'nav.admin': 'Панель управления',

    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.success': 'Успешно',
    'common.submit': 'Отправить',
    'common.cancel': 'Отмена',
    'common.save': 'Сохранить',
    'common.edit': 'Редактировать',
    'common.delete': 'Удалить',
    'common.view': 'Просмотр',
    'common.download': 'Скачать',
    'common.search': 'Поиск',
    'common.filter': 'Фильтр',
    'common.all': 'Все',
    'common.featured': 'Рекомендуемые',
    'common.more': 'Больше',
    'common.less': 'Меньше',
    'common.readMore': 'Читать далее',
    'common.learnMore': 'Узнать больше',
    'common.getQuote': 'Получить расчет',
    'common.requestQuote': 'Запросить расчет',
    'common.contactUs': 'Связаться с нами',
    'common.callNow': 'Позвонить сейчас',
    'common.emailUs': 'Написать нам',

    // Home Page
    'home.hero.badge': 'Ведущие решения очистки воды и сточных вод',
    'home.hero.title': 'Чистая вода',
    'home.hero.titleHighlight': 'Передовая очистка',
    'home.hero.subtitle': 'Комплексные решения очистки воды и сточных вод от 20 м³/сутки до 1 000 000 м³/сутки. Мы проектируем, строим и реконструируем очистные сооружения для муниципалитетов, промышленности и сообществ.',
    'home.hero.exploreSolutions': 'Изучить решения',
    'home.hero.getConsultation': 'Получить консультацию',

    'home.stats.clients': 'Завершенных проектов',
    'home.stats.years': 'Лет опыта',
    'home.stats.projects': 'Мощность очистки',
    'home.stats.success': 'Эффективность',

    'home.solutions.title': 'Полные решения очистки воды',
    'home.solutions.subtitle': 'От малых поселений до крупных городов, мы предоставляем комплексные системы очистки воды и сточных вод с доказанной эффективностью и надежностью',
    'home.solutions.filtration.title': 'Очистные сооружения сточных вод',
    'home.solutions.filtration.desc': 'Полные системы биологической и физико-химической очистки для муниципальных и промышленных сточных вод',
    'home.solutions.monitoring.title': 'Системы очистки воды',
    'home.solutions.monitoring.desc': 'Передовая очистка питьевой воды с удалением мутности, цветности и загрязнений',
    'home.solutions.standards.title': 'Модульные очистные установки',
    'home.solutions.standards.desc': 'Блочно-модульные системы от 2-19 м³/ч с заводской автоматизацией и дистанционным управлением',
    'home.solutions.sustainable.title': 'Системы BioSteps BS',
    'home.solutions.sustainable.desc': 'Пятиступенчатая биологическая очистка с эффективностью 98-99% для жилых и коммерческих применений',

    'home.clients.title': 'Доверие сообществ и промышленности',
    'home.clients.subtitle': 'Обслуживаем муниципалитеты, промышленность и сообщества по всему Узбекистану и Центральной Азии',

    'home.testimonials.title': 'Истории успеха клиентов',
    'home.testimonials.subtitle': 'Реальные результаты наших внедрений очистки воды',

    'home.cta.title': 'Готовы решить ваши задачи очистки воды?',
    'home.cta.subtitle': 'Сотрудничайте с нами для внедрения проверенных решений очистки воды и сточных вод, которые обеспечивают соответствие требованиям, эффективность и защиту окружающей среды.',
    'home.cta.startProject': 'Начать проект',
    'home.cta.viewSolutions': 'Посмотреть решения',

    // About Page
    'about.hero.badge': 'О нашей компании',
    'about.hero.title': 'Специалисты по',
    'about.hero.titleHighlight': 'очистке воды',
    'about.hero.subtitle': 'Пять лет преданного служения в области очистки воды и сточных вод, реализация более 20 успешных проектов по всему Узбекистану с передовыми технологиями и проверенными результатами',

    'about.journey.title': 'Наш путь',
    'about.mission.title': 'Наша миссия',
    'about.mission.content': 'Предоставлять комплексные решения очистки воды и сточных вод, которые защищают общественное здоровье и окружающую среду. Мы специализируемся на проектировании, строительстве и реконструкции очистных сооружений, отвечающих высочайшим стандартам эффективности и надежности.',
    'about.vision.title': 'Наше видение',
    'about.vision.content': 'Быть ведущей компанией по очистке воды в Центральной Азии, известной инновационными решениями, исключительным сервисом и устойчивыми экологическими практиками. Мы видим доступ к чистой воде для всех сообществ через передовые технологии очистки.',

    'about.values.title': 'Наши основные ценности',
    'about.values.subtitle': 'Принципы, которые направляют наши решения очистки воды и отношения с клиентами',
    'about.values.quality.title': 'Техническое превосходство',
    'about.values.quality.desc': 'Обеспечение эффективности очистки 98-99% с современным оборудованием и проверенными методологиями',
    'about.values.partnership.title': 'Партнерство с клиентами',
    'about.values.partnership.desc': 'Построение долгосрочных отношений через надежный сервис и комплексную поддержку проектов',
    'about.values.innovation.title': 'Лидерство в инновациях',
    'about.values.innovation.desc': 'Внедрение передовых технологий, таких как ультрафильтрационные мембраны и автоматизированные системы управления',
    'about.values.sustainability.title': 'Экологический фокус',
    'about.values.sustainability.desc': 'Защита природных ресурсов через эффективную очистку и устойчивые практики',

    'about.team.title': 'Экспертная команда',
    'about.team.subtitle': 'Опытные профессионалы в области инженерии очистки воды и управления проектами',

    'about.certifications.title': 'Сертификации и стандарты',
    'about.certifications.subtitle': 'Наша приверженность качеству и соответствию в очистке воды',

    // Catalogue Page
    'catalogue.hero.badge': 'Решения очистки воды',
    'catalogue.hero.title': 'Полные системы очистки',
    'catalogue.hero.subtitle': 'Комплексные решения очистки воды и сточных вод от малых жилых систем до крупных муниципальных объектов',

    'catalogue.search.label': 'Поиск решений',
    'catalogue.search.placeholder': 'Поиск систем очистки...',
    'catalogue.categories.label': 'Категории',
    'catalogue.categories.all': 'Все решения',
    'catalogue.download.catalog': 'Скачать каталог',
    'catalogue.catalogues.title': 'Каталоги продукции',
    'catalogue.catalogues.subtitle': 'Скачайте подробные спецификации и информацию о продуктах',
    'catalogue.catalogues.loading': 'Загрузка каталогов...',
    'catalogue.catalogues.download': 'Скачать каталог',
    'catalogue.catalogues.download.pdf': 'Скачать PDF',
    'catalogue.catalogues.pdf': 'Формат PDF',
    'catalogue.catalogues.size': 'МБ',
    'catalogue.solutions.available': 'решение доступно',
    'catalogue.solutions.availablePlural': 'решений доступно',
    'catalogue.product.viewDetails': 'Подробности',
    'catalogue.loading.solutions': 'Загрузка решений...',
    'catalogue.no.products': 'Продукты не найдены',
    'catalogue.no.products.desc': 'Попробуйте изменить критерии поиска или фильтра',

    // Pricing Page (now Services)
    'pricing.hero.badge': 'Наши услуги',
    'pricing.hero.title': 'Услуги очистки воды',
    'pricing.hero.subtitle': 'Комплексные услуги от проектирования и строительства до обслуживания и поддержки для всех ваших потребностей в очистке воды',

    'pricing.tiers.title': 'Выберите ваш пакет услуг',
    'pricing.tiers.subtitle': 'Выберите уровень сервиса, который лучше всего подходит требованиям вашего проекта',
    'pricing.tiers.standard': 'Базовое проектирование',
    'pricing.tiers.professional': 'Полное решение',
    'pricing.tiers.enterprise': 'Полный сервис',
    'pricing.tiers.popular': 'Самый популярный',

    'pricing.systems.title': 'Мощности систем очистки',
    'pricing.systems.subtitle': 'Наши системы обрабатывают все от малых жилых до крупных муниципальных применений',
    'pricing.access.title': 'Индивидуальная консультация по проекту',
    'pricing.access.subtitle': 'Каждый проект очистки воды уникален. Свяжитесь с нашей инженерной командой для подробной консультации и разработки индивидуального решения.',
    'pricing.access.request': 'Запросить консультацию',
    'pricing.access.contact': 'Связаться с инженерной командой',

    'pricing.custom.title': 'Нужно индивидуальное решение?',
    'pricing.custom.subtitle': 'Мы предлагаем полные услуги проектирования и строительства, от первоначальной оценки до окончательного ввода в эксплуатацию. Свяжитесь с нашей технической командой для персонализированной консультации.',
    'pricing.custom.contact': 'Связаться с технической командой',
    'pricing.custom.download': 'Скачать брошюру',

    // Clients Page
    'clients.hero.badge': 'Наше портфолио проектов',
    'clients.hero.title': 'Проверенный послужной список',
    'clients.hero.subtitle': 'Более 20 успешных проектов очистки воды по всему Узбекистану, от малых сельских поселений до крупных промышленных объектов',

    'clients.stats.partners': 'Завершенных проектов',
    'clients.stats.industries': 'Обслуживаемых регионов',
    'clients.stats.countries': 'Очистных сооружений',
    'clients.stats.partnership': 'Лет опыта',

    'clients.industries.title': 'Применения, которые мы обслуживаем',
    'clients.industries.subtitle': 'Специализированные решения очистки для различных применений и отраслей',
    'clients.industries.projects': 'активных проектов',

    'clients.partners.title': 'Наши проекты',
    'clients.partners.subtitle': 'Сообщества и промышленность, которые доверяют нашему опыту в очистке воды',
    'clients.partners.loading': 'Загрузка проектов...',

    'clients.cases.title': 'Истории успеха',
    'clients.cases.subtitle': 'Реальные проекты, приносящие измеримые экологические и операционные преимущества',
    'clients.cases.duration': 'Продолжительность',
    'clients.cases.value': 'Стоимость проекта',

    'clients.cta.title': 'Готовы начать ваш проект очистки воды?',
    'clients.cta.subtitle': 'Испытайте те же надежные результаты и профессиональный сервис, которые сделали нас надежным выбором для решений очистки воды.',
    'clients.cta.start': 'Начать проект',
    'clients.cta.explore': 'Изучить решения',

    // Contact Page
    'contact.hero.badge': 'Связаться с нами',
    'contact.hero.title': 'Свяжитесь с нашими инженерами',
    'contact.hero.subtitle': 'Готовы обсудить ваши потребности в очистке воды? Наша команда инженеров здесь, чтобы предоставить консультации, проектные услуги и техническую поддержку.',

    'contact.info.title': 'Давайте свяжемся',
    'contact.info.headquarters': 'Головной офис',
    'contact.info.phone': 'Телефон',
    'contact.info.email': 'Электронная почта',
    'contact.info.hours': 'Рабочие часы',

    'contact.services.title': 'Наши услуги',
    'contact.form.title': 'Отправьте нам сообщение',
    'contact.form.success': 'Спасибо! Ваше сообщение было успешно отправлено. Мы свяжемся с вами в течение 24 часов.',
    'contact.form.name': 'Полное имя',
    'contact.form.email': 'Адрес электронной почты',
    'contact.form.company': 'Организация',
    'contact.form.phone': 'Номер телефона',
    'contact.form.message': 'Сообщение',
    'contact.form.nameRequired': 'Имя обязательно',
    'contact.form.emailRequired': 'Электронная почта обязательна',
    'contact.form.emailInvalid': 'Неверный адрес электронной почты',
    'contact.form.messageRequired': 'Сообщение обязательно',
    'contact.form.namePlaceholder': 'Введите ваше полное имя',
    'contact.form.emailPlaceholder': 'Введите вашу электронную почту',
    'contact.form.companyPlaceholder': 'Название вашей организации',
    'contact.form.phonePlaceholder': 'Ваш номер телефона',
    'contact.form.messagePlaceholder': 'Расскажите нам о ваших требованиях к очистке воды...',
    'contact.form.sending': 'Отправка сообщения...',
    'contact.form.send': 'Отправить сообщение',

    'contact.urgent.title': 'Нужна техническая поддержка?',
    'contact.urgent.subtitle': 'Наша инженерная команда доступна для срочных вопросов по системам очистки воды и экстренных консультаций.',

    // Footer
    'footer.company.tagline': 'Очистка воды и сточных вод',
    'footer.company.description': 'Специализированный поставщик комплексных решений очистки воды и сточных вод, от проектирования и строительства до обслуживания и поддержки для муниципальных и промышленных применений.',
    'footer.solutions.title': 'Решения',
    'footer.company.title': 'Компания',
    'footer.contact.title': 'Контакты',
    'footer.rights': 'Все права защищены.',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия обслуживания',
    'footer.cookies': 'Политика файлов cookie',

    // Admin
    'admin.title': 'Панель управления',
    'admin.subtitle': 'Система управления очисткой воды',
    'admin.login.title': 'Панель управления',
    'admin.login.username': 'Имя пользователя',
    'admin.login.password': 'Пароль',
    'admin.login.signin': 'Войти',
    'admin.login.demo': 'Демо доступ',
    'admin.signout': 'Выйти',
    'admin.dashboard': 'Панель управления',
    'admin.products': 'Решения',
    'admin.clients': 'Проекты',
    'admin.messages': 'Сообщения',
    'admin.settings': 'Настройки',
  },

  uz: {
    // Navigation
    'nav.home': 'Bosh sahifa',
    'nav.about': 'Kompaniya haqida',
    'nav.solutions': 'Yechimlar',
    'nav.pricing': 'Xizmatlar',
    'nav.projects': 'Loyihalar',
    'nav.contact': 'Aloqa',
    'nav.admin': 'Boshqaruv paneli',

    // Common
    'common.loading': 'Yuklanmoqda...',
    'common.error': 'Xato',
    'common.success': 'Muvaffaqiyat',
    'common.submit': 'Yuborish',
    'common.cancel': 'Bekor qilish',
    'common.save': 'Saqlash',
    'common.edit': 'Tahrirlash',
    'common.delete': 'O\'chirish',
    'common.view': 'Ko\'rish',
    'common.download': 'Yuklab olish',
    'common.search': 'Qidirish',
    'common.filter': 'Filtr',
    'common.all': 'Barchasi',
    'common.featured': 'Tavsiya etilgan',
    'common.more': 'Ko\'proq',
    'common.less': 'Kamroq',
    'common.readMore': 'Batafsil o\'qish',
    'common.learnMore': 'Ko\'proq bilish',
    'common.getQuote': 'Hisob olish',
    'common.requestQuote': 'Hisob so\'rash',
    'common.contactUs': 'Biz bilan bog\'laning',
    'common.callNow': 'Hozir qo\'ng\'iroq qiling',
    'common.emailUs': 'Bizga yozing',

    // Home Page
    'home.hero.badge': 'Etakchi suv va oqova suvlarini tozalash yechimlari',
    'home.hero.title': 'Toza suv',
    'home.hero.titleHighlight': 'Ilg\'or tozalash',
    'home.hero.subtitle': 'Kuniga 20 m³ dan 1 000 000 m³ gacha bo\'lgan keng qamrovli suv va oqova suvlarini tozalash yechimlari. Biz munitsipalitetlar, sanoat va jamiyatlar uchun tozalash inshootlarini loyihalash, qurish va rekonstruksiya qilamiz.',
    'home.hero.exploreSolutions': 'Yechimlarni o\'rganish',
    'home.hero.getConsultation': 'Maslahat olish',

    'home.stats.clients': 'Yakunlangan loyihalar',
    'home.stats.years': 'Yillik tajriba',
    'home.stats.projects': 'Tozalash quvvati',
    'home.stats.success': 'Samaradorlik darajasi',

    'home.solutions.title': 'To\'liq suv tozalash yechimlari',
    'home.solutions.subtitle': 'Kichik aholi punktlaridan katta shaharlargacha, biz isbotlangan samaradorlik va ishonchlilik bilan keng qamrovli suv va oqova suvlarini tozalash tizimlarini taqdim etamiz',
    'home.solutions.filtration.title': 'Oqova suvlarini tozalash inshootlari',
    'home.solutions.filtration.desc': 'Munitsipal va sanoat oqova suvlari uchun to\'liq biologik va fizik-kimyoviy tozalash tizimlari',
    'home.solutions.monitoring.title': 'Suv tozalash tizimlari',
    'home.solutions.monitoring.desc': 'Loyqalik, rang va ifloslanishlarni olib tashlash imkoniyatlari bilan ilg\'or ichimlik suvi tozalash',
    'home.solutions.standards.title': 'Modul tozalash qurilmalari',
    'home.solutions.standards.desc': 'Zavod avtomatlashtirish va masofaviy boshqaruv bilan 2-19 m³/soat blok-modul tizimlari',
    'home.solutions.sustainable.title': 'BioSteps BS tizimlari',
    'home.solutions.sustainable.desc': 'Turar joy va tijorat ilovalar uchun 98-99% samaradorlikka erishadigan besh bosqichli biologik tozalash',

    'home.clients.title': 'Jamiyatlar va sanoatning ishonchi',
    'home.clients.subtitle': 'O\'zbekiston va Markaziy Osiyo bo\'ylab munitsipalitetlar, sanoat va jamiyatlarga xizmat ko\'rsatish',

    'home.testimonials.title': 'Mijoz muvaffaqiyat hikoyalari',
    'home.testimonials.subtitle': 'Bizning suv tozalash joriy etishlarimizdan haqiqiy natijalar',

    'home.cta.title': 'Suv tozalash muammolaringizni hal qilishga tayyormisiz?',
    'home.cta.subtitle': 'Talablarga muvofiqlik, samaradorlik va atrof-muhit muhofazasini ta\'minlaydigan isbotlangan suv va oqova suvlarini tozalash yechimlarini joriy etish uchun biz bilan hamkorlik qiling.',
    'home.cta.startProject': 'Loyihani boshlash',
    'home.cta.viewSolutions': 'Yechimlarni ko\'rish',

    // About Page
    'about.hero.badge': 'Bizning kompaniyamiz haqida',
    'about.hero.title': 'Suv tozalash',
    'about.hero.titleHighlight': 'mutaxassislari',
    'about.hero.subtitle': 'Suv va oqova suvlarini tozalash sohasida besh yillik fidokorlik bilan xizmat, ilg\'or texnologiyalar va isbotlangan natijalar bilan O\'zbekiston bo\'ylab 20 dan ortiq muvaffaqiyatli loyihalarni amalga oshirish',

    'about.journey.title': 'Bizning yo\'limiz',
    'about.mission.title': 'Bizning missiyamiz',
    'about.mission.content': 'Jamoat salomatligi va atrof-muhitni himoya qiladigan keng qamrovli suv va oqova suvlarini tozalash yechimlarini taqdim etish. Biz samaradorlik va ishonchlilik bo\'yicha eng yuqori standartlarga javob beradigan tozalash inshootlarini loyihalash, qurish va rekonstruksiya qilishda ixtisoslashganmiz.',
    'about.vision.title': 'Bizning ko\'z o\'ngimiz',
    'about.vision.content': 'Innovatsion yechimlar, ajoyib xizmat va barqaror ekologik amaliyotlar bilan tanilgan Markaziy Osiyodagi etakchi suv tozalash kompaniyasi bo\'lish. Biz ilg\'or tozalash texnologiyalari orqali barcha jamiyatlar uchun toza suv mavjudligini ko\'ramiz.',

    'about.values.title': 'Bizning asosiy qadriyatlarimiz',
    'about.values.subtitle': 'Bizning suv tozalash yechimlarimiz va mijoz munosabatlarimizni yo\'naltiradigan tamoyillar',
    'about.values.quality.title': 'Texnik mukammallik',
    'about.values.quality.desc': 'Zamonaviy uskunalar va isbotlangan metodologiyalar bilan 98-99% tozalash samaradorligini ta\'minlash',
    'about.values.partnership.title': 'Mijoz hamkorligi',
    'about.values.partnership.desc': 'Ishonchli xizmat va keng qamrovli loyiha yordami orqali uzoq muddatli munosabatlar qurish',
    'about.values.innovation.title': 'Innovatsiya yetakchiligi',
    'about.values.innovation.desc': 'Ultrafiltrlash membranalari va avtomatlashtirilgan boshqaruv tizimlari kabi ilg\'or texnologiyalarni joriy etish',
    'about.values.sustainability.title': 'Ekologik diqqat',
    'about.values.sustainability.desc': 'Samarali tozalash va barqaror amaliyotlar orqali tabiiy resurslarni himoya qilish',

    'about.team.title': 'Mutaxassis jamoa',
    'about.team.subtitle': 'Suv tozalash muhandisligi va loyiha boshqaruvida tajribali mutaxassislar',

    'about.certifications.title': 'Sertifikatlar va standartlar',
    'about.certifications.subtitle': 'Suv tozalashda sifat va muvofiqlikga bo\'lgan majburiyatimiz',

    // Catalogue Page
    'catalogue.hero.badge': 'Suv tozalash yechimlari',
    'catalogue.hero.title': 'To\'liq tozalash tizimlari',
    'catalogue.hero.subtitle': 'Kichik turar joy tizimlaridan katta munitsipal ob\'ektlargacha keng qamrovli suv va oqova suvlarini tozalash yechimlari',

    'catalogue.search.label': 'Yechimlarni qidirish',
    'catalogue.search.placeholder': 'Tozalash tizimlarini qidirish...',
    'catalogue.categories.label': 'Kategoriyalar',
    'catalogue.categories.all': 'Barcha yechimlar',
    'catalogue.download.catalog': 'Katalogni yuklab olish',
    'catalogue.catalogues.title': 'Mahsulot kataloglari',
    'catalogue.catalogues.subtitle': 'Batafsil spetsifikatsiyalar va mahsulot ma\'lumotlarini yuklab oling',
    'catalogue.catalogues.loading': 'Kataloglar yuklanmoqda...',
    'catalogue.catalogues.download': 'Katalogni yuklab olish',
    'catalogue.catalogues.download.pdf': 'PDF yuklab olish',
    'catalogue.catalogues.pdf': 'PDF format',
    'catalogue.catalogues.size': 'MB',
    'catalogue.solutions.available': 'yechim mavjud',
    'catalogue.solutions.availablePlural': 'yechimlar mavjud',
    'catalogue.product.viewDetails': 'Tafsilotlar',
    'catalogue.loading.solutions': 'Yechimlar yuklanmoqda...',
    'catalogue.no.products': 'Mahsulotlar topilmadi',
    'catalogue.no.products.desc': 'Qidiruv yoki filtr mezonlarini o\'zgartirishga harakat qiling',

    // Pricing Page (now Services)
    'pricing.hero.badge': 'Bizning xizmatlarimiz',
    'pricing.hero.title': 'Suv tozalash xizmatlari',
    'pricing.hero.subtitle': 'Barcha suv tozalash ehtiyojlaringiz uchun loyihalash va qurishdan tortib texnik xizmat va qo\'llab-quvvatlashgacha keng qamrovli xizmatlar',

    'pricing.tiers.title': 'Xizmat paketingizni tanlang',
    'pricing.tiers.subtitle': 'Loyiha talablaringizga eng mos keladigan xizmat darajasini tanlang',
    'pricing.tiers.standard': 'Asosiy loyihalash',
    'pricing.tiers.professional': 'To\'liq yechim',
    'pricing.tiers.enterprise': 'To\'liq xizmat',
    'pricing.tiers.popular': 'Eng mashhur',

    'pricing.systems.title': 'Tozalash tizimi quvvatlari',
    'pricing.systems.subtitle': 'Bizning tizimlarimiz kichik turar joylardan katta munitsipal ilovalarigacha hamma narsani boshqaradi',
    'pricing.access.title': 'Maxsus loyiha maslahati',
    'pricing.access.subtitle': 'Har bir suv tozalash loyihasi noyobdir. Batafsil maslahat va maxsus yechim loyihalash uchun muhandislik jamoamiz bilan bog\'laning.',
    'pricing.access.request': 'Maslahat so\'rash',
    'pricing.access.contact': 'Muhandislik jamoasi bilan bog\'lanish',

    'pricing.custom.title': 'Maxsus yechim kerakmi?',
    'pricing.custom.subtitle': 'Biz dastlabki baholashdan yakuniy ishga tushirishgacha to\'liq loyihalash-qurish xizmatlarini taklif qilamiz. Shaxsiylashtirilgan maslahat uchun texnik jamoamiz bilan bog\'laning.',
    'pricing.custom.contact': 'Texnik jamoa bilan bog\'lanish',
    'pricing.custom.download': 'Broshyurani yuklab olish',

    // Clients Page
    'clients.hero.badge': 'Bizning loyiha portfelimiz',
    'clients.hero.title': 'Isbotlangan natijalar',
    'clients.hero.subtitle': 'O\'zbekiston bo\'ylab 20 dan ortiq muvaffaqiyatli suv tozalash loyihalari, kichik qishloq aholi punktlaridan katta sanoat ob\'ektlarigacha',

    'clients.stats.partners': 'Yakunlangan loyihalar',
    'clients.stats.industries': 'Xizmat ko\'rsatilgan hududlar',
    'clients.stats.countries': 'Tozalash zavodlari',
    'clients.stats.partnership': 'Yillik tajriba',

    'clients.industries.title': 'Biz xizmat ko\'rsatadigan ilovalar',
    'clients.industries.subtitle': 'Turli ilovalar va sohalar bo\'ylab ixtisoslashgan tozalash yechimlari',
    'clients.industries.projects': 'faol loyihalar',

    'clients.partners.title': 'Bizning loyihalarimiz',
    'clients.partners.subtitle': 'Bizning suv tozalash tajribamizga ishongan jamiyatlar va sanoat',
    'clients.partners.loading': 'Loyihalar yuklanmoqda...',

    'clients.cases.title': 'Muvaffaqiyat hikoyalari',
    'clients.cases.subtitle': 'O\'lchanadigan ekologik va operatsion foyda keltiradigan haqiqiy loyihalar',
    'clients.cases.duration': 'Davomiyligi',
    'clients.cases.value': 'Loyiha qiymati',

    'clients.cta.title': 'Suv tozalash loyihangizni boshlashga tayyormisiz?',
    'clients.cta.subtitle': 'Bizni suv tozalash yechimlari uchun ishonchli tanlov qilgan xuddi shunday ishonchli natijalar va professional xizmatni boshdan kechiring.',
    'clients.cta.start': 'Loyihani boshlash',
    'clients.cta.explore': 'Yechimlarni o\'rganish',

    // Contact Page
    'contact.hero.badge': 'Bog\'laning',
    'contact.hero.title': 'Muhandislarimiz bilan bog\'laning',
    'contact.hero.subtitle': 'Suv tozalash ehtiyojlaringizni muhokama qilishga tayyormisiz? Bizning muhandislar jamoamiz maslahat, loyihalash xizmatlari va texnik yordam berish uchun shu yerda.',

    'contact.info.title': 'Keling bog\'lanaylik',
    'contact.info.headquarters': 'Bosh ofis',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'Elektron pochta',
    'contact.info.hours': 'Ish vaqti',

    'contact.services.title': 'Bizning xizmatlarimiz',
    'contact.form.title': 'Bizga xabar yuboring',
    'contact.form.success': 'Rahmat! Sizning xabaringiz muvaffaqiyatli yuborildi. Biz 24 soat ichida siz bilan bog\'lanamiz.',
    'contact.form.name': 'To\'liq ism',
    'contact.form.email': 'Elektron pochta manzili',
    'contact.form.company': 'Tashkilot',
    'contact.form.phone': 'Telefon raqami',
    'contact.form.message': 'Xabar',
    'contact.form.nameRequired': 'Ism majburiy',
    'contact.form.emailRequired': 'Elektron pochta majburiy',
    'contact.form.emailInvalid': 'Noto\'g\'ri elektron pochta manzili',
    'contact.form.messageRequired': 'Xabar majburiy',
    'contact.form.namePlaceholder': 'To\'liq ismingizni kiriting',
    'contact.form.emailPlaceholder': 'Elektron pochtangizni kiriting',
    'contact.form.companyPlaceholder': 'Tashkilot nomingiz',
    'contact.form.phonePlaceholder': 'Telefon raqamingiz',
    'contact.form.messagePlaceholder': 'Suv tozalash talablaringiz haqida bizga ayting...',
    'contact.form.sending': 'Xabar yuborilmoqda...',
    'contact.form.send': 'Xabar yuborish',

    'contact.urgent.title': 'Texnik yordam kerakmi?',
    'contact.urgent.subtitle': 'Bizning muhandislik jamoamiz shoshilinch suv tozalash tizimi masalalari va favqulodda maslahatlar uchun mavjud.',

    // Footer
    'footer.company.tagline': 'Suv va oqova suvlarini tozalash',
    'footer.company.description': 'Munitsipal va sanoat ilovalar uchun loyihalash va qurishdan tortib texnik xizmat va qo\'llab-quvvatlashgacha keng qamrovli suv va oqova suvlarini tozalash yechimlarining ixtisoslashgan ta\'minotchisi.',
    'footer.solutions.title': 'Yechimlar',
    'footer.company.title': 'Kompaniya',
    'footer.contact.title': 'Aloqa',
    'footer.rights': 'Barcha huquqlar himoyalangan.',
    'footer.privacy': 'Maxfiylik siyosati',
    'footer.terms': 'Xizmat shartlari',
    'footer.cookies': 'Cookie siyosati',

    // Admin
    'admin.title': 'Boshqaruv paneli',
    'admin.subtitle': 'Suv tozalash boshqaruv tizimi',
    'admin.login.title': 'Boshqaruv paneli',
    'admin.login.username': 'Foydalanuvchi nomi',
    'admin.login.password': 'Parol',
    'admin.login.signin': 'Kirish',
    'admin.login.demo': 'Demo kirish',
    'admin.signout': 'Chiqish',
    'admin.dashboard': 'Boshqaruv paneli',
    'admin.products': 'Yechimlar',
    'admin.clients': 'Loyihalar',
    'admin.messages': 'Xabarlar',
    'admin.settings': 'Sozlamalar',
  }
};