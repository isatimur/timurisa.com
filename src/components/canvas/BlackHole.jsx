import React, {Suspense, useEffect, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Preload, useGLTF} from "@react-three/drei";

import CanvasLoader from "../Loader";

const BlackHole = ({isMobile}) => {
    const blackhole = useGLTF("./blackhole/untitled.gltf");

    return (
        <primitive object={blackhole.scene} scale={isMobile ? 1 : 0.75} position-y={-0.5} rotation-y={0.5}/>
    );
};

const BlackHoleCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            shadows
            frameloop='demand'
            dpr={[1, 2]}
            gl={{preserveDrawingBuffer: true}}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <Suspense fallback={<CanvasLoader/>}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <BlackHole isMobile={isMobile}/>

                <Preload all/>
            </Suspense>
        </Canvas>
    );
};
BlackHole.displayName = 'BlackHole';
BlackHoleCanvas.displayName = 'BlackHoleCanvas';

export default BlackHoleCanvas;
