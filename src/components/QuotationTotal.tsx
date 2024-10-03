import React from 'react';

interface QuotationTotalProps {
  selectedDelivery: number;
  setSelectedDelivery: React.Dispatch<React.SetStateAction<number>>;
  selectedInstallments: number;
  setSelectedInstallments: React.Dispatch<React.SetStateAction<number>>;
}

const QuotationTotal: React.FC<QuotationTotalProps> = ({
  selectedDelivery,
  setSelectedDelivery,
  selectedInstallments,
  setSelectedInstallments,
}) => {
  const deliveryOptions = [10, 20, 30];
  const installmentOptions = [3, 6, 9, 12, 14, 18];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Delivery</h3>
          <div className="flex space-x-2">
            {deliveryOptions.map(option => (
              <button
                key={option}
                onClick={() => setSelectedDelivery(option)}
                className={`px-4 py-2 rounded-md ${
                  selectedDelivery === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition duration-300`}
              >
                {option}%
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Installments</h3>
          <div className="grid grid-cols-3 gap-2">
            {installmentOptions.map(option => (
              <button
                key={option}
                onClick={() => setSelectedInstallments(option)}
                className={`px-4 py-2 rounded-md ${
                  selectedInstallments === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                } transition duration-300`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationTotal;