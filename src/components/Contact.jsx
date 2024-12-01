import React, { useRef, useState, useCallback } from "react";
import { motion, useAnimation, AnimationControls, AnimatePresence } from 'framer-motion';
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { styles } from "../styles.js";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";


const phrases = [
    "Yes!\nReach out\nnow",
    "Perfect\ntime to\nconnect",
    "Great\nidea!",
    "Success\nawaits",
    "Absolutely\nyes!",
    "Let's\ntalk!",
]

const Magic8Ball = () => {
    const [phrase, setPhrase] = useState("8")
    const [isShaking, setIsShaking] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const shakeControls = useAnimation()

    const shake = useCallback(async () => {
        if (isShaking) return

        setIsShaking(true)
        setShowAnswer(false)

        if ('vibrate' in navigator) {
            navigator.vibrate(200);
        }

        const crazyShake = async () => {
            const generateRandomShake = () => ({
                x: Math.random() * 8 - 8,
                y: Math.random() * 8 - 8,
                z: Math.random() * 8 - 8,
                scale: 1.1,
            })

            const shakeSequence = Array.from({ length: 30 }, generateRandomShake)

            await shakeControls.start({
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                transition: { duration: 0.3, ease: "linear" }
            })

            await shakeControls.start({
                x: shakeSequence.map(point => point.x),
                y: shakeSequence.map(point => point.y),
                z: shakeSequence.map(point => point.z),
                scale: shakeSequence.map(point => point.scale),
                transition: {
                    duration: 1.0,
                    times: shakeSequence.map((_, i) => i / (shakeSequence.length - 1)),
                    ease: "linear",
                    repeat: 1,
                    repeatType: "reverse",
                },
            })
            await shakeControls.start({
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                transition: { duration: 0.3, ease: "linear" }
            })
        }

        await crazyShake()
        setIsShaking(false)

        await new Promise(resolve => setTimeout(resolve, 500))

        const newAnswer = phrases[Math.floor(Math.random() * phrases.length)]
        setPhrase(newAnswer)
        setShowAnswer(true)
    }, [isShaking, shakeControls])

    return (
        <div className="flex flex-col items-center justify-center">
            <motion.div
                className="relative cursor-pointer"
                onClick={shake}
                animate={isShaking ? shakeControls : {}}
            >
                 {/* Main Ball */}
                 <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-gradient-to-br from-gray-900 to-black shadow-2xl
                    flex items-center justify-center relative overflow-hidden">
                    
                    {/* Glossy Effect */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-white/20 to-transparent 
                        rounded-full transform -translate-y-1/2"></div>
                    
                    {/* Inner Circle */}
                    <div className="w-[130px] h-[130px] md:w-[200px] md:h-[200px] rounded-full bg-[#121212] flex items-center justify-center
                        border-4 border-blue-900/30 relative">
                        
                        {/* Blue Liquid Effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-900/20 to-blue-600/20"></div>
                        
                        <AnimatePresence mode="wait" initial={false}>
                            {!showAnswer ? (
                                <motion.span
                                    key="eight"
                                    className="text-white font-bold relative z-10"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    style={{
                                        fontFamily: "Sevillana, sans-serif",
                                        fontSize: 'clamp(4rem, 8vw, 7rem)',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    8
                                </motion.span>
                            ) : (
                                <motion.div
                                    key="triangle"
                                    className="relative z-10"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg
                                        width="100"
                                        height="100"
                                        className="md:w-[150px] md:h-[150px]"
                                        viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ transform: 'rotate(180deg)' }}
                                    >
                                        <polygon 
                                            points="50,18 90,95 9,95" 
                                            fill="#121212"
                                            stroke="rgba(59, 130, 246, 0.5)"
                                            strokeWidth="2"
                                        />
                                        <text
                                            x="50%"
                                            y="17%"
                                            fontSize="10"
                                            className="md:text-[10px]"
                                            fill="white"
                                            textAnchor="middle"
                                            fontFamily="Arial, sans-serif"
                                            transform="rotate(180, 50, 50)"
                                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                                        >
                                            {phrase.split("\n").map((line, idx) => (
                                                <tspan
                                                    key={idx}
                                                    x="50%"
                                                    dy={`${idx === 0 ? 0 : 14}`}
                                                    className="md:dy-[14]"
                                                >
                                                    {line}
                                                </tspan>
                                            ))}
                                        </text>
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const result = await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                formRef.current,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID
            );

            console.log(result.text);
            // alert("Message sent successfully!");
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Failed to send message: ", error);
            // alert("Failed to send message, please try again later.");
        }

        setLoading(false);
    };


    return (
        <div
            className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
        >
            <motion.div
                variants={slideIn("left", "tween", 0.2, 1)}
                className='flex-[0.75] bg-[#0e1117] p-8 rounded-2xl'
            >
                <p className={`${styles.sectionSubText} text-[#ffd60a]`}>Get in touch</p>
                <h3 className={`${styles.sectionHeadText} text-white`}>Contact.</h3>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className='mt-12 flex flex-col gap-8'
                >
                    <label className='flex flex-col'>
                        <span className='text-white font-medium mb-4'>Your Name</span>
                        <input
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            placeholder="What's your good name?"
                            className='bg-primary py-4 px-6 placeholder:text-tertiary text-white rounded-lg outline-none border-none font-medium'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span className='text-white font-medium mb-4'>Your email</span>
                        <input
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder="What's your web address?"
                            className='bg-primary py-4 px-6 placeholder:text-tertiary text-white rounded-lg outline-none border-none font-medium'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span className='text-white font-medium mb-4'>Your Message</span>
                        <textarea
                            rows={7}
                            name='message'
                            value={form.message}
                            onChange={handleChange}
                            placeholder='What you want to say?'
                            className='bg-primary py-4 px-6 placeholder:text-tertiary text-white rounded-lg outline-none border-none font-medium'
                        />
                    </label>

                    <button
                        type='submit'
                        className={`bg-[#ffd60a] py-3 px-8 rounded-xl outline-none w-fit text-black font-bold shadow-md ${loading ? "cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </motion.div>

            <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] bg-[#0e1117] rounded-2xl p-8 flex flex-col items-center justify-center'
            >
                <p className="text-white text-center mb-8">
                    Not sure about reaching out? Give the Magic 8 Ball a shake!
                </p>

                <Magic8Ball />

            </motion.div>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");