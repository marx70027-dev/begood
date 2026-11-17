"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.offsetWidth / el.offsetHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.offsetWidth, el.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(icoGeo),
      new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.15 })
    );
    group.add(wireframe);

    const innerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.06,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    const pointsMat = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
    });
    const points = new THREE.Points(icoGeo, pointsMat);
    group.add(points);

    const orbitGeo = new THREE.TorusGeometry(2.2, 0.005, 8, 100);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.08 });
    const orbit1 = new THREE.Mesh(orbitGeo, orbitMat);
    orbit1.rotation.x = Math.PI / 3;
    group.add(orbit1);

    const orbit2 = orbit1.clone();
    orbit2.rotation.x = -Math.PI / 4;
    orbit2.rotation.z = Math.PI / 5;
    group.add(orbit2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0x8b5cf6, 0.5);
    dirLight.position.set(3, 3, 3);
    scene.add(dirLight);

    let rafId: number;
    function animate() {
      rafId = requestAnimationFrame(animate);
      group.rotation.y += 0.003;
      group.rotation.x += 0.001;
      innerMesh.rotation.y -= 0.005;
      innerMesh.rotation.z += 0.002;
      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
}
