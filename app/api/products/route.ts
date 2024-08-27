import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        return NextResponse.json(products);
    } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
        return NextResponse.json({ error: 'Không thể tải sản phẩm' });
    }
}
