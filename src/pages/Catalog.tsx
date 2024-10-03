import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Ergonomic Office Chair",
    description: "Comfortable chair with lumbar support",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: 199.99,
    category: "Furniture"
  },
  {
    id: 2,
    title: "Wireless Keyboard",
    description: "Slim, quiet keyboard with long battery life",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: 59.99,
    category: "Electronics"
  },
  {
    id: 3,
    title: "Desk Lamp",
    description: "Adjustable LED lamp with multiple brightness levels",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: 39.99,
    category: "Lighting"
  },
  {
    id: 4,
    title: "Notebook Set",
    description: "Pack of 3 high-quality lined notebooks",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    price: 14.99,
    category: "Stationery"
  },
];

const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Catalog</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded ${selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                  <ShoppingBag className="inline-block mr-2" size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;