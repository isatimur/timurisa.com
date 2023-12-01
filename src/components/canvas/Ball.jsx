import React, {Suspense, useMemo, useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {Decal, Float, OrbitControls, PointMaterial, Points, Preload, useTexture,} from "@react-three/drei";

import CanvasLoader from "../Loader";
import {random} from "maath";

function Stars(props) {
    const ref = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), {radius: 1.5}))
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15
    })
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false}/>
            </Points>
        </group>
    )
}

const Ball = (props) => {
    const [decal] = useTexture([props.imgUrl]);
    const Geometry = useMemo(
        () => () => <sphereGeometry args={[5,32]} />,
        []
    )

    return (
        <Float speed={3.0} rotationIntensity={10} floatIntensity={7}>
            <ambientLight intensity={0.55}/>
            <directionalLight position={[0, 0, 0.5]}/>
            <mesh castShadow receiveShadow scale={2.0}>
                <sphereGeometry args={[1, 32]} />
                <meshStandardMaterial
                    color='#fff'
                />
                <Decal
                    position={[0, 0, 1]}
                    rotation={[2 * Math.PI, 0, 6.25]}
                    scale={1.5}
                    map={decal}
                    flatShading
                />
                <Decal
                    position={[0, 0, -1]}
                    rotation={[2 * Math.PI, 0, 6.25]}
                    scale={1.5}
                    map={decal}
                    flatShading
                />


            </mesh>
        </Float>
    );
};

const BallCanvas = ({icon}) => {
    return (
        <Canvas
            frameloop='demand'
            dpr={[1, 2]}
            gl={{preserveDrawingBuffer: true}}
        >
            <Suspense fallback={<CanvasLoader/>}>

                <OrbitControls enableZoom={false} autoRotateSpeed={5} autoRotate/>
                <Ball imgUrl={icon}/>
                {/*<Stars/>*/}
            </Suspense>

            <Preload all/>
        </Canvas>
    );
};

export default BallCanvas;
