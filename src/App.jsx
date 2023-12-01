import {BrowserRouter} from "react-router-dom";

import {About, Contact, Experience, Feedbacks, Hero, Navbar, StarsCanvas, Tech, Works} from "./components";

const App = () => {
    return (
        <BrowserRouter>
            <div className='relative z-0 bg-primary'>
                <header className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                    <Navbar />
                    <Hero />
                </header>
                <main>
                        <About />
                        <Experience />
                        <Tech />
                        {/*<Works />*/}
                        {/*<Feedbacks />*/}
                </main>
                <footer>
                    <Contact />
                </footer>
                <StarsCanvas />
            </div>
        </BrowserRouter>
    );
}

export default App;
