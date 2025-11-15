import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { calculateActivityEmissions } from '../utils/carbonCalculator';

const ActivityLogger = ({ isOpen, onClose, onAddActivity }) => {
  const [category, setCategory] = useState('transportation');
  const [formData, setFormData] = useState({
    type: '',
    distance: '',
    hours: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const activity = {
      category,
      type: formData.type,
      distance: parseFloat(formData.distance) || 0,
      hours: parseFloat(formData.hours) || 0,
    };

    const emissions = calculateActivityEmissions(activity);

    onAddActivity({
      ...activity,
      emissions,
    });

    // Reset form
    setFormData({ type: '', distance: '', hours: '' });
    onClose();
  };

  const canSubmit = () => {
    if (!formData.type) return false;
    if (category === 'transportation' && !formData.distance) return false;
    if (category === 'energy' && !formData.hours) return false;
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Log Activity</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['transportation', 'shopping', 'energy'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setFormData({ type: '', distance: '', hours: '' });
                  }}
                  className={`p-3 rounded-lg border-2 capitalize transition-all ${
                    category === cat
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              required
            >
              <option value="">Select type</option>
              {category === 'transportation' && (
                <>
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="plane">Plane</option>
                  <option value="bike">Bike</option>
                  <option value="walk">Walk</option>
                </>
              )}
              {category === 'shopping' && (
                <>
                  <option value="online">Online Purchase</option>
                  <option value="inStore">In-Store Purchase</option>
                  <option value="foodDelivery">Food Delivery</option>
                </>
              )}
              {category === 'energy' && (
                <>
                  <option value="home">Time at Home</option>
                </>
              )}
            </select>
          </div>

          {/* Distance Input (for transportation) */}
          {category === 'transportation' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (miles)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="e.g., 10"
                required
              />
            </div>
          )}

          {/* Hours Input (for energy) */}
          {category === 'energy' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="e.g., 8"
                required
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit()}
              className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityLogger;
