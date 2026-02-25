import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function RipplePlane() {
    const meshRef = useRef();
    const mousePos = useRef({ x: 0.5, y: 0.5 });
    const prevMousePos = useRef({ x: 0.5, y: 0.5 });
    const time = useRef(0);
    const { size, viewport } = useThree();

    const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uPrevMouse;
    varying vec2 vUv;
    varying float vWave;
    varying float vElevation;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float distToMouse = distance(uv, uMouse);
      float mouseVelocity = distance(uMouse, uPrevMouse);
      
      float ripple1 = sin(distToMouse * 15.0 - uTime * 4.0) * exp(-distToMouse * 4.0) * 0.5;
      ripple1 *= smoothstep(0.8, 0.0, distToMouse) * (1.0 + mouseVelocity * 8.0);
      
      float ripple2 = sin(distToMouse * 8.0 - uTime * 2.5) * exp(-distToMouse * 2.5) * 0.3;
      
      float wave1 = sin(pos.x * 3.0 + uTime * 1.5) * cos(pos.y * 3.0 + uTime * 1.2) * 0.2;
      float wave2 = sin(pos.x * 1.5 - uTime * 0.8) * sin(pos.y * 2.0 + uTime * 1.0) * 0.15;
      
      float noiseVal = noise(uv * 5.0 + uTime * 0.3) * 0.1;
      
      float totalWave = ripple1 + ripple2 + wave1 + wave2 + noiseVal;
      
      pos.z += totalWave;
      vWave = totalWave;
      vElevation = pos.z;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

    const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vWave;
    varying float vElevation;

    void main() {
      float gradient = vUv.y * 0.4 + 0.05;
      
      float waveBrightness = vWave * 1.2;
      
      float pattern1 = sin(vUv.x * 10.0 + uTime * 0.5) * cos(vUv.y * 10.0 - uTime * 0.3) * 0.1;
      float pattern2 = sin(length(vUv - 0.5) * 8.0 - uTime) * 0.08;
      
      float distToMouse = distance(vUv, uMouse);
      float mouseGlow = exp(-distToMouse * 3.0) * 0.4;
      
      float brightness = gradient + waveBrightness + pattern1 + pattern2 + mouseGlow;
      brightness = clamp(brightness, 0.0, 1.0);
      
      vec3 color1 = vec3(0.05, 0.05, 0.08); 
      vec3 color2 = vec3(0.4, 0.4, 0.45);   
      vec3 color3 = vec3(0.9, 0.9, 0.95);   
      
      vec3 finalColor = mix(color1, color2, smoothstep(0.0, 0.5, brightness));
      finalColor = mix(finalColor, color3, smoothstep(0.5, 1.0, brightness));
      
      float edge = smoothstep(0.2, 0.5, abs(vElevation));
      finalColor += vec3(edge * 0.15);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uPrevMouse: { value: new THREE.Vector2(0.5, 0.5) },
        }),
        []
    );

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = event.clientX / size.width;
            const y = 1 - (event.clientY / size.height);

            mousePos.current.x = x;
            mousePos.current.y = y;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [size]);

    useFrame((state) => {
        if (meshRef.current) {
            time.current += 0.015;
            meshRef.current.material.uniforms.uTime.value = time.current;

            meshRef.current.material.uniforms.uPrevMouse.value.copy(
                meshRef.current.material.uniforms.uMouse.value
            );

            meshRef.current.material.uniforms.uMouse.value.x = mousePos.current.x;
            meshRef.current.material.uniforms.uMouse.value.y = mousePos.current.y;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[Math.max(viewport.width, 10), Math.max(viewport.height, 10), 64, 64]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default function RippleEffect() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: 'transparent' }}
                dpr={[1, 1.5]}
                gl={{ powerPreference: "high-performance", antialias: false }}
            >
                <RipplePlane />
            </Canvas>
        </div>
    );
}
