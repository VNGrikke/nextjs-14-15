'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Lỗi khi tìm kiếm người dùng:', error);
                setError('Có lỗi xảy ra khi lấy dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
            <ul className="space-y-4">
                {users.map((user) => (
                    <li key={user.id} className="border p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p>Email: {user.email}</p>
                        <p>Địa chỉ: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


