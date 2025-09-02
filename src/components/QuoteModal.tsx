import React, { useState } from 'react';
import { X, Send, Calculator, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { createQuoteRequest } from '../lib/database';
import { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface QuoteModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface QuoteForm {
  client_name: string;
  client_email: string;
  client_company?: string;
  client_phone?: string;
  quantity: number;
  capacity_required?: number;
  installation_location?: string;
  project_timeline?: string;
  budget_range?: string;
  water_source?: string;
  effluent_quality_requirements?: string;
  site_conditions?: string;
  message?: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ product, isOpen, onClose }) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteForm>({
    defaultValues: {
      quantity: 1
    }
  });

  const onSubmit = async (data: QuoteForm) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const quoteData = {
        product_id: product.id,
        product_name: product.name,
        ...data
      };

      const { error } = await createQuoteRequest(quoteData);

      if (error) {
        console.warn('Error submitting quote request:', error);
        setSubmitError('Failed to submit quote request. Please try again.');
        return;
      }

      setSubmitSuccess(true);
      reset();
      
      // Auto close after success
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSubmitSuccess(false);
      setSubmitError(null);
      reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calculator className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">{t('common.requestQuote')}</h3>
            </div>
            <button 
              onClick={handleClose} 
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Product Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <img
                src={product.image_url || 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=200'}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                {product.price && (
                  <div className="text-xl font-bold text-blue-600">
                    ${product.price.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <h4 className="text-lg font-semibold text-green-800 mb-1">Quote Request Sent!</h4>
                  <p className="text-green-700">We'll get back to you within 24 hours with a detailed quote.</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <p className="text-red-800 font-medium">{submitError}</p>
            </div>
          )}

          {/* Form */}
          {!submitSuccess && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    {...register('client_name', { 
                      required: t('contact.form.nameRequired'),
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder={t('contact.form.namePlaceholder')}
                    disabled={isSubmitting}
                  />
                  {errors.client_name && (
                    <p className="text-red-600 text-sm mt-2">{errors.client_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    {...register('client_email', { 
                      required: t('contact.form.emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('contact.form.emailInvalid')
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder={t('contact.form.emailPlaceholder')}
                    disabled={isSubmitting}
                  />
                  {errors.client_email && (
                    <p className="text-red-600 text-sm mt-2">{errors.client_email.message}</p>
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
                    {...register('client_company')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder={t('contact.form.companyPlaceholder')}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    {...register('client_phone')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder={t('contact.form.phonePlaceholder')}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  {...register('quantity', { 
                    required: 'Quantity is required', 
                    min: { value: 1, message: 'Quantity must be at least 1' },
                    max: { value: 1000, message: 'Quantity cannot exceed 1000' },
                    valueAsNumber: true
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter quantity needed"
                  disabled={isSubmitting}
                />
                {errors.quantity && (
                  <p className="text-red-600 text-sm mt-2">{errors.quantity.message}</p>
                )}
              </div>

              {/* Solution-specific fields */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 space-y-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Project Specifications</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Required Capacity (m³/day)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="50000"
                      {...register('capacity_required', {
                        valueAsNumber: true,
                        min: { value: 10, message: 'Capacity must be at least 10 m³/day' },
                        max: { value: 50000, message: 'Capacity cannot exceed 50,000 m³/day' }
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="e.g. 500"
                      disabled={isSubmitting}
                    />
                    {errors.capacity_required && (
                      <p className="text-red-600 text-sm mt-2">{errors.capacity_required.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Installation Location
                    </label>
                    <input
                      type="text"
                      {...register('installation_location')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="City, Region"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Project Timeline
                    </label>
                    <select
                      {...register('project_timeline')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      disabled={isSubmitting}
                    >
                      <option value="">Select timeline</option>
                      <option value="urgent">Urgent (1-3 months)</option>
                      <option value="normal">Normal (3-6 months)</option>
                      <option value="flexible">Flexible (6+ months)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Budget Range (USD)
                    </label>
                    <select
                      {...register('budget_range')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      disabled={isSubmitting}
                    >
                      <option value="">Select budget range</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-250k">$100,000 - $250,000</option>
                      <option value="250k-500k">$250,000 - $500,000</option>
                      <option value="500k-1m">$500,000 - $1,000,000</option>
                      <option value="1m+">$1,000,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Water Source Type
                  </label>
                  <select
                    {...register('water_source')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    disabled={isSubmitting}
                  >
                    <option value="">Select water source</option>
                    <option value="municipal">Municipal Wastewater</option>
                    <option value="industrial">Industrial Wastewater</option>
                    <option value="agricultural">Agricultural Runoff</option>
                    <option value="groundwater">Groundwater Treatment</option>
                    <option value="surface">Surface Water Treatment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Effluent Quality Requirements
                  </label>
                  <textarea
                    rows={2}
                    {...register('effluent_quality_requirements')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="e.g. BOD <10mg/L, COD <50mg/L, TSS <10mg/L"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Site Conditions
                  </label>
                  <textarea
                    rows={2}
                    {...register('site_conditions')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Available space, soil conditions, accessibility, utilities"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Additional Requirements
                </label>
                <textarea
                  rows={4}
                  {...register('message')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  placeholder="Please describe any specific requirements, installation details, or questions..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('common.requestQuote')}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;