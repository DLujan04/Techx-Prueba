import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Inicio</h1>
      <Link href="/users">Ver Usuarios</Link>
    </div>
  );
}
