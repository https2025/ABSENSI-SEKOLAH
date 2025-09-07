'use client';

import QrScanner from '@/components/QrScanner';

export default function Scan() {
  const handleScan = (data: string) => {
    alert('QR terbaca: ' + data);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
      <QrScanner onScan={handleScan} />
    </main>
  );
}
