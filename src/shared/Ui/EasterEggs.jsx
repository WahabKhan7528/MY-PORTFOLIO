import { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useNavigate } from 'react-router-dom';

// 1. System Diagnostics
function SystemDiagnostics() {
    const [active, setActive] = useState(false);
    const [fps, setFps] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollVelocity, setScrollVelocity] = useState(0);

    useEffect(() => {
        if (!active) return;

        let frameCount = 0;
        let lastTime = performance.now();
        let animationFrameId;
        let lastScrollY = window.scrollY;

        const updateDiagnostics = () => {
            const now = performance.now();
            frameCount++;

            if (now - lastTime >= 1000) {
                setFps(frameCount);
                frameCount = 0;
                lastTime = now;
            }

            // Calculate basic scroll velocity
            const currentScrollY = window.scrollY;
            setScrollVelocity(Math.abs(currentScrollY - lastScrollY));
            lastScrollY = currentScrollY;

            animationFrameId = requestAnimationFrame(updateDiagnostics);
        };

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        animationFrameId = requestAnimationFrame(updateDiagnostics);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [active]);

    return (
        <>
            {/* Hidden Toggle Button - Bottom Left Corner */}
            <button
                className="fixed bottom-0 left-0 w-8 h-8 opacity-0 z-[10000] cursor-default"
                onClick={() => setActive(!active)}
                aria-label="Toggle System Diagnostics"
            />
            
            {/* Diagnostics Overlay */}
            {active && (
                <div className="fixed top-24 right-4 z-[9999] bg-black/80 border border-white/20 p-4 text-[10px] font-mono text-white/70 pointer-events-none backdrop-blur-sm">
                    <div className="text-white mb-2 border-b border-white/20 pb-1 font-bold">SYS_DIAG_MODE // ACTIVE</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <span>FPS:</span>
                        <span className={fps < 30 ? 'text-red-500' : 'text-green-500'}>{fps}</span>
                        <span>POS_X:</span>
                        <span>{mousePos.x}</span>
                        <span>POS_Y:</span>
                        <span>{mousePos.y}</span>
                        <span>VEL_Y:</span>
                        <span>{scrollVelocity}px/f</span>
                        <span>MEM:</span>
                        <span>{performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB' : 'N/A'}</span>
                    </div>
                </div>
            )}
        </>
    );
}

// 2. Hidden Terminal
function HiddenTerminal() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { text: 'PRECISION NOIR [Version 1.0.0]', type: 'default' },
        { text: '(c) 2026. All rights reserved.', type: 'default' },
        { text: '', type: 'default' },
        { text: 'Type "help" for a list of commands.', type: 'default' }
    ]);
    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Trigger on ~ or Ctrl+Shift+T
            if ((e.key === '`' || e.key === '~') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't')) {
                e.preventDefault();
                setOpen(prev => !prev);
            }
        };

        const handleOpenTerminal = () => setOpen(true);
        const handleToggleTerminal = () => setOpen(prev => !prev);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-terminal', handleOpenTerminal);
        window.addEventListener('toggle-terminal', handleToggleTerminal);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-terminal', handleOpenTerminal);
            window.removeEventListener('toggle-terminal', handleToggleTerminal);
        };
    }, []);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
            // Brutalist animate in
            gsap.fromTo(terminalRef.current, { y: '-100%' }, { y: '0%', duration: 0.6, ease: 'expo.out' });
        }
    }, [open]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let newHistory = [...history, { text: `C:\\NOIR> ${input}`, type: 'default' }];

            switch (cmd) {
                case 'help':
                    newHistory.push(
                        { text: 'AVAILABLE COMMANDS:', type: 'success' },
                        { text: '  help            - Show this message', type: 'success' },
                        { text: '  projects        - Navigate to projects sector', type: 'success' },
                        { text: '  about           - Navigate to about sector', type: 'success' },
                        { text: '  contact         - Navigate to contact sector', type: 'success' },
                        { text: '  whoami          - Display system identity', type: 'success' },
                        { text: '  socials         - Display communication channels', type: 'success' },
                        { text: '  clear           - Clear terminal', type: 'success' },
                        { text: '  download_resume - Download system payload (resume)', type: 'success' },
                        { text: '  glitch          - Trigger system glitch', type: 'success' },
                        { text: '  exit            - Close terminal', type: 'success' }
                    );
                    break;
                case 'projects':
                    newHistory.push({ text: 'Redirecting to projects sector...', type: 'success' });
                    setTimeout(() => {
                        setOpen(false);
                        navigate('/projects');
                    }, 500);
                    break;
                case 'about':
                    newHistory.push({ text: 'Redirecting to about sector...', type: 'success' });
                    setTimeout(() => {
                        setOpen(false);
                        navigate('/about');
                    }, 500);
                    break;
                case 'contact':
                    newHistory.push({ text: 'Redirecting to contact sector...', type: 'success' });
                    setTimeout(() => {
                        setOpen(false);
                        navigate('/contact');
                    }, 500);
                    break;
                case 'whoami':
                    newHistory.push(
                        { text: 'IDENTITY: Abdul Wahab Khan Arib', type: 'success' },
                        { text: 'LOCATION: Bahawalpur, Pakistan', type: 'success' },
                        { text: 'EMAIL:    haribkhan0625@gmail.com', type: 'success' },
                        { text: 'PHONE:    +92 3078997313', type: 'success' }
                    );
                    break;
                case 'socials':
                    newHistory.push(
                        { text: 'COMMUNICATION CHANNELS:', type: 'success' },
                        { text: '  GitHub:    https://github.com/WahabKhan7528', type: 'success' },
                        { text: '  LinkedIn:  https://www.linkedin.com/in/abdul-wahab-khan-arib/', type: 'success' },
                        { text: '  Instagram: https://www.instagram.com/nexyvora/', type: 'success' }
                    );
                    break;
                case 'clear':
                    newHistory = [];
                    break;
                case 'glitch':
                    newHistory.push({ text: 'Triggering system glitch...', type: 'success' });
                    window.dispatchEvent(new CustomEvent('trigger-glitch'));
                    break;
                case 'download_resume':
                    newHistory.push({ text: 'Initiating payload transfer...', type: 'success' });
                    // Create an invisible link to download resume
                    const link = document.createElement('a');
                    link.href = '/AWAK_ATS_Resume.pdf'; // Fixed to use existing file
                    link.download = 'AWAK_ATS_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    break;
                case 'exit':
                    gsap.to(terminalRef.current, { y: '-100%', duration: 0.4, ease: 'expo.in', onComplete: () => setOpen(false) });
                    break;
                case '':
                    break;
                default:
                    newHistory.push({ text: `'${cmd}' is not recognized as an internal or external command.`, type: 'error' });
            }

            setHistory(newHistory);
            setInput('');
            
            // Auto scroll to bottom
            setTimeout(() => {
                if (terminalRef.current) {
                    const scrollContainer = terminalRef.current.querySelector('.overflow-y-auto');
                    if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }
            }, 10);
        }
    };

    if (!open) return null;

    return (
        <div 
            ref={terminalRef} 
            className="fixed inset-0 z-[11000] bg-black/95 backdrop-blur-xl text-white font-mono text-sm sm:text-base p-6 flex flex-col pointer-events-auto border-b-2 border-white/30"
            onClick={() => inputRef.current?.focus()}
        >
            {/* CRT scanline overlay effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-30" />
            
            <div className="flex justify-between items-center mb-4 z-20 border-b border-white/30 pb-2">
                <span className="text-xs tracking-widest text-white/70">TERMINAL // SYSTEM OVERRIDE</span>
                <button className="text-white/50 hover:text-white transition-colors uppercase text-xs tracking-widest" onClick={() => {
                     gsap.to(terminalRef.current, { y: '-100%', duration: 0.4, ease: 'expo.in', onComplete: () => setOpen(false) });
                }}>[X] CLOSE</button>
            </div>
            
            <div 
                className="flex-1 overflow-y-auto space-y-1 z-20 pb-10"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}
                data-lenis-prevent
            >
                {history.map((line, i) => (
                    <div 
                        key={i} 
                        className={`whitespace-pre-wrap ${
                            line.type === 'error' ? 'text-red-500' : 
                            line.type === 'success' ? 'text-green-500' : 'text-white'
                        }`}
                    >
                        {line.text}
                    </div>
                ))}
                <div className="flex items-center gap-2 mt-2">
                    <span>C:\NOIR&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        className="flex-1 bg-transparent border-none outline-none text-white font-mono focus:ring-0 p-0 shadow-none"
                        autoFocus
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    );
}

// 3. Konami Glitch
function KonamiGlitch() {
    const [glitching, setGlitching] = useState(false);
    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const [inputIdx, setInputIdx] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Check for key sequence
            if (e.key === sequence[inputIdx] || e.key.toLowerCase() === sequence[inputIdx].toLowerCase()) {
                if (inputIdx === sequence.length - 1) {
                    triggerGlitch();
                    setInputIdx(0);
                } else {
                    setInputIdx(prev => prev + 1);
                }
            } else {
                setInputIdx(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputIdx]);

    useEffect(() => {
        const handleGlitchEvent = () => triggerGlitch();
        window.addEventListener('trigger-glitch', handleGlitchEvent);
        return () => window.removeEventListener('trigger-glitch', handleGlitchEvent);
    }, []);

    const triggerGlitch = () => {
        setGlitching(true);
        
        // Use GSAP for a violent screen shake and filter glitch
        const tl = gsap.timeline({
            onComplete: () => {
                setGlitching(false);
                document.body.style.filter = '';
                document.body.style.transform = '';
            }
        });

        // Rapid violent filter and transform changes
        tl.to(document.body, { filter: 'invert(1) hue-rotate(90deg)', x: 15, y: -10, duration: 0.05 })
          .to(document.body, { filter: 'invert(0) hue-rotate(0deg)', x: -10, y: 15, duration: 0.05 })
          .to(document.body, { filter: 'invert(1) contrast(300%)', x: 20, y: -20, duration: 0.05 })
          .to(document.body, { filter: 'none', x: -15, y: 10, duration: 0.05 })
          .to(document.body, { filter: 'invert(1) saturate(500%)', x: 10, y: -10, duration: 0.05 })
          // Add a big violent shake
          .to(document.body, { x: 25, y: 15, duration: 0.02, repeat: 15, yoyo: true })
          .to(document.body, { x: 0, y: 0, filter: 'none', duration: 0.05 });
          
        // Animate the text separately for extra chaos
        setTimeout(() => {
            gsap.fromTo('.glitch-text', 
                { scale: 0.8, skewX: 30, opacity: 0.5 }, 
                { scale: 1.3, skewX: -30, opacity: 1, duration: 0.03, repeat: 20, yoyo: true, ease: 'power1.inOut' }
            );
        }, 100);
    };

    if (!glitching) return null;

    return (
        <div className="fixed inset-0 z-[12000] pointer-events-none mix-blend-difference overflow-hidden">
             {/* Fast moving horizontal lines */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.9)_50%)] bg-[length:100%_6px] animate-pulse opacity-70" />
             
             {/* RGB split artifacts */}
             <div className="absolute inset-0 bg-red-500 opacity-40 translate-x-6 -translate-y-3 animate-ping" />
             <div className="absolute inset-0 bg-blue-500 opacity-40 -translate-x-6 translate-y-3 animate-pulse" />
             
             <div className="glitch-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-9xl font-black text-white mix-blend-overlay italic tracking-tighter w-full text-center font-mono">
                SYSTEM FAILURE
             </div>
        </div>
    );
}

export default function EasterEggs() {
    return (
        <>
            <SystemDiagnostics />
            <HiddenTerminal />
            <KonamiGlitch />
        </>
    );
}

