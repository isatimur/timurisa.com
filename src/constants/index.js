import {
    atconsult,
    atos,
    backend,
    spring,
    aws,
    be,
    carrent,
    creator,
    css,
    docker,
    ebt,
    figma,
    git,
    html,
    ids, java8,
    javascript,
    jobit, kotlin,
    kubanen,
    megafon,
    mobile,
    mongodb,
    nodejs,
    reactjs,
    redux,
    tailwind,
    threejs,
    tripguide,
    typescript,
    web,
    kubernetes,

} from "../assets";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "book",
        title: "My book"
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Java Expert",
        icon: spring,
        description: "Seasoned in Java development, building high-performance, concurrent applications."
    },
    {
        title: "Frontend Specialist",
        icon: reactjs,
        description: "Crafting intuitive user interfaces with React, enriching web interactions."
    },
    {
        title: "Database Architect",
        icon: mongodb,
        description: "Designing and managing scalable database solutions with both SQL and NoSQL technologies."
    },
    {

        title: "Cloud Solutions Architect",
        icon: kubernetes,
        description: "Implementing cloud-native architectures, focusing on AWS, GCP, and Azure platforms."
    },
];

const technologies = [
    {
      name: "Java",
      icon: java8,
    },
      {
          name: "Kotlin",
          icon: kotlin,
      },
    // {
    //     name: "HTML 5",
    //     icon: html,
    // },
    // {
    //     name: "CSS 3",
    //     icon: css,
    // },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Redux Toolkit",
        icon: redux,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "Three JS",
        icon: threejs,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "figma",
        icon: figma,
    },
    {
        name: "docker",
        icon: docker,
    },
];

const experiences = [
    {
        title: "Senior Developer | Software engineer | Specialist",
        company_name: "JSC Kuban Energo",
        icon: kubanen,
        iconBg: "#1c2f35",
        date: "March 2009 - June 2012",
        points: [
            "Began as a Junior Java Developer, advancing to Senior Specialist.",
            "Developed and maintained Java applications, starting with Java version 1.6.",
            "Worked extensively with XSLT, XML, Oracle databases, and XSQL.",
            "Involved in migrating Struts framework to Google Web Toolkit (GWT) for internal projects.",
            "Participated in the Golden 100 HR reserve program, aimed at preparing top talent for leadership roles."
        ],
    },
    {
        title: "CGS Duty manager | CGS Specialist",
        company_name: "Atos",
        icon: atos,
        iconBg: "#f9bb5a",
        date: "June 2012 - May 2014",
        points: [
            "Worked on critical IT infrastructure for the Sochi 2014 Olympics and Paralympics.",
            "Played a key role in third-level support, change management, configuration management, incident management, and problem management.",
            "Received two silver Accolade Awards for developing an integration script to improve package deployment and an automated Identity Management system."
        ],
    },
    {
        title: "Oracle Hyperion Reporting Engineer",
        company_name: "Megafon",
        icon: megafon,
        iconBg: "#1c2f35",
        date: "May 2014 - Sept 2014",
        points: [
            "Worked with Oracle Hyperion for advanced data reporting and OLAP cubes.",
            "Focused on Groovy language for scripting and automation within Oracle Hyperion environment.",
            "Sought internal transfer to Java Development team but was retained for expertise in current role."
        ],
    },
    {
        title: "Expert | Consultant | Software Engineer",
        company_name: "AT-Consulting",
        icon: atconsult,
        iconBg: "#f9bb5a",
        date: "Sept 2014 - Sept 2017",
        points: [
            "Contributed to the redevelopment of Sberbank.ru on the BackBase platform.",
            "Successfully led the integration of React widgets with Java backend, demonstrating full-stack development expertise.",
            "Played a pivotal role in solving a complex issue with the UC2GET component which was crucial for migrating the current Sberbank.ru to the new engine."
        ],
    },
    {
        title: "Head Architect | Tech Lead | Team Lead | Senior Java Developer",
        company_name: "Business Environment",
        icon: be,
        iconBg: "#1c2f35",
        date: "Sept 2017 - June 2022",
        points: [
            "Led the development of an educational platform using microservices architecture, leveraging Play Framework and MyBatis with Postgres.",
            "Spearheaded a team of 20, implementing numerous system integrations, including payment solutions and webhooks.",
            "Promoted to Team Leader, then Technical Leader, overseeing multiple project directions."
        ],
    },
    {
        title: "Solution Architect | Fullstack engineer",
        company_name: "EastBanc Technologies",
        icon: ebt,
        iconBg: "#1c2f35",
        date: "June 2022 - Present",
        points: [
            "Working on developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility."
        ],
    },
    {
        title: "Technical Leader / Solution Architect",
        company_name: "IDS, Remotely",
        icon: ids,
        iconBg: "#f9bb5a",
        date: "Nov 2022 - Present",
        points: [
            "Leading the development of a comprehensive billing system tailored for the betting and gambling industry, focusing on robustness and scalability.",
            "Implementing cutting-edge technologies including Kotlin, Spring Cloud API Gateway, MongoDB, and Kubernetes to ensure high performance and reliability.",
            "Collaborating with international teams to align development with business goals and user needs, ensuring effective solutions across various markets.",
            "Directing a team of skilled developers and engineers, fostering a culture of innovation, continuous learning, and quality-driven development.",
            "Overseeing the entire project lifecycle, from initial concept and design to deployment and post-launch support, ensuring timely delivery and customer satisfaction."
        ],
    },
];

const testimonials = [
    {
        testimonial:
            "I thought it was impossible to make a website as beautiful as our product, but Tim proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        testimonial:
            "I've never met a web developer who truly cares about their clients' success like Tim does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        testimonial:
            "After Timur developed website, our traffic increased by 50%. We can't thank them enough!",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
];

const projects = [
    {
        name: "Car Rent",
        description:
            "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient...",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "mongodb",
                color: "green-text-gradient",
            },
            {
                name: "tailwind",
                color: "pink-text-gradient",
            },
        ],
        image: carrent,
        source_code_link: "https://github.com/",
    },
    {
        name: "Job IT",
        description:
            "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available...",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "restapi",
                color: "green-text-gradient",
            },
            {
                name: "scss",
                color: "pink-text-gradient",
            },
        ],
        image: jobit,
        source_code_link: "https://github.com/",
    },
    {
        name: "Trip Guide",
        description:
            "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
        tags: [
            {
                name: "nextjs",
                color: "blue-text-gradient",
            },
            {
                name: "supabase",
                color: "green-text-gradient",
            },
            {
                name: "css",
                color: "pink-text-gradient",
            },
        ],
        image: tripguide,
        source_code_link: "https://github.com/",
    },
];

export {services, technologies, experiences, testimonials, projects};