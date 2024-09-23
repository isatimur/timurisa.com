import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import Tilt from "react-parallax-tilt";
import { styles } from "../styles.js";
import { book, book2 } from "../../public/assets"


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
            <div className="flex justify-center items-center space-x-4"> {/* Add space between the books */}
                <Tilt ref={tiltRef1} key={"title1"} options={{ max: 25 }}>
                    <img src={book.src} width="100%" height="h-full" alt="Book Cover 1" className="object-contain mb-4" />
                </Tilt>
                <Tilt ref={tiltRef2} key={"title2"} options={{ max: 25 }}>
                    <img src={book2.src} width="100%" height="h-full" alt="Book Cover 2" className="object-contain mb-4" />
                </Tilt>
            </div>
        </>
    );
};

export default SectionWrapper(MyBook, "book");

