import { useState } from 'react';
import { Store, MapPin, Sparkles, X, Check, Tag } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { SAMPLE_BUSINESSES, createRedeemedCoupon, filterBusinessesByCategory, getCategories } from '../utils/rewardsCalculator';

const RewardsMarketplace = ({ availablePoints, onRedeemCoupon }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [redeemedCoupon, setRedeemedCoupon] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const categories = getCategories(SAMPLE_BUSINESSES);
  const filteredBusinesses = filterBusinessesByCategory(SAMPLE_BUSINESSES, selectedCategory);

  const handleRedeemClick = (business, coupon) => {
    if (availablePoints >= coupon.points) {
      setSelectedBusiness(business);
      setSelectedCoupon(coupon);
      setShowRedemptionModal(true);
    }
  };

  const confirmRedemption = () => {
    const coupon = createRedeemedCoupon(selectedBusiness, selectedCoupon, availablePoints);
    setRedeemedCoupon(coupon);
    setShowSuccessAnimation(true);

    // Call parent callback to update points
    onRedeemCoupon(selectedCoupon.points, coupon);

    setTimeout(() => {
      setShowSuccessAnimation(false);
      setShowRedemptionModal(false);
      setSelectedBusiness(null);
      setSelectedCoupon(null);
    }, 3000);
  };

  const categoryIcons = {
    all: '🏪',
    fashion: '👕',
    food: '🍽️',
    transport: '🚴',
    household: '🏠',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Rewards Marketplace</h2>
            <p className="text-green-100">Redeem your points for exclusive discounts from sustainable local businesses</p>
          </div>
          <div className="text-right">
            <p className="text-green-100 text-sm">Available Points</p>
            <p className="text-4xl font-bold">{availablePoints}</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedCategory === category
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{categoryIcons[category] || '🏪'}</span>
            <span className="capitalize">{category}</span>
          </button>
        ))}
      </div>

      {/* Business Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((business) => (
          <div key={business.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6">
            {/* Business Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="text-4xl">{business.logo}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{business.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin size={14} />
                  <span>{business.location}</span>
                </div>
              </div>
              {business.sustainable && (
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  Certified
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3">{business.description}</p>

            {/* Sustainability Practices */}
            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-green-700 text-xs font-medium mb-1">
                <Sparkles size={14} />
                Sustainability Practices
              </div>
              <p className="text-xs text-gray-600">{business.sustainabilityPractices}</p>
            </div>

            {/* Coupons */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Available Rewards</p>
              {business.coupons.map((coupon, idx) => {
                const canAfford = availablePoints >= coupon.points;
                return (
                  <button
                    key={idx}
                    onClick={() => handleRedeemClick(business, coupon)}
                    disabled={!canAfford}
                    className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      canAfford
                        ? 'border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-300 cursor-pointer'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-semibold text-gray-800 text-sm">{coupon.discount}</div>
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <Tag size={12} />
                        {coupon.points} points
                      </div>
                    </div>
                    {canAfford && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-medium">
                        Redeem
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Redemption Modal */}
      {showRedemptionModal && !showSuccessAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Confirm Redemption</h3>
              <button
                onClick={() => setShowRedemptionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{selectedBusiness.logo}</div>
                  <div>
                    <p className="font-semibold text-gray-800">{selectedBusiness.name}</p>
                    <p className="text-sm text-gray-600">{selectedBusiness.location}</p>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <p className="text-lg font-bold text-green-600">{selectedCoupon.discount}</p>
                  <p className="text-sm text-gray-600">Valid for 30 days after redemption</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Cost:</span> {selectedCoupon.points} points
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-semibold">After redemption:</span> {availablePoints - selectedCoupon.points} points remaining
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRedemptionModal(false)}
                  className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRedemption}
                  className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium"
                >
                  Confirm Redemption
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation Modal */}
      {showSuccessAnimation && redeemedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="mb-4 animate-bounce">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                <Check size={48} className="text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Coupon Redeemed!</h3>
            <p className="text-gray-600 mb-4">Your coupon has been added to "My Coupons"</p>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Coupon Code</p>
              <p className="text-xl font-mono font-bold text-gray-800">{redeemedCoupon.code}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-700">Check "My Coupons" to view and use this coupon!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsMarketplace;
