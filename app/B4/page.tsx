// app/B4/page.tsx
import axios from 'axios';
import React from 'react';

interface FetchDataResponse {
    error?: number | string;
    data?: any;
}

// Fetch data function
async function fetchData(): Promise<FetchDataResponse> {
    try {
        const response = await axios.get('https://example.com/invalid-endpoint');
        return { data: response.data };
    } catch (error: any) {
        if (error.response) {
            console.error('Error Response:', error.response.status);
            return { error: error.response.status };
        } else if (error.request) {
            console.error('Error Request:', error.request);
            return { error: 'Không có phản hồi từ máy chủ' };
        } else {
            console.error('Error Message:', error.message);
            return { error: 'Đã xảy ra lỗi không mong muốn' };
        }
    }
}

const AxiosExample = async () => {
    const data: FetchDataResponse = await fetchData();

    if (data?.error) {
        if (data.error === 404) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <h1 className="text-2xl font-bold">404 - Trang không tồn tại</h1>
                </div>
            );
        } else if (data.error === 500) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <h1 className="text-2xl font-bold">500 - Lỗi máy chủ</h1>
                </div>
            );
        } else {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <h1 className="text-2xl font-bold">Lỗi: {data.error}</h1>
                </div>
            );
        }
    }

    return (
        <div>
            <h1>Dữ liệu đã được tải thành công:</h1>
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
        </div>
    );
};

export default AxiosExample;
