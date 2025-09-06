import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/login');
      else setUser(user);
    });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Selamat datang, {user.email}</h1>
      <a href="/scan">Scan Absensi</a> | <a href="/admin/laporan">Laporan</a>
    </div>
  );
}
