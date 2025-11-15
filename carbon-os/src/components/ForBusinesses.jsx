import { Store, Users, TrendingUp, Award, Mail, Building } from 'lucide-react';
import { useState } from 'react';

const ForBusinesses = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    businessType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    console.log('Business signup:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ businessName: '', email: '', businessType: '', message: '' });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Partner with CarbonOS</h1>
          <p className="text-lg text-blue-100 mb-6">
            Join our network of sustainable businesses and connect with eco-conscious customers who share your values.
          </p>
          <div className="flex gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 flex-1">
              <p className="text-2xl font-bold">10,000+</p>
              <p className="text-sm text-blue-100">Active Users</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 flex-1">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-blue-100">Coupons Redeemed</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 flex-1">
              <p className="text-2xl font-bold">95%</p>
              <p className="text-sm text-blue-100">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Partner with Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-green-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Reach Eco-Conscious Customers</h3>
            <p className="text-gray-600">
              Connect with thousands of environmentally-aware consumers actively looking for sustainable businesses like yours.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Increase Foot Traffic</h3>
            <p className="text-gray-600">
              Our rewards system drives motivated customers to your business, increasing both new and repeat visits.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Build Brand Reputation</h3>
            <p className="text-gray-600">
              Showcase your sustainability credentials and differentiate your business as a leader in environmental responsibility.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Store className="text-orange-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Free Marketing Exposure</h3>
            <p className="text-gray-600">
              Get featured in our marketplace with your business profile, logo, and sustainability story at no cost.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Sign Up</h3>
              <p className="text-gray-600">Complete our simple partner form below and tell us about your sustainable business.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Get Verified</h3>
              <p className="text-gray-600">Our team reviews your sustainability practices and verifies your business credentials.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Create Offers</h3>
              <p className="text-gray-600">Set up your coupon tiers and discounts for different point levels.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Go Live</h3>
              <p className="text-gray-600">Your business appears in our marketplace and customers can start redeeming your offers!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Form */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Become a Partner</h2>
        <p className="text-gray-600 mb-6">Fill out the form below and we'll get in touch with you soon!</p>

        {submitted ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600">We've received your application and will be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Your Business Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="business@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <select
                required
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="">Select a category</option>
                <option value="fashion">Fashion & Clothing</option>
                <option value="food">Food & Beverage</option>
                <option value="transport">Transportation & Bike Shops</option>
                <option value="household">Household & Personal Care</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us about your sustainability practices
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Describe your eco-friendly initiatives, certifications, or sustainable practices..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForBusinesses;
