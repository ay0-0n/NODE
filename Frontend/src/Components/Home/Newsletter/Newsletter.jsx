import Lottie from "lottie-react";
import News from "../../../Assets/News.json";
import { Toaster, toast } from 'react-hot-toast';
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Newsletter = () => {
    const {user} = useContext(AuthContext);
    const handleSubscirbe = () => { 
        if (!user) {
            toast.error('You need to login first');
            return;
        }
        toast.success('Subscribed successfully');
    }

  return (
    <div className="bg-gray-100 dark:bg-neutral-800 py-12">
        <Toaster position="top-right" />
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center">
        <div className="md:w-1/2 p-6 flex flex-col">
          <div>
            <h2 className="text-3xl font-bold text-center md:text-left mb-4 font-space-7 text-black">
            Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Stay updated with the latest tech trends, exclusive offers, and
            insider tips by subscribing to our newsletter. Join our community
            of fellow Bloggers and embark on unforgettable journeys with
            NODE.
            </p>
          </div>
          <button onClick={handleSubscirbe} className="border-black border-[1px] text-black px-4 py-2 hover:shadow-xl rounded-sm mt-4 font-space-4">
            Subscribe Now
          </button>
        </div>
        <div className="md:w-1/2 mr-20 md:mr-0 p-6">
          <Lottie animationData={News} />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
