import {BrowserRouter} from "react-router-dom";

import {About, Badges, Contact, Experience, Hero, MyBook, Navbar, StarsCanvas, Tech} from "./components";
import bg from "../app/bghero.jpeg";

const App = () => {
    return (
        <BrowserRouter>
            <div className='relative z-0 bg-primary'>
                <header style={{
                    backgroundImage: "url(" + `${bg.src}` + ")",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}>
                    <Navbar/>
                    <Hero/>
                </header>
                <main>
                    <About/>
                    <Experience/>
                    <Tech/>
                    {/*<Works />*/}
                    {/*<Feedbacks />*/}
                    <Badges/>
                    <MyBook/>
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
