import Lottie from "lottie-react";
import node from "../../../Assets/node.json";
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'


const Banner = () => {
    return (
        <div className="flex flex-row justify-between">
            <div className="w-1/2 bg-main flex justify-center items-center flex-col space-y-3">
                <h1 className="font-space-7 text-5xl text-black">
                <Typewriter
                        words={['NODE']}
                        loop={0}
                        cursor
                        cursorStyle='_'
                        typeSpeed={300}
                        deleteSpeed={50}
                        delaySpeed={5000}
                    />
                </h1>
                <Link  to="/all-blogs">
                <button className="border-black text-black border-[1px] px-4 py-2 rounded-lg hover:shadow-lg shadow-black">EXPLORE BLOGS</button></Link>
            </div>
            <div className="w-1/2">
                <Lottie animationData={node} />
            </div>
        </div>
    );
};

export default Banner;