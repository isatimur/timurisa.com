'use client';
import React from "react";
import {VerticalTimeline, VerticalTimelineElement,} from "react-vertical-timeline-component";
import {motion} from "framer-motion";
import Image from "next/image";

import "react-vertical-timeline-component/style.min.css";

import {styles} from "../styles.js";
import {experiences} from "../constants";
import {SectionWrapper} from "../hoc";
import {textVariant} from "../utils/motion";

// Define your color palette based on the image provided
const colorPalette = {
    background: "#1c2f35", // dark blue
    text: "#ffffff", // white
    subText: "#ffd60a", // yellow
    arrow: "#232631", // dark gray/blue
    iconBg: "#f5af19", // orange
};

const ExperienceCard = ({experience}) => {
    return (
        <VerticalTimelineElement
            contentStyle={{
                background: colorPalette.background,
                color: colorPalette.text,
            }}
            contentArrowStyle={{borderRight: `7px solid  ${colorPalette.arrow}`}}
            date={experience.date}
            iconStyle={{background: experience.iconBg || colorPalette.iconBg}}
            icon={
                <div className='flex justify-center items-center w-full h-full'>
                    <Image
                        src={experience.icon.src}
                        alt={experience.company_name}
                        width="60"
                        height="60"
                        className='w-[60%] h-[60%] object-contain'
                    />
                </div>
            }
        >
            <div>
                <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
                <p
                    className='text-burnt-orange text-[16px] font-semibold'
                    style={{margin: 0}}
                >
                    {experience.company_name}
                </p>
            </div>

            <ul className='mt-5 list-disc ml-5 space-y-2'>
                {experience.points.map((point, index) => (
                    <li
                        key={`experience-point-${index}`}
                        className='text-white-100 text-[14px] pl-1 tracking-wider'
                    >
                        {point}
                    </li>
                ))}
            </ul>
        </VerticalTimelineElement>
    );
};

const Experience = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} text-center`}>
                    What I have done so far
                </p>
                <h2 className={`${styles.sectionHeadText} text-center`}>
                    Work Experience.
                </h2>
            </motion.div>

            <div className='mt-20 flex flex-col'>
                <VerticalTimeline>
                    {experiences.map((experience, index) => (
                        <ExperienceCard
                            key={`experience-${index}`}
                            experience={{...experience, iconBg: colorPalette.iconBg}}
                        />
                    ))}
                </VerticalTimeline>
            </div>
        </>
    );
};

export default SectionWrapper(Experience, "work");
