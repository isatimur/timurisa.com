import React, {useRef, useState} from "react";
import Tilt from "react-tilt";
import {motion} from "framer-motion";

import {styles} from "../styles";
import {services} from "../constants";
import {SectionWrapper} from "../hoc";
import {fadeIn, textVariant} from "../utils/motion";

const flipVariant = {
    front: {
        rotateY: 0,
        transition: {duration: 0.6, ease: "easeInOut"},
    },
    back: {
        rotateY: 180,
        transition: {duration: 0.6, ease: "easeInOut"},
    },
};

const ServiceCard = ({title, icon, description}) => {
    const ref = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleDoubleClick = (e) => {
        setIsFlipped(!isFlipped);
        removeEventListener(e);
    };

    return (
        <Tilt key={title} className='xs:w-[250px] w-full' options={{max: 25}}>
            <motion.div onDoubleClick={handleDoubleClick}
                        variants={fadeIn("right", "spring", title * 0.5, 0.75)}
                        className='h-full bg-burnt-orange p-[1px] rounded-[20px] shadow-card'
            >

                <motion.div
                    className={`h-full transform transition-transform duration-700}`}
                    variants={flipVariant}
                    animate={isFlipped ? "back" : "front"}
                >
                    {isFlipped ? (
                        <div
                            options={{
                                max: 45,
                                scale: 1,
                                speed: 450,
                            }}
                            className={`rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col back face ${isFlipped ? '' : 'rotate-y-180'}`}>
                            <p className="text-[#264653] text-[15px] text-center">{description}</p>
                        </div>

                    ) : (
                        <div
                            options={{
                                max: 45,
                                scale: 1,
                                speed: 450,
                            }}
                            className={`rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col front face ${isFlipped ? 'rotate-y-180' : ''}`}>
                            <img src={icon} alt={title} className="w-16 h-16 object-contain mb-4"/>
                            <h3 className="w-full text-white text-[20px] font-bold text-center">{title}</h3>
                        </div>
                    )}
                </motion.div>

            </motion.div>
        </Tilt>
    )
};

const About = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Who Am I?</p>
                <h2 className={styles.sectionHeadText}>Timur Isachenko</h2>
            </motion.div>

            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
            >
                With over 14 years of experience as a Solution Architect and Software Developer, I've mastered the art
                of crafting robust, scalable software solutions using Java, JavaScript, and a myriad of modern
                frameworks like Spring, PlayFramework, React, Node.js, and Three.js. My passion lies in solving complex
                problems and creating user-centric applications that stand the test of time. I'm all about turning
                ambitious ideas into real-life products, with a keen eye for detail and a relentless drive for
                excellence.
            </motion.p>

            <div className='mt-20 flex flex-wrap gap-10'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(About, "about");

