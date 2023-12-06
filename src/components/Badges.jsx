import React, {useRef} from "react";
import {motion} from "framer-motion";
import {SectionWrapper} from "../hoc";
import {textVariant} from "../utils/motion";
import {badges} from "../constants/index.js";
import Tilt from "react-tilt";
import {styles} from "../styles.js";

const BadgeCard = ({title, icon, link}) => {
    const tiltRef = useRef(null);


    return (
        <Tilt ref={tiltRef} key={title} className='xs:w-[250px] w-full' options={{max: 25}}>
            <div
                options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
                className={`rounded-[20px] py-5 px-12 min-h-[250px] flex justify-evenly items-center flex-col front face`}>
                <a href={link}><img src={icon.src} className="object-contain mb-4"/></a>
                <h3 className="w-full text-white text-[20px] font-bold text-center">{title}</h3>
            </div>

        </Tilt>
    )
};
const Badges = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} text-center`}>
                    What have I earned
                </p>
                <h2 className={`${styles.sectionHeadText} text-center`}>Licenses & certifications</h2>
            </motion.div>
            <div className='mt-20 flex flex-wrap gap-10 justify-center items-center'>
                {badges.map((badge, index) => (
                    <BadgeCard key={index} index={index} {...badge} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Badges, "badges");

