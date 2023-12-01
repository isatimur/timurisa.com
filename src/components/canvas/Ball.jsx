import React, {Suspense, useMemo} from "react";
import {Canvas} from "@react-three/fiber";
import {Decal, Float, OrbitControls, Preload, useTexture,} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {

    const [decal] = useTexture([props.imgUrl]);
    const Geometry = useMemo(
        () => () => <sphereGeometry args={[5, 32]}/>,
        []
    )

    return (
        <Float speed={3.0} rotationIntensity={10} floatIntensity={7}>
            <ambientLight intensity={0.55}/>
            <directionalLight position={[0, 0, 0.5]}/>
            <mesh castShadow receiveShadow scale={2.0}>
                <sphereGeometry args={[1, 32]}/>
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
