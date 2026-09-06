"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

/** A procedural architectural sculpture; illustrative, not a live system diagram. */
export default function ArchitectureScene() {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<{
    pause: (value: boolean) => void;
    reset: () => void;
  } | null>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!host.current) return;
    const mount = host.current;
    let disposed = false;
    let cleanup = () => {};
    import("three")
      .then(async (THREE) => {
        if (disposed) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "low-power",
          });
        } catch {
          setFailed(true);
          return;
        }
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
        camera.position.set(0, 0.5, 10.8);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setClearColor(0x141615, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;
        mount.appendChild(renderer.domElement);
        renderer.domElement.setAttribute("aria-hidden", "true");
        const sculpture = new THREE.Group();
        sculpture.rotation.set(0.32, -0.5, -0.26);
        scene.add(sculpture);
        scene.add(new THREE.HemisphereLight(0xf5ede2, 0x353932, 3));
        const key = new THREE.DirectionalLight(0xffffff, 6);
        key.position.set(-3, 6, 4);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xff7b35, 4);
        rim.position.set(4, -2, 2);
        scene.add(rim);
        const back = new THREE.DirectionalLight(0xd8e8ff, 5);
        back.position.set(0, 4, -4);
        scene.add(back);
        const silver = new THREE.MeshStandardMaterial({
          color: 0xb9bdb6,
          metalness: 0.72,
          roughness: 0.27,
        });
        const dark = new THREE.MeshStandardMaterial({
          color: 0x303631,
          metalness: 0.65,
          roughness: 0.3,
        });
        const orange = new THREE.MeshStandardMaterial({
          color: 0xff6b2b,
          metalness: 0.28,
          roughness: 0.25,
          emissive: 0xb12c03,
          emissiveIntensity: 0.15,
        });
        const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
        // Stacked machined rings describe an open, hollow, interlocking system.
        for (let i = 0; i < 23; i++) {
          const y = (i - 11) * 0.147;
          const radius = Math.sqrt(Math.max(0.2, 4.2 - y * y));
          const geometry = new THREE.TorusGeometry(radius, 0.048, 8, 100);
          geometries.push(geometry);
          const ring = new THREE.Mesh(
            geometry,
            i === 7 || i === 8 ? orange : silver,
          );
          ring.rotation.x = Math.PI / 2;
          ring.position.y = y;
          sculpture.add(ring);
        }
        const coreGeometry = new THREE.IcosahedronGeometry(0.65, 0);
        geometries.push(coreGeometry);
        const core = new THREE.Mesh(coreGeometry, orange);
        sculpture.add(core);
        const orbitGeometry = new THREE.TorusGeometry(2.45, 0.035, 8, 120);
        geometries.push(orbitGeometry);
        const orbit = new THREE.Mesh(orbitGeometry, dark);
        orbit.rotation.set(0.5, 0.8, 0.25);
        sculpture.add(orbit);
        const nodeGeometry = new THREE.SphereGeometry(0.105, 16, 12);
        geometries.push(nodeGeometry);
        for (let i = 0; i < 6; i++) {
          const node = new THREE.Mesh(nodeGeometry, orange);
          const a = (i / 6) * Math.PI * 2;
          node.position.set(Math.cos(a) * 2.45, Math.sin(a) * 2.45, 0);
          orbit.add(node);
        }
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        let isPaused = media.matches;
        setPaused(isPaused);
        let visible = true;
        let frame = 0;
        let last = 0;
        let dragging = false;
        let previousX = 0;
        let previousY = 0;
        let targetX = 0.32;
        let targetY = -0.5;
        const render = (time: number) => {
          frame = 0;
          if (disposed || !visible || document.hidden) return;
          const delta = Math.min((time - last) / 1000, 0.05);
          last = time;
          if (!isPaused && !dragging) targetY += delta * 0.13;
          sculpture.rotation.x += (targetX - sculpture.rotation.x) * 0.08;
          sculpture.rotation.y += (targetY - sculpture.rotation.y) * 0.08;
          core.rotation.y = sculpture.rotation.y * -1.5;
          renderer.render(scene, camera);
          if (
            !isPaused ||
            dragging ||
            Math.abs(targetY - sculpture.rotation.y) > 0.001 ||
            Math.abs(targetX - sculpture.rotation.x) > 0.001
          )
            frame = requestAnimationFrame(render);
        };
        const wake = () => {
          if (!frame && visible && !document.hidden) {
            last = performance.now();
            frame = requestAnimationFrame(render);
          }
        };
        const resize = () => {
          const { width, height } = mount.getBoundingClientRect();
          renderer.setSize(width, height);
          camera.aspect = width / Math.max(height, 1);
          camera.position.z = width < 450 ? 12 : 10.8;
          camera.updateProjectionMatrix();
          wake();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(mount);
        const intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) wake();
          else {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        });
        intersection.observe(mount);
        const down = (e: PointerEvent) => {
          dragging = true;
          previousX = e.clientX;
          previousY = e.clientY;
          mount.setPointerCapture(e.pointerId);
          wake();
        };
        const move = (e: PointerEvent) => {
          if (!dragging) return;
          targetY += (e.clientX - previousX) * 0.008;
          targetX = Math.max(
            -1.2,
            Math.min(1.2, targetX + (e.clientY - previousY) * 0.006),
          );
          previousX = e.clientX;
          previousY = e.clientY;
          wake();
        };
        const up = () => {
          dragging = false;
          wake();
        };
        const visibility = () => {
          if (document.hidden) {
            cancelAnimationFrame(frame);
            frame = 0;
          } else wake();
        };
        const preference = () => {
          isPaused = media.matches;
          setPaused(isPaused);
          wake();
        };
        const keydown = (e: KeyboardEvent) => {
          if (
            !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
          )
            return;
          e.preventDefault();
          targetY +=
            e.key === "ArrowLeft" ? -0.2 : e.key === "ArrowRight" ? 0.2 : 0;
          targetX +=
            e.key === "ArrowUp" ? -0.2 : e.key === "ArrowDown" ? 0.2 : 0;
          wake();
        };
        mount.addEventListener("pointerdown", down);
        mount.addEventListener("pointermove", move);
        mount.addEventListener("pointerup", up);
        mount.addEventListener("pointercancel", up);
        mount.addEventListener("keydown", keydown);
        document.addEventListener("visibilitychange", visibility);
        media.addEventListener("change", preference);
        controller.current = {
          pause: (value) => {
            isPaused = value;
            wake();
          },
          reset: () => {
            targetX = 0.32;
            targetY = -0.5;
            wake();
          },
        };
        setReady(true);
        resize();
        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          intersection.disconnect();
          mount.removeEventListener("pointerdown", down);
          mount.removeEventListener("pointermove", move);
          mount.removeEventListener("pointerup", up);
          mount.removeEventListener("pointercancel", up);
          mount.removeEventListener("keydown", keydown);
          document.removeEventListener("visibilitychange", visibility);
          media.removeEventListener("change", preference);
          geometries.forEach((g) => g.dispose());
          silver.dispose();
          dark.dispose();
          orange.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          controller.current = null;
        };
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="architecture-art">
      <div
        className={`sculpture-fallback ${ready ? "is-ready" : ""}`}
        aria-hidden="true"
      >
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <div
        ref={host}
        className="architecture-canvas"
        role="img"
        aria-label={
          ready
            ? "Interactive 3D sculpture of silver rings around an orange core. Drag or use arrow keys to rotate."
            : "Static preview of interlocking silver and orange rings."
        }
        tabIndex={ready ? 0 : -1}
      />
      <span className="art-caption">Interconnected by design.</span>
      <div className="art-controls">
        <span>
          {ready
            ? "Drag to explore"
            : failed
              ? "Sculpture preview"
              : "Loading sculpture"}
        </span>
        <button
          aria-label={
            paused ? "Play sculpture animation" : "Pause sculpture animation"
          }
          disabled={!ready}
          onClick={() => {
            controller.current?.pause(!paused);
            setPaused(!paused);
          }}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
        <button
          aria-label="Reset sculpture rotation"
          disabled={!ready}
          onClick={() => controller.current?.reset()}
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}
