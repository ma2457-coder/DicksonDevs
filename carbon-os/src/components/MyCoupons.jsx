import { useState } from 'react';
import { Ticket, Calendar, MapPin, Check, X, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getDaysUntilExpiration, isCouponExpired } from '../utils/rewardsCalculator';

const MyCoupons = ({ coupons, onMarkAsUsed }) => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const activeCoupons = coupons.filter(c => !c.used && !isCouponExpired(c));
  const usedCoupons = coupons.filter(c => c.used);
  const expiredCoupons = coupons.filter(c => isCouponExpired(c) && !c.used);

  const handleViewQR = (coupon) => {
    setSelectedCoupon(coupon);
    setShowQRModal(true);
  };

  const handleMarkAsUsed = () => {
    onMarkAsUsed(selectedCoupon.id);
    setShowQRModal(false);
    setSelectedCoupon(null);
  };

  const CouponCard = ({ coupon, isExpired = false, isUsed = false }) => {
    const daysLeft = getDaysUntilExpiration(coupon);
    const isExpiringSoon = daysLeft <= 7 && daysLeft > 0;

    return (
      <div
        className={`bg-white rounded-xl shadow-md p-5 transition-all ${
          isExpired || isUsed ? 'opacity-60' : 'hover:shadow-lg'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{coupon.businessLogo}</div>
            <div>
              <h3 className="font-bold text-gray-800">{coupon.businessName}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin size={14} />
                <span>{coupon.businessLocation}</span>
              </div>
            </div>
          </div>
          {isUsed && (
            <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              Used
            </div>
          )}
          {isExpired && (
            <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
              Expired
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-3">
          <p className="text-lg font-bold text-green-700 mb-1">{coupon.discount}</p>
          <p className="text-xs text-gray-600">Coupon Code:</p>
          <p className="font-mono font-semibold text-gray-800 text-sm">{coupon.code}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {isExpired ? (
              <span className="text-red-600">Expired</span>
            ) : (
              <span className={isExpiringSoon ? 'text-orange-600 font-medium' : ''}>
                {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
              </span>
            )}
          </div>
          <div>
            <span className="text-xs text-gray-500">Redeemed: </span>
            <span>{new Date(coupon.redeemedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {!isExpired && !isUsed && (
          <button
            onClick={() => handleViewQR(coupon)}
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <QrCode size={18} />
            Show QR Code
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Ticket size={32} />
          <h2 className="text-2xl font-bold">My Coupons</h2>
        </div>
        <p className="text-purple-100">Your redeemed rewards and discount coupons</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{activeCoupons.length}</p>
          <p className="text-sm text-gray-600">Active</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-gray-600">{usedCoupons.length}</p>
          <p className="text-sm text-gray-600">Used</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{expiredCoupons.length}</p>
          <p className="text-sm text-gray-600">Expired</p>
        </div>
      </div>

      {/* Active Coupons */}
      {activeCoupons.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Active Coupons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </div>
      )}

      {/* Used Coupons */}
      {usedCoupons.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Used Coupons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {usedCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} isUsed />
            ))}
          </div>
        </div>
      )}

      {/* Expired Coupons */}
      {expiredCoupons.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Expired Coupons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expiredCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} isExpired />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {coupons.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🎟️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Coupons Yet</h3>
          <p className="text-gray-600 mb-4">Visit the Rewards Marketplace to redeem your first coupon!</p>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Coupon Details</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Business Info */}
              <div className="text-center">
                <div className="text-4xl mb-2">{selectedCoupon.businessLogo}</div>
                <h4 className="font-bold text-lg text-gray-800">{selectedCoupon.businessName}</h4>
                <p className="text-sm text-gray-600">{selectedCoupon.businessLocation}</p>
              </div>

              {/* Discount */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-700">{selectedCoupon.discount}</p>
              </div>

              {/* QR Code */}
              <div className="bg-white border-4 border-gray-200 rounded-lg p-6 flex justify-center">
                <QRCodeSVG value={selectedCoupon.code} size={200} />
              </div>

              {/* Coupon Code */}
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-600 mb-1">Coupon Code</p>
                <p className="font-mono font-bold text-lg text-gray-800">{selectedCoupon.code}</p>
              </div>

              {/* Expiration */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-700">
                  Expires in <span className="font-bold">{getDaysUntilExpiration(selectedCoupon)} days</span>
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-gray-700">
                  📱 Show this QR code at checkout or provide the coupon code to redeem your discount.
                </p>
              </div>

              {/* Mark as Used Button */}
              <button
                onClick={handleMarkAsUsed}
                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <Check size={20} />
                Mark as Used
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCoupons;
