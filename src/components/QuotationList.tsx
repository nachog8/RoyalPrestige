import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  codigo: string;
}

interface QuotationListProps {
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const QuotationList: React.FC<QuotationListProps> = ({ selectedProducts, setSelectedProducts }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/producto');
        setProducts(response.data);
        setDisplayedProducts(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProducts(prevProducts => {
      const isSelected = prevProducts.some(p => p.id === product.id);
      if (isSelected) {
        return prevProducts.filter(p => p.id !== product.id);
      } else {
        return [...prevProducts, product];
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setDisplayedProducts(
      products
        .filter(product => product.nombre.toLowerCase().includes(term))
        .slice(0, 6)
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Products</h2>
      <ul className="space-y-2">
        {selectedProducts.map(product => (
          <li key={product.id} className="flex justify-between items-center">
            <span>{product.nombre}</span>
            <span className="font-semibold">${product.precio.toLocaleString('es-ES')}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        + Add Product
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Select Products</h3>
            <input
              type="text"
              placeholder="Search products by name"
              className="w-full p-2 border rounded-md mb-4"
              onChange={handleSearch}
              value={searchTerm}
            />
            <ul className="max-h-60 overflow-y-auto">
              {displayedProducts.map(product => (
                <li
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedProducts.some(p => p.id === product.id) ? 'bg-blue-100' : ''
                  }`}
                >
                  <span>{product.nombre}</span>
                  <span className="float-right font-semibold">
                    ${product.precio.toLocaleString('es-ES')}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotationList;