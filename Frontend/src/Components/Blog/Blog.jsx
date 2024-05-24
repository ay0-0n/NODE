import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Spinner } from 'flowbite-react';
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { Tooltip } from 'react-tooltip'
import { useContext } from 'react';
import { CiBookmarkRemove } from "react-icons/ci";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
AOS.init();


import toast, { Toaster } from 'react-hot-toast';
// import { FaRegComment } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Blog = ({ blog, showWishlist, removeWish, wishlist, setWishlist}) => {
    const { user: loggedInUser } = useContext(AuthContext);

    const { _id, title, imgUrl, category, shortDescription, user, time } = blog;

    const { data: usr, isLoading: isUserLoading } = useQuery({
        queryKey: ['user', user],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://node-blogs-lyart.vercel.app/user/${user}`,{withCredentials: true});
                return response.data;
            } catch (error) {
                //console.log('Error fetching user data');
                return null;
            }
        }
    });

    const addToWishlist = async () => {
        try {
            // Extract email from loggedInUser object
            const email = loggedInUser.email;
            // Make POST request to add to wishlist
            await axios.post(`https://node-blogs-lyart.vercel.app/wishlist/${_id}/${email}`);
            toast.success('Added to wishlist');
        } catch (error) {
            //console.log('Error adding to wishlist');
        }
    };

    const removeFromWishlist = async () => {
        try {
            // Extract email from loggedInUser object
            const email = loggedInUser.email;
            // Make DELETE request to remove from wishlist
            await axios.patch(`https://node-blogs-lyart.vercel.app/wishlist/${_id}/${email}`);
            // Update the wishlist state
            setWishlist(wishlist.filter((id) => id !== _id));
            toast.success('Removed from wishlist');
        } catch (error) {
            //console.log('Error removing from wishlist');
        }
    }

    return (
        <div className='blog-card max-w-[80%] mx-auto' data-aos="fade-up">
            <Toaster position='top-right'/>
            {isUserLoading && (
                <div className="text-center">
                    <Spinner aria-label="Center-aligned spinner example" />
                </div>
            )}

            <div className="bg-white flex flex-row border-[1px] rounded-xl shadow-lg border-black p-5 gap-9">
                <div className='w-[70%] flex flex-col space-y-5'>
                    <div className='flex flex-row items-center gap-2'>
                        {usr && <img src={usr.photoUrl} className='rounded-full h-8 w-8'/> }
                        <p className='text-base text-black font-space-4'>{usr && usr.name}</p>
                        <p className='text-base text-gray-600 font-space-4'>.{time}</p>
                    </div>
                    <h3 className='text-2xl text-left font-space-7 text-black'>{title}</h3>
                    <p className='text-lg text-left font-space-4 text-gray-600'>{shortDescription}</p>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row gap-2'>
                            <h3 className='text-black bg-neutral-200 p-2 rounded-xl'>{category}</h3>
                        </div>
                        <div className="flex gap-2">
                            <Link to={`/blog/${_id}`}><button className='bg-white text-black border-[1px] rounded-xl border-black  font-space-4 p-2 hover:shadow-lg hover:shadow-black'>Details</button></Link>
                            {
                                showWishlist && (
                                    <button className='rounded-xl p-2 text-black' onClick={addToWishlist}>
                                        <MdOutlineBookmarkAdd size={25} data-tooltip-id="my-tool"/> {/* Heart icon */}
                                        <Tooltip id="my-tool">
                                            Add to Wishlist
                                        </Tooltip>
                                    </button>
                                )
                            }
                            {
                                removeWish && (
                                    <button className='rounded-xl p-2 text-black' onClick={removeFromWishlist}>
                                        <CiBookmarkRemove size={25} data-tooltip-id="my-remove"/> {/* Heart icon */}
                                        <Tooltip id="my-remove">
                                            Remove From Wishlist
                                        </Tooltip>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
                
                
                    <PhotoProvider>
                        <PhotoView src={imgUrl}>
                            <div className='w-[30%] flex justify-center items-center'>
                            <img src={imgUrl} alt={title} className='w-full' />
                            </div>
                        </PhotoView>
                    </PhotoProvider>
                
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
    }).isRequired,
    showWishlist: PropTypes.bool,
    removeWish: PropTypes.bool,
    wishlist: PropTypes.array,
    setWishlist: PropTypes.func
};

export default Blog;
