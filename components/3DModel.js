"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 lightDirection = normalize(vec3(0.5, 1.0, 0.75)); // Light direction
  float lightIntensity = max(dot(vNormal, lightDirection), 0.0); // Lambertian reflectance
  vec3 color = vec3(1.5); // Bright white color, scaled above 1.0 for higher brightness
  vec3 shadedColor = color * lightIntensity;
  gl_FragColor = vec4(shadedColor, 1.0); // Flat shading with diffuse reflection
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
      <pointLight position={[5, 5, 0]} intensity={1} />{" "}
      {/* Optionally increase point light intensity */}
      <Model />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ThreeDModel;
