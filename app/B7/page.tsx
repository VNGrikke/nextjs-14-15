'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleFilter = () => {
        const filtered = products.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>

            <div className="mb-4">
                <label className="block mb-2">
                    Giá tối thiểu:
                    <input
                        type="number"
                        min={0}
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="border rounded p-2 ml-2"
                    />
                </label>
                <label className="block mb-2">
                    Giá tối đa:
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="border rounded p-2 ml-2"
                    />
                </label>
                <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Lọc sản phẩm
                </button>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                    <li key={product.id} className="border p-4 rounded shadow">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p className="text-gray-700">${product.price.toFixed(2)}</p>
                        <p>{product.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
