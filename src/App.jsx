import {BrowserRouter} from "react-router-dom";

import {About, Contact, Experience, Hero, Navbar, StarsCanvas, Tech} from "./components";
import Badges from "./components/Badges.jsx";
import {Component} from "react";
import MyBook from "./components/MyBook.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <div className='relative z-0 bg-primary'>
                <header className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                    <Navbar/>
                    <Hero/>
                </header>
                <main>
                    <About/>
                    <Experience/>
                    <Tech/>
                    {/*<Works />*/}
                    {/*<Feedbacks />*/}
                    <Badges />
                    <MyBook />
                </main>
                <footer>
                    <Contact/>
                </footer>
                <StarsCanvas/>
            </div>
        </BrowserRouter>
    );
}

export default App;
