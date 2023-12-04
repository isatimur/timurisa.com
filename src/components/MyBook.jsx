import React, {useRef} from "react";
import {motion} from "framer-motion";
import {SectionWrapper} from "../hoc";
import {textVariant} from "../utils/motion";
import Tilt from "react-tilt";
import {styles} from "../styles.js";


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
            <div className='mt-20 flex flex-wrap gap-10'>
                <Tilt ref={tiltRef} key={title} className='xs:w-[250px] w-full' options={{max: 25}}>
                    {/*<div*/}
                    {/*    options={{*/}
                    {/*        max: 45,*/}
                    {/*        scale: 1,*/}
                    {/*        speed: 450,*/}
                    {/*    }}*/}
                    {/*    className={`rounded-[20px] py-5 px-12 min-h-[250px] flex justify-evenly items-center flex-col front face`}>*/}
                    {/*    <img src={``} className="object-contain mb-4"><Link to={``}/></img>*/}
                    {/*    <h3 className="w-full text-white text-[20px] font-bold text-center">{``}</h3>*/}
                    {/*</div>*/}

                </Tilt>
            </div>
        </>
    );
};

export default SectionWrapper(MyBook, "book");

