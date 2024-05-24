import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutUs = () => {
    const [ref, inView] = useInView({
        triggerOnce: false, // Trigger animation only once
        threshold: 0.5, // Animation starts when 50% of the component is in view
    });

    return (
        <div className='container mx-auto mt-28'>
            <div ref={ref} className="about-us-container">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className="about-us-header text-center font-space-7 text-2xl md:text-4xl mb-5 text-black"
            >
                Welcome to NODE
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="about-us-description text-center text-lg font-space-4 mb-10 text-gray-600"
            >
                NODE is a tech blog website where people can share their blogs. We are a passionate team dedicated to making technology accessible and understandable to everyone. With a blend of creativity and technology, we strive to exceed expectations and leave a positive impact on the world.
            </motion.p>
        </div>
        </div>
    );
};

export default AboutUs;
