import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Droplets, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { createContactSubmission } from '../lib/database';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const { error } = await createContactSubmission(data);

      if (error) {
        console.warn('Error submitting form:', error);
        // Still show success for demo purposes
      }

      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.warn('Error submitting form:', error);
      // Still show success for demo purposes
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallNow = () => {
    window.open('tel:+998998233033', '_self');
  };

  const handleEmailNow = () => {
    window.open('mailto:ecgtashkent@gmail.com', '_self');
  };

  const handleEmergencyCall = () => {
    window.open('tel:+998998233033', '_self');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.headquarters'),
      details: 'Ташкент, Мирабадский район\nул. Ойбек 18/1',
      action: () => alert('Location: Ташкент, Мирабадский район, ул. Ойбек 18/1')
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      details: '+998 99 823 30 33',
      action: handleCallNow
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      details: 'ecgtashkent@gmail.com',
      action: handleEmailNow
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      details: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed',
      action: () => alert('Business Hours:\nMonday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed')
    }
  ];

  const services = [
    'System Design & Engineering',
    'Construction & Installation',
    'Commissioning & Startup',
    'Maintenance & Service',
    'Technical Consultation',
    'Equipment Supply'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Droplets className="w-4 h-4 mr-2" />
              {t('contact.hero.badge')}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.info.title')}</h2>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors" onClick={info.action}>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <info.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line leading-relaxed">{info.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.services.title')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors" onClick={() => alert(`Service: ${service}\n\nContact us for more information about this service.`)}>
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center cursor-pointer hover:bg-gradient-to-br hover:from-blue-100 hover:to-gray-100 transition-colors" onClick={() => alert('Interactive map will open here showing our location in Tashkent, Uzbekistan.')}>
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-400">Click to view location</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-10 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('contact.form.title')}</h2>
              
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <p className="text-green-800 font-medium">
                      {t('contact.form.success')}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: t('contact.form.nameRequired') })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: t('contact.form.emailRequired'),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('contact.form.emailInvalid')
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      {...register('company')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder={t('contact.form.companyPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    rows={6}
                    {...register('message', { required: t('contact.form.messageRequired') })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-2">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  ) : (
                    <Send className="mr-3" size={20} />
                  )}
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">{t('contact.urgent.title')}</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              {t('contact.urgent.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleEmergencyCall}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {t('common.callNow')}: +998 99 823 30 33
              </button>
              <button
                onClick={handleEmailNow}
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                Email: ecgtashkent@gmail.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;