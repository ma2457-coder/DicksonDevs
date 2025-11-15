import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const OnboardingSurvey = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    transportation: [],
    shoppingFrequency: '',
    dietType: '',
    energyUsage: '',
    householdSize: 1,
  });

  const totalSteps = 5;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTransportationToggle = (mode) => {
    setFormData(prev => ({
      ...prev,
      transportation: prev.transportation.includes(mode)
        ? prev.transportation.filter(m => m !== mode)
        : [...prev.transportation, mode],
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.transportation.length > 0;
      case 2: return formData.shoppingFrequency !== '';
      case 3: return formData.dietType !== '';
      case 4: return formData.energyUsage !== '';
      case 5: return formData.householdSize >= 1;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to CarbonOS</h1>
            <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                What are your primary transportation methods?
              </h2>
              <p className="text-gray-600 mb-6">Select all that apply</p>
              <div className="grid grid-cols-2 gap-4">
                {['car', 'bus', 'train', 'plane', 'bike', 'walk'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleTransportationToggle(mode)}
                    className={`p-4 rounded-lg border-2 transition-all capitalize ${
                      formData.transportation.includes(mode)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                How often do you shop weekly?
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'low', label: '1-2 times per week' },
                  { value: 'medium', label: '3-5 times per week' },
                  { value: 'high', label: '6+ times per week' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('shoppingFrequency', option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.shoppingFrequency === option.value
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                What's your diet type?
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'vegan', label: 'Vegan (plant-based only)' },
                  { value: 'vegetarian', label: 'Vegetarian (no meat)' },
                  { value: 'pescatarian', label: 'Pescatarian (fish only)' },
                  { value: 'mixed', label: 'Mixed (includes meat)' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('dietType', option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.dietType === option.value
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                How many hours per day are you typically at home?
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'low', label: 'Less than 8 hours' },
                  { value: 'medium', label: '8-16 hours' },
                  { value: 'high', label: 'More than 16 hours' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('energyUsage', option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.energyUsage === option.value
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                What's your household size?
              </h2>
              <p className="text-gray-600 mb-6">Number of people living in your home</p>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.householdSize}
                onChange={(e) => handleInputChange('householdSize', parseInt(e.target.value))}
                className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:border-green-500"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {step === totalSteps ? 'Get Started' : 'Next'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSurvey;
