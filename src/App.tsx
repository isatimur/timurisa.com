import {BrowserRouter} from "react-router-dom";

import {About, Badges, Contact, Experience, Hero, MyBook, Navbar, StarsCanvas,
    // Tech
} from "./components";
import bg from "../app/bghero.jpeg";
import {useEffect, useState} from "react";
import FloatingButton from "./components/FloatingButton";
// import Works from "./components/Works";

const App = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event: any) => {
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
        <BrowserRouter>
            <div className='relative z-0 bg-primary'>
                <header style={{
                    backgroundImage: "url(" + `${bg.src}` + ")",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }}>
                    <Navbar/>
                    <Hero/>
                </header>
                <main>
                    <About/>
                    <Experience/>
                    {/*<Tech/>*/}
                    <Badges/>
                    <MyBook/>
                    {/*<Works />*/}
                    {/*<Feedbacks />*/}
                    <FloatingButton />
                </main>
                <footer>
                    <Contact/>
                </footer>
                {!isMobile ? <StarsCanvas/> : "" }
            </div>
        </BrowserRouter>
    );
}

export default App;
