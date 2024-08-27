"use client"
import React, { useEffect, useState } from 'react';

async function getProduct() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
}

export default function Page() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const productsData = await getProduct();
            setProducts(productsData);
        }

        fetchData();
    }, []);

    return (
        <div>
            <p>Danh sach san pham</p>
            <ul>
                {products.map((product: any) => {
                    return <li key={product.id}>
                        <h2>{product.title}</h2>
                        <img className='w-[50px]' src={product.image} alt={product.title} />
                        <p>Price: {product.price}</p>
                        <hr />
                    </li>
                })}
            </ul>
        </div>
    );
}
