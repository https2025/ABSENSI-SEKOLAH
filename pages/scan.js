import { useState } from 'react';
import QrScanner from '../components/QrScanner';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Scan() {
  const [scanned, setScanned] = useState(false);

  const handleScan = async (data) => {
    if (scanned) return;
    try {
      const user = JSON.parse(data);
      await addDoc(collection(db, 'absensi'), {
        ...user,
        waktu: serverTimestamp(),
        status: 'hadir'
      });
      alert(`Absensi berhasil: ${user.nama}`);
      setScanned(true);
    } catch (err) {
      alert('QR tidak valid');
    }
  };

  return (
    <div>
      <h1>Scan QR Absensi</h1>
      <QrScanner onScan={handleScan} />
    </div>
  );
}
