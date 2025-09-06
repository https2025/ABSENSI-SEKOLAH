import { useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import { QrScanner } from '@yudiel/react-qr-scanner';

export default function QrScanner({ onScan }) {
  return (
    <QrReader
      constraints={{ facingMode: 'environment' }}
      onResult={(result, error) => {
        if (result) onScan(result?.text);
      }}
      style={{ width: '100%' }}
    />
  );
}

export default function QrScanner({ onScan }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      tick();
    };

    const tick = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          onScan(code.data);
          return;
        }
      }
      requestAnimationFrame(tick);
    };

    startCamera();
  }, []);

  return (
    <>
      <video ref={videoRef} style={{ width: '100%' }} />
      <canvas ref={canvasRef} hidden />
    </>
  );
}
