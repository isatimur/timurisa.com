import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import Tilt from "react-parallax-tilt";
import { styles } from "../styles.js";
import { book, book2 } from "../../public/assets"
import Image from "next/image";


const MyBook = () => {
    const tiltRef1 = useRef(null);
    const tiltRef2 = useRef(null); // Add a second ref for the second book

    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} text-center`}>
                    What have I written
                </p>
                <h2 className={`${styles.sectionHeadText} text-center`}>My books</h2> {/* Update heading to plural */}
            </motion.div>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
                <Tilt ref={tiltRef1} key={"title1"} options={{ max: 25 }}>
                    <a href="https://a.co/d/4rVYpcH" target="_blank" rel="noopener noreferrer"
                        className="block hover:opacity-80 transition-opacity">
                        <Image
                            src={book.src}
                            width={400}
                            height={550}
                            alt="High Performance in-memory computing with Apache Ignite"
                            className="object-contain shadow-lg rounded-lg"
                        />
                    </a>
                </Tilt>
                <Tilt ref={tiltRef2} key={"title2"} options={{ max: 25 }}>
                    <a href="https://a.co/d/a7kqMqW" target="_blank" rel="noopener noreferrer"
                        className="block hover:opacity-80 transition-opacity">
                        <Image
                            src={book2.src}
                            width={400}
                            height={550}
                            alt="Generative AI with Local LLM"
                            className="object-contain shadow-lg rounded-lg"
                        />
                    </a>
                </Tilt>
            </div>
        </>
    );
};

export default SectionWrapper(MyBook, "book");

