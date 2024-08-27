import React from 'react';

interface User {
  id: number;
  name: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface CombinedData {
  userName: string;
  todoTitle: string;
  completed: boolean;
}

async function fetchUsersAndTodos() {
  try {
    const [usersResponse, todosResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/todos'),
    ]);

    const users: User[] = await usersResponse.json();
    const todos: Todo[] = await todosResponse.json();

    const combinedData: CombinedData[] = todos.map((todo) => {
      const user = users.find((user) => user.id === todo.userId);
      return {
        userName: user ? user.name : 'Người dùng không xác định',
        todoTitle: todo.title,
        completed: todo.completed,
      };
    });

    return combinedData;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return [];
  }
}

export default async function UsersTodosPage() {
  const combinedData = await fetchUsersAndTodos();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Công việc và Người dùng</h1>
      <ul className="list-disc pl-5">
        {combinedData.map((item, index) => (
          <li key={index} className="mb-4">
            <p>
              <strong>Tên Người Dùng:</strong> {item.userName}
            </p>
            <p>
              <strong>Công Việc:</strong> {item.todoTitle}
            </p>
            <p>
              <strong>Hoàn Thành:</strong> {item.completed ? 'Yes' : 'No'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
