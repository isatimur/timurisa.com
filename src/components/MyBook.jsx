import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import Tilt from "react-parallax-tilt";
import { styles } from "../styles.js";
import { book, book2 } from "../../public/assets";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BookCard = ({ image, title, link, alt }) => (
    <Tilt options={{ max: 25 }} className="group">
        <Link href={link} target="_blank" rel="noopener noreferrer"
            className="relative block overflow-hidden rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl">
            <Image
                src={image.src}
                width={400}
                height={550}
                alt={alt}
                className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-medium">View on Amazon</span>
                    <ArrowRight className="w-5 h-5" />
                </div>
            </div>
        </Link>
    </Tilt>
);

const MyBook = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} text-center`}>
                    Published Works
                </p>
                <h2 className={`${styles.sectionHeadText} text-center mb-8`}>My Books</h2>
            </motion.div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
                <BookCard
                    image={book}
                    title="High Performance in-memory computing"
                    link="https://a.co/d/4rVYpcH"
                    alt="High Performance in-memory computing with Apache Ignite"
                />
                <BookCard
                    image={book2}
                    title="Generative AI with Local LLM"
                    link="https://a.co/d/a7kqMqW"
                    alt="Generative AI with Local LLM"
                />
            </div>
            <div className="text-center mt-8">
                <Link href="/book"
                    className="inline-flex items-center gap-2 text-white-100 hover:text-accent 
                             font-medium transition-colors">
                    Learn more about my books
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </>
    );
};

export default SectionWrapper(MyBook, "book");

