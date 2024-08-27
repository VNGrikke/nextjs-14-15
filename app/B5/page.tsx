'use client';

import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Không thể tải sản phẩm');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError('Có lỗi xảy ra khi lấy dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <li key={product.id} className="border p-4 rounded shadow">
                        <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-4" />
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p>{product.description}</p>
                        <p className="text-xl font-bold mt-2">${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


