import React, {Suspense, useMemo, useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {Decal, Float, OrbitControls, Preload, useTexture,} from "@react-three/drei";

import CanvasLoader from "../Loader";

/* eslint-disable react/display-name */
const Ball = ({imgUrl, floatSpeed}) => {
    const meshRef = useRef();
    const [decal] = useTexture([imgUrl]);
    const [speed, setSpeed] = useState(3.0);

    // Handle mouse over and out events
    const handleMouseOver = () => setSpeed(20.0);
    const handleMouseOut = () => setSpeed(3.0);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * speed;
            meshRef.current.rotation.y += delta * speed;
        }
    });

    return (
        <Float speed={floatSpeed} rotationIntensity={10} floatIntensity={7}>
            <ambientLight intensity={0.55}/>
            <directionalLight position={[0, 0, 0.5]}/>
            <mesh
                castShadow
                receiveShadow
                scale={2.0}
                onPointerOver={handleMouseOver}
                onPointerOut={handleMouseOut}
                ref={meshRef}
            >
                <icosahedronGeometry args={[1, 1]}/>
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

/* eslint-disable react/display-name */
const BallCanvas = ({icon}) => {
    // Speed state for the Float component
    const [floatSpeed, setFloatSpeed] = useState(3.0);

    // Function to handle mouse entering over the canvas
    const handleMouseEnter = () => {
        setFloatSpeed(10.0); // Increase the speed
    };

    // Function to handle mouse leaving the canvas
    const handleMouseLeave = () => {
        setFloatSpeed(3.0); // Reset to default speed
    };

    return (
        <Canvas
            frameloop='demand'
            dpr={[1, 2]}
            gl={{preserveDrawingBuffer: true}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Suspense fallback={<CanvasLoader/>}>
                <OrbitControls enableZoom={false} autoRotateSpeed={5} autoRotate/>
                <Ball imgUrl={icon} floatSpeed={floatSpeed}/>
            </Suspense>
            <Preload all/>
        </Canvas>
    );
};

// Adding displayName for better debugging and readability
Ball.displayName = 'Ball';
BallCanvas.displayName = 'BallCanvas';

export default BallCanvas;