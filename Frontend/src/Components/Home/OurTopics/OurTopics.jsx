import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const OurTopics = () => {
    const topics1 = ['Blockchain', 'AI', 'WebDev', 'Data Science', 'Cybersecurity', 'Quantum Computing', 'Software Engineering', 'Database Management', 'Operating Systems', 'Computer Networks'];
    const topics2 = ['ML', 'Cloud', 'IOT', 'AR', 'VR', 'Big Data', 'DevOps', 'Algorithm Design', 'Data Structures', 'Computer Graphics'];

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    return (
        <div className='text-center bg-main py-20 mt-16 w-[100vw] md:w-full'>
        <div className='text-center container mx-auto max-w-[90%]'>
            <h2 className='font-space-7 text-2xl md:text-4xl mb-5 text-black'>Find Incredible Topics</h2>
            <Slider {...settings}>
                {topics1.map((topic, index) => (
                    <motion.div key={index}>
                        <h3 className='bg-white m-2 md:m-6 rounded-xl border-[1px] border-black font-space-4 text-sm h-[65px] flex justify-center items-center'>
                            <div className='border-[1px] border-black w-full mx-[2px] rounded-xl h-[60px] flex justify-center items-center text-black' >
                            {topic}
                            </div>
                        </h3>
                    </motion.div>
                ))}
            </Slider>
            <Slider {...settings}>
                {topics2.map((topic, index) => (
                    <motion.div key={index}>
                    <h3 className='bg-white m-2 md:m-6 rounded-xl border-[1px] border-black font-space-4 text-sm h-[65px] flex justify-center items-center'>
                        <div className='border-[1px] border-black w-full mx-[2px] rounded-xl h-[60px] flex justify-center items-center text-black' >
                        {topic}
                        </div>
                    </h3>
                </motion.div>
                ))}
            </Slider>
        </div>
        </div>
    );
};

export default OurTopics;
