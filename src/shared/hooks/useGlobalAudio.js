import { useEffect } from 'react';
import { audioEngine } from '@/lib/audio';

export default function useGlobalAudio() {
  useEffect(() => {
    const handleMouseDown = () => {
      audioEngine.playClick();
    };

    // User interaction enables audio context
    const handleInteraction = () => {
      audioEngine.init();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);
}
