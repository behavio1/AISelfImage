"use client";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "../claude3-5/const";

const Controls = ({
  values,
  onChange,
}: {
  values: {
    cameraDistance: number;
    fieldOfView: number;
    heightOffset: number;
    positionX: number;
    positionY: number;
  };
  onChange: (key: string, value: number) => void;
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-md w-full text-white p-3 sm:p-4 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm mb-1 text-neutral-300">
            Camera Distance ({values.cameraDistance})
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.05"
            value={values.cameraDistance}
            onChange={(e) =>
              onChange("cameraDistance", parseFloat(e.target.value))
            }
            className="w-full h-1.5 sm:h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm mb-1 text-neutral-300">
            Field of View ({values.fieldOfView})
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.05"
            value={values.fieldOfView}
            onChange={(e) =>
              onChange("fieldOfView", parseFloat(e.target.value))
            }
            className="w-full h-1.5 sm:h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm mb-1 text-neutral-300">
            Height Offset ({values.heightOffset.toFixed(3)})
          </label>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.001"
            value={values.heightOffset}
            onChange={(e) =>
              onChange("heightOffset", parseFloat(e.target.value))
            }
            className="w-full h-1.5 sm:h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm mb-1 text-neutral-300">
            Position X ({values.positionX.toFixed(3)})
          </label>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.001"
            value={values.positionX}
            onChange={(e) => onChange("positionX", parseFloat(e.target.value))}
            className="w-full h-1.5 sm:h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm mb-1 text-neutral-300">
            Position Y ({values.positionY.toFixed(3)})
          </label>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.001"
            value={values.positionY}
            onChange={(e) => onChange("positionY", parseFloat(e.target.value))}
            className="w-full h-1.5 sm:h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700"
          />
        </div>
      </div>
    </div>
  );
};

export function ColorfulBoxShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [params, setParams] = useState({
    cameraDistance: 2,
    fieldOfView: 2.05,
    heightOffset: -0.445,
    positionX: 0.048,
    positionY: -0.212,
  });

  const handleParamChange = (key: string, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2() },
      uCameraDistance: { value: params.cameraDistance },
      uFieldOfView: { value: params.fieldOfView },
      uHeightOffset: { value: params.heightOffset },
      uPositionOffset: {
        value: new THREE.Vector2(params.positionX, params.positionY),
      },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      const { width, height } = canvasRef.current!.getBoundingClientRect();
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let animationFrameId: number;
    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) * 0.001, 0.016);
      lastTime = currentTime;

      uniforms.iTime.value += deltaTime;
      uniforms.uCameraDistance.value = params.cameraDistance;
      uniforms.uFieldOfView.value = params.fieldOfView;
      uniforms.uHeightOffset.value = params.heightOffset;
      uniforms.uPositionOffset.value.set(params.positionX, params.positionY);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [params]);

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="w-full aspect-square">
        <canvas
          ref={canvasRef}
          className={`w-full h-full ${className}`}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
      <Controls values={params} onChange={handleParamChange} />
    </div>
  );
}
