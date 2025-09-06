import { QrReader } from '@yudiel/react-qr-scanner';

export default function QrScanner({ onScan }) {
  return (
    <QrReader
      constraints={{ facingMode: 'environment' }}
      onResult={(result, error) => {
        if (result) onScan(result.text);
      }}
      style={{ width: '100%' }}
    />
  );
}
