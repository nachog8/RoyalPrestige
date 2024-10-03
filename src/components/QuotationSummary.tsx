import React from 'react';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  codigo: string;
}

interface QuotationSummaryProps {
  selectedProducts: Product[];
  deliveryPercentage: number;
  installments: number;
}

const QuotationSummary: React.FC<QuotationSummaryProps> = ({
  selectedProducts,
  deliveryPercentage,
  installments,
}) => {
  const interests = {
    3: 39.07,
    6: 21.88,
    9: 16.26,
    12: 13.53,
    14: 12.4,
    18: 10.9,
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => total + product.precio, 0);
  };

  const calculateDelivery = (total: number) => {
    return total * (deliveryPercentage / 100);
  };

  const calculateInstallment = (total: number, installments: number) => {
    const delivery = calculateDelivery(total);
    const amountToFinance = total - delivery;
    const interestRate = interests[installments as keyof typeof interests] || 0;
    const amountWithInterest = (amountToFinance * interestRate) / 100;
    return (amountToFinance + amountWithInterest) / installments;
  };

  const calculateDailyAmount = (total: number, installments: number) => {
    const installmentAmount = calculateInstallment(total, installments);
    return installmentAmount / 30;
  };

  const total = calculateTotal();
  const delivery = calculateDelivery(total);
  const installmentAmount = calculateInstallment(total, installments);
  const dailyAmount = calculateDailyAmount(total, installments);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Order Summary</h2>
      <ul className="space-y-2 mb-4">
        {selectedProducts.map(product => (
          <li key={product.id} className="flex justify-between items-center">
            <span>{product.nombre}</span>
            <span className="font-semibold">${product.precio.toLocaleString('es-ES')}</span>
          </li>
        ))}
      </ul>
      <div className="border-t pt-4">
        <p className="text-xl font-bold mb-2">Total: ${total.toLocaleString('es-ES')}</p>
        <p>Delivery ({deliveryPercentage}%): ${delivery.toLocaleString('es-ES')}</p>
        <p>{installments} Installments of: ${installmentAmount.toLocaleString('es-ES')}</p>
        <p>Daily Amount: ${dailyAmount.toLocaleString('es-ES')}</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300">
          Back
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
          Add
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default QuotationSummary;