import React, {Suspense, useEffect, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Preload, useGLTF} from "@react-three/drei";

import CanvasLoader from "../Loader";
import StarsCanvas from "./Stars";

const WorkStation = ({isMobile}) => {
    const macbookpro = useGLTF("./mac_book_pro/mac.gltf")
    return (
        <mesh>
            <hemisphereLight intensity={0.15} groundColor='yellow'/>
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
            />
            <pointLight intensity={1}/>
            <primitive
                object={macbookpro.scene}
                scale={isMobile ? 3.5 : 7.5}
                position={isMobile ? [2.5, -3, 1.0] : [2.5, -3.55, 1.0]}
                rotation={[-0.0, 1, -0.01]}
            />

        </mesh>
    );
};

const WorkStationCanvas = () => {
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
            frameloop='demand'
            shadows
            dpr={[1, 2]}
            camera={{position: [20, 3, 5], fov: 25}}
            gl={{preserveDrawingBuffer: true}}
        >
            <Suspense fallback={<CanvasLoader/>}>
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <WorkStation isMobile={isMobile}/>
            </Suspense>

            <Preload all/>
        </Canvas>
    );
};

WorkStation.displayName = 'WorkStation';
WorkStationCanvas.displayName = 'WorkStationCanvas';

export default WorkStationCanvas;
