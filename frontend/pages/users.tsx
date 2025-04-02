import { useState, useEffect } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (err) {
      setError("No se pudo cargar la lista de usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Usuarios</h1>
      <button onClick={fetchUsers}>Refrescar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
