import React, { useState } from 'react';
import QuotationList from '../components/QuotationList';
import QuotationTotal from '../components/QuotationTotal';
import QuotationSummary from '../components/QuotationSummary';

const Quotation: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(10);
  const [selectedInstallments, setSelectedInstallments] = useState(3);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Quotation System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <QuotationList
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </div>
        <div>
          <QuotationTotal
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
            selectedInstallments={selectedInstallments}
            setSelectedInstallments={setSelectedInstallments}
          />
          <QuotationSummary
            selectedProducts={selectedProducts}
            deliveryPercentage={selectedDelivery}
            installments={selectedInstallments}
          />
        </div>
      </div>
    </div>
  );
};

export default Quotation;