TechX Prueba Fullstack

Este proyecto demuestra el desarrollo fullstack con NestJS, Next.js, TypeScript, Python y Docker.

---

SECCIÓN 1: Comunicación y Coordinación

1.1 Cambio de Infraestructura de Último Momento

Plan de acción
1. Crear rama `mongo-switch`.
2. Reescribir entidades y módulos en NestJS para usar Mongoose.
3. Reconfigurar `.env` y `docker-compose.yml`.
4. Comunicar cambios 

Ejemplo de mensaje
Cambio urgente de base de datos: pasamos de PostgreSQL a MongoDB. Reunión hoy 14:00. 

---

1.2 Conflicto con DevOps

Solución
Revisar `Dockerfile` y `.env` para asegurar que `DATABASE_URL` se exporta correctamente, crear checklist de pre-deploy y implementar canal de comunicación dedicado.

---

SECCIÓN 2: Ejercicios Técnicos

2.1 NestJS – Código refactorizado

Archivo: `users.service.ts`

```ts
async findAll(): Promise<User[]> {
  try {
    return await this.repo.find();
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    throw new InternalServerErrorException('Error fetching users');
  }
}
```

---

### 2.2 Next.js – Página `pages/users.tsx`

```tsx
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:3001/users');
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);
  return (
    <div>
      <h1>Usuarios</h1>
      <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
}
```

Datos se cargan desde el backend NestJS (`/users`).  
Se muestra error si falla la conexión.

---

2.3 Python – `log_filter.py`

Descripción

Lee un archivo `server.log`, filtra líneas que contienen `"ERROR"` y genera `errors_only.log`.

Ejemplo de ejecución

Entrada: `server.log`

```txt
[INFO] Servidor iniciado
[ERROR] No se pudo conectar a la base de datos
```

Salida: `errors_only.log`

```txt
[ERROR] No se pudo conectar a la base de datos
```

Código

```python
try:
    with open("server.log", "r") as f:
        errors = [line for line in f if "ERROR" in line]
    with open("errors_only.log", "w") as f:
        f.writelines(errors)
except FileNotFoundError:
    print("Archivo no encontrado.")
```

---

SECCIÓN 3: Proyecto Docker

### 🧱 Estructura

```
fullstack-app/
├── backend/ (NestJS)
├── frontend/ (Next.js)
├── docker-compose.yml
├── log_filter.py
└── README.md
```

Ejecución local

```bash
docker-compose up --build
```

- Backend: http://localhost:3001/users
- Frontend: http://localhost:3000/users

Captura de pantalla (ejemplo)

> Aquí puedes insertar capturas mostrando la tabla de usuarios en frontend o la consola del backend.

---

SECCIÓN 4: Problemas en Producción

Diagnóstico de alto uso de memoria en NestJS

- Uso de `docker stats`, `node --inspect`, `clinic.js`
- Revisión de logs con `winston` o `nestjs-pino`

Soluciones

- Analizar ciclos infinitos o queries pesadas.
- Habilitar paginación en `/users`.

---

Reinicios afectan frontend

- Implementar `axios-retry`.
- Mostrar mensaje temporal tipo: `"Servidor reiniciando..."`.

Desconexión de base de datos

- Configurar `connection pool` y `timeout`.
- Verificar carga de conexiones simultáneas.
