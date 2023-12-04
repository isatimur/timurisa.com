import React, {useRef} from "react";
import {motion} from "framer-motion";
import {SectionWrapper} from "../hoc";
import {textVariant} from "../utils/motion";
import Tilt from "react-tilt";
import {styles} from "../styles.js";
import {book, github} from "../assets"


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
            <div className='mt-20 flex gap-10 text-center justify-center'>

                <Tilt ref={tiltRef} key={"title"} className='xs:w-[450px] w-full' options={{max: 25}}>

                    <div
                        options={{
                            max: 45,
                            scale: 1,
                            speed: 450,
                        }}
                        className={`rounded-[20px] py-5 px-12 min-h-[480px] flex justify-evenly items-center flex-col front face`}>
                        <img src={book} className="object-contain mb-4"/>
                        <h2 className={`text-center`}></h2>
                    </div>
                    <div className='absolute grid-flow-col inset-0 flex justify-end m-3 card-img_hover'>
                        <div
                            onClick={() => window.open("https://github.com/srecon/ignite-book-code-samples", "_blank")}
                            className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                        >
                            <img
                                src={github}
                                alt='source code'
                                className='w-1/2 h-1/2 object-contain'
                            />
                        </div>
                    </div>
                </Tilt>



            </div>
        </>
    );
};

export default SectionWrapper(MyBook, "book");

