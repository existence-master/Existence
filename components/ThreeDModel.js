"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
varying vec3 vNormal;

void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;

void main() {
  vec3 lightDirection = normalize(vec3(0.5, 1.0, 0.75)); // Light direction
  float lightIntensity = dot(vNormal, lightDirection);
  vec3 color = vec3(0.8); // Shade of gray
  gl_FragColor = vec4(color * lightIntensity, 1.0); // Flat shading
}
`;

const Model = () => {
  const model = useGLTF("/existenceLogov2.glb");
  const ref = useRef();

  // Rotate the model based on mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      ref.current.rotation.y = x * 0.2; // Adjust the multiplier to change the sensitivity
      ref.current.rotation.x = y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Create a shader material
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {},
  });

  // Apply the shader material to the model
  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = shaderMaterial;
    }
  });

  return <primitive ref={ref} object={model.scene} scale={1.5} />;
};

const ThreeDModel = () => {
  return (
    <Canvas>
      <ambientLight intensity={1} />{" "}
      {/* Increase the intensity of the ambient light */}
      <pointLight position={[10, 10, 10]} intensity={1} />{" "}
      {/* Optionally increase point light intensity */}
      <Model />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ThreeDModel;
