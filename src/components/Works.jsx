import React from "react";
import Tilt from "react-parallax-tilt";
import {motion} from "framer-motion";

import {styles} from "../styles.js";
import {github} from "../../public/assets";
import {SectionWrapper} from "../hoc";
import {projects} from "../constants";
import {fadeIn, textVariant} from "../utils/motion";
import Image from "next/image";

const ProjectCard = ({
                         index,
                         name,
                         description,
                         tags,
                         image,
                         source_code_link,
                     }) => {
    const handleCardClick = (link) => {
        window.open(link, "_blank", "noopener,noreferrer");
    };

    return (
        <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}
                    className="bg-primary p-5 rounded-2xl sm:w-[360px] w-full border-2 border-opacity-10">
            <Tilt
                options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
            >
                <div className='relative w-full h-[230px]'>
                    <Image
                        src={image.src}
                        alt='project_image'
                        layout='fill'
                        className='w-full h-full object-cover rounded-2xl'
                    />

                    <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
                        <div
                            onClick={() => window.open(source_code_link, "_blank")}
                            className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                        >
                            <Image
                                src={github.src}
                                alt='source code'
                                layout='fill'
                                objectFit='contain'
                                className='w-1/2 h-1/2 object-contain'
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-5'>
                    <h3 className='text-white font-bold text-[24px]'>{name}</h3>
                    <p className='mt-2 text-secondary text-[14px]'>{description}</p>
                </div>

                <div className='mt-4 flex flex-wrap gap-2'>
                    {tags.map((tag) => (
                        <p
                            key={`${name}-${tag.name}`}
                            className={`text-[14px] ${tag.color}`}
                        >
                            #{tag.name}
                        </p>
                    ))}
                </div>
            </Tilt>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} `}>My work</p>
                <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
            </motion.div>
            <motion.p variants={fadeIn("", "", 0.1, 1)}
                      className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'>
                Here are some of the projects I've worked on that showcase my skills and experience. Each project
                includes a brief description and links to source code and live demos.
            </motion.p>

            <div className='mt-20 flex flex-wrap justify-center gap-7'>
                {projects.map((project, index) => (
                    <ProjectCard key={`project-${index}`} index={index} {...project} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Projects, "projects");
