import * as THREE from 'three'
import React, { Suspense, useRef } from "react";
import { Canvas, extend, useThree, useFrame, useLoader } from '@react-three/fiber';
import {
  CubeTextureLoader,
  TextureLoader
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls })

function CameraControls(props) {
  const { camera, gl } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} target={[0, 0, 0]} {...props} args={[camera, gl.domElement]} />
}

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
  const texture = useLoader(TextureLoader, '/360image/image.jpg')
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

function ThreeSkyBox() {
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <CameraControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate rotateSpeed={-0.1} />
      <Suspense fallback={null}>
        <SkyBox />
      </Suspense>
    </Canvas>
  );
}

export default ThreeSkyBox;
