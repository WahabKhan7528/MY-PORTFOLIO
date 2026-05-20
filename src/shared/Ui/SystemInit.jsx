import { audioEngine } from '@/lib/audio';

function SystemInit({ onStart }) {
  return (
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-mono text-white overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20 animate-scanline" />

      {/* Corner Accents for the whole screen */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6 w-3 sm:w-4 h-3 sm:h-4 border-t border-l border-white/30" />
      <div className="absolute top-3 sm:top-6 right-3 sm:right-6 w-3 sm:w-4 h-3 sm:h-4 border-t border-r border-white/30" />
      <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 w-3 sm:w-4 h-3 sm:h-4 border-b border-l border-white/30" />
      <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 w-3 sm:w-4 h-3 sm:h-4 border-b border-r border-white/30" />

      {/* HUD Container around button */}
      <div className="relative group p-6 sm:p-10 border border-white/10 backdrop-blur-sm max-w-[90vw]">
        {/* Brackets */}
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-white/60" />
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-white/60" />
        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-white/60" />
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-white/60" />

        <div className="flex flex-col gap-6 items-center">
          {/* Top Metadata Line */}
          <div className="w-full flex justify-between text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/70 font-bold border-b border-white/5 pb-2">
            <span>SYS_READY</span>
            <span>AUTH_REQ</span>
          </div>

          {/* Button */}
          <button
            onClick={() => {
              audioEngine.init();
              audioEngine.playDrone();
              onStart();
            }}
            className="relative z-10 px-5 py-3 sm:px-10 sm:py-5 min-h-[44px] border border-white text-[10px] sm:text-sm tracking-[0.1em] sm:tracking-[0.3em] uppercase bg-white text-black hover:bg-black hover:text-white transition-all duration-500 flex flex-row items-center justify-center gap-2 sm:gap-3 overflow-hidden group/btn font-bold max-w-full"
          >
            {/* Inner scanline effect for button on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover/btn:animate-scan transition-all duration-1000" />
            
            <span className="relative z-10 text-xs sm:text-base whitespace-nowrap">[ Initialize System ]</span>
          </button>

          {/* Bottom Metadata Line */}
          <div className="w-full flex justify-between text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] text-white/40 border-t border-white/5 pt-2">
            <span>LOC: 0x7A4.001</span>
            <span>NET_SECURE</span>
          </div>
        </div>
      </div>

      {/* Instruction Text */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full px-4">
        <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase text-white/60 mb-2 font-medium">Awaiting User Interaction</p>
      </div>
    </div>
  );
}

export default SystemInit;
