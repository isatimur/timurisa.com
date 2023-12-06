import {motion} from "framer-motion";

import {styles} from "../styles.js";
import {WorkStationCanvas} from "./canvas";

const Hero = () => {
    return (
        <section className={`relative w-full h-screen mx-auto`}>
            <div
                className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
            >
                <div className='flex flex-col justify-center items-center mt-5'>
                    <div className='w-5 h-5 rounded-full bg-[#2A9D8F]'/>
                    <div className='w-1 sm:h-80 h-40 violet-gradient'/>
                </div>

                <div>
                    <h1 className={`${styles.heroHeadText} text-white`}>
                        Hi, I'm <span className='text-[#2A9D8F]'>Timur Isachenko</span>
                    </h1>
                    <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                        <span className="bg-primary">Innovator</span> in <span className="bg-primary">Technical</span> <span className="bg-primary">Leadership</span> &amp; <span className="bg-primary">Architectural</span> <span className="bg-primary">Design</span> <br className='sm:block hidden'/>
                        <span className="bg-primary">Blending</span> <span className="bg-primary">Advanced</span> <span className="bg-primary">Technology</span> with <span className="bg-primary">Strategic</span> <span className="bg-primary">Vision</span> in <span className="bg-primary">Software</span> <span className="bg-primary">Development</span>
                    </p>
                </div>
            </div>

            <WorkStationCanvas/>

            <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
                <a href='#about' name="CTO Technical Lead Solution Architect">
                    <div
                        className='w-[35px] h-[64px] rounded-3xl border-4 border-primary flex justify-center items-start p-2'>
                        <motion.div
                            animate={{
                                y: [0, 24, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                            className='w-3 h-3 rounded-full bg-primary mb-1'
                        />
                    </div>
                </a>
            </div>
        </section>
    );
};

export default Hero;
