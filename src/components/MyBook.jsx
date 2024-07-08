import React, {useRef} from "react";
import {motion} from "framer-motion";
import {SectionWrapper} from "../hoc";
import {textVariant} from "../utils/motion";
import Tilt from "react-parallax-tilt";
import {styles} from "../styles.js";
import {book} from "../../public/assets"
import Image from "next/image";


const MyBook = () => {
    const tiltRef = useRef(null);

    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} text-center`}>
                    What have I written
                </p>
                <h2 className={`${styles.sectionHeadText} text-center`}>My book</h2>
            </motion.div>
            <div className="flex justify-center items-center"> {/* Flex container to center contents */}
                <Tilt ref={tiltRef} key={"title"} options={{max: 25}}>
                    <Image src={book.src} width="500" height="1000" alt="Book Cover" className="object-contain mb-4"/>
                </Tilt>
            </div>
        </>
    );
};

export default SectionWrapper(MyBook, "book");

