'use client';
import React, {useRef} from "react";
import {motion} from "framer-motion";
import {styles} from "../styles.js";
import {badges} from "../constants";
import Tilt from "react-parallax-tilt";
import {SectionWrapper} from "../hoc";
import {textVariant} from "../utils/motion";

const BadgeCard = ({title, icon, link, name}) => {
    const tiltRef = useRef(null);


    return (
        <Tilt ref={tiltRef} key={name} className='xs:w-[250px] w-full' options={{max: 25}}>
            <motion.div
                options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
                className={`rounded-[20px] py-5 px-12 min-h-[250px] flex justify-evenly items-center flex-col front face`}>
                <a href={link} name={name}><img src={icon.src} alt={name} className="object-contain mb-4"/></a>
                <h3 className="w-full text-white text-[20px] font-bold text-center">{title}</h3>
            </motion.div>

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
                <h2 className={`${styles.sectionHeadText} text-center`}>
                    Licenses & certifications
                </h2>
            </motion.div>
            <div className='flex flex-wrap mt-20 gap-10 justify-center'>
                {badges.map((badge, index) => (
                    <BadgeCard key={index} index={index} {...badge} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Badges, "badges");

