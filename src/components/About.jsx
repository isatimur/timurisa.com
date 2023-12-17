import React, {useRef, useState} from "react";
import Tilt  from "react-parallax-tilt";
import {motion} from "framer-motion";

import {styles} from "../styles.js";
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
    const cardRef = useRef(null);
    const tiltRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [mouseSpeed, setMouseSpeed] = useState(5);
    const [circleColor, setCircleColor] = useState("bg-blue-500"); // default color
    const [circleSize, setCircleSize] = useState(Math.max(6, Math.min(12, 10 - mouseSpeed / 50))); // default size


    const handleDoubleClick = () => {
        setIsFlipped(!isFlipped);
        // Temporarily change circle color
        setCircleColor(isFlipped ? "border-blue-500" : "border-green-500");
        setTimeout(() => setCircleColor("border-blue-500"), 300);
    };

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const newX = e.clientX - rect.left - 25;
            const newY = e.clientY - rect.top - 25;
            const speed = Math.sqrt(Math.pow(newX - mousePosition.x, 2) + Math.pow(newY - mousePosition.y, 2));

            setMousePosition({x: newX, y: newY});
            setMouseSpeed(speed);
            // Calculate circle size based on speed
            const newCircleSize = Math.max(25, Math.min(12, 10 - mouseSpeed / 50));
            setCircleSize(newCircleSize);
        }
    };
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setMousePosition({x: 0, y: 0}); // Reset position
    };

    return (
        <Tilt ref={tiltRef} key={title} className='xs:w-[250px] w-full' options={{max: 25}}>
            <motion.div id="interactiveDiv" ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onDoubleClick={handleDoubleClick}
                        variants={fadeIn("right", "spring", title * 0.5, 0.75)}
                        className='relative h-full bg-burnt-orange p-[1px] rounded-[20px] shadow-card'
                        style={{userSelect: "none"}}
            >
                {isHovering && (
                    <motion.span
                        className={`absolute rounded-full ${circleColor}`} // Using circleColor state
                        style={{
                            x: mousePosition.x,
                            y: mousePosition.y,
                            width: circleSize + 'px', // Using circleSize state
                            height: circleSize + 'px',
                            opacity: 0.7,
                            backgroundColor: 'transparent',
                            border: '1px solid', // Set the border
                            borderColor: 'currentColor', // Use the current text color
                        }}
                        animate={{scale: [1, 1.5, 1]}}
                        transition={{repeat: Infinity, duration: 2, type: "spring"}}
                    />
                )}
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
                            <img src={icon.src} alt={title} className="w-16 h-16 object-contain mb-4"/>
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

            <div className='mt-20 flex flex-wrap gap-10 justify-center'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(About, "about");

