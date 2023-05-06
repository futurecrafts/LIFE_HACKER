import React, { useRef , useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Space(props) {
  let group = useRef();
  let theta = 0;  

  useFrame((_, delta) => {
    if (group.current) {
      // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
      const r = 5 * Math.sin(THREE.MathUtils.degToRad((theta += 0.01)));
      const s = Math.cos(THREE.MathUtils.degToRad(theta * 2));
      group.current.rotation.set(r, r, r);
      group.current.scale.set(s, s, s);
      // group.current.position.x += 100 * delta;
      // group.current.position.y += 100 * delta;
      group.current.position.z += 150 * delta;
      if (group.current.position.z > 300) {
        // group.current.position.x = Math.random() * 800 - 400;
        // group.current.position.y = Math.random() * 800 - 400;
        group.current.position.z = Math.random() * 800 - 400; 
      }
      //console.log(group.current);
    }
  });

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("white")
    });
    const coords = new Array(2000)
      .fill()
      .map(i => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400
      ]);
    return [geo, mat, coords];
  }, []);

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
}