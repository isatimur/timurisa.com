import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";
import {BallCanvas, Hero, WorkStationCanvas} from "../components/index.js";
import App from "../App.jsx";
import Experience from "../components/Experience.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/About">
                <About/>
            </ComponentPreview>
            <ComponentPreview path="/Contact">
                <Contact/>
            </ComponentPreview>
            <ComponentPreview path="/BallCanvas">
                <BallCanvas/>
            </ComponentPreview>
            <ComponentPreview path="/WorkStationCanvas">
                <ComputersCanvas/>
            </ComponentPreview>
            <ComponentPreview path="/Hero">
                <Hero/>
            </ComponentPreview>
            <ComponentPreview path="/WorkStationCanvas">
                <WorkStationCanvas/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Experience">
                <Experience/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews