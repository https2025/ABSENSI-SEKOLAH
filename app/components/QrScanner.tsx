'use client';

import { useEffect, useRef } from 'react';
import jsQR from 'jsqr';

export default function QrScanner({ onScan }: { onScan: (data: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      video.play();
      tick();
    };

    const tick = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;
      const ctx = canvas.getContext('2d');
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0);
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          onScan(code.data);
          return;
        }
      }
      requestAnimationFrame(tick);
    };

    startCamera();
  }, [onScan]);

  return (
    <>
      <video ref={videoRef} style={{ width: '100%' }} />
      <canvas ref={canvasRef} hidden />
    </>
  );
}
