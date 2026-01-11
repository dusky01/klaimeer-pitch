'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create globe
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Create gradient material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec3 color1 = vec3(0.14, 0.39, 0.92); // Blue
          vec3 color2 = vec3(0.55, 0.36, 0.96); // Purple
          vec3 color3 = vec3(0.59, 0.13, 0.58); // Pink
          
          float mixValue = sin(vUv.y * 3.14159 + time * 0.2) * 0.5 + 0.5;
          vec3 color = mix(color1, color2, mixValue);
          color = mix(color, color3, vUv.x);
          
          // Add some glow
          float glow = pow(1.0 - abs(vPosition.z) / 2.0, 2.0);
          color += glow * 0.3;
          
          gl_FragColor = vec4(color, 0.8);
        }
      `,
      transparent: true,
      wireframe: false,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add wireframe
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x10b981, 
      transparent: true, 
      opacity: 0.2 
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Add points (stars/plots)
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsCount = 1000;
    const positions = new Float32Array(pointsCount * 3);

    for (let i = 0; i < pointsCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.1;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.02,
      transparent: true,
      opacity: 0.8,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    camera.position.z = 5;

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      material.uniforms.time.value = time;
      
      globe.rotation.y += 0.002;
      wireframe.rotation.y += 0.002;
      points.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
