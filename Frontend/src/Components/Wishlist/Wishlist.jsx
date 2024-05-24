import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Blog from '../Blog/Blog';
import { Spinner } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Wishlist = () => {
    const { user: loggedInUser } = useContext(AuthContext);

    const [wishlist, setWishlist] = useState(null);
    const [blogsInWishlist, setBlogsInWishlist] = useState([]);

    const axiosSecure = useAxiosSecure();

    const { isLoading } = useQuery({
        queryKey: ['wishlist', loggedInUser.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/wishlist/${loggedInUser.email}`)
            setWishlist(response.data);
        },
    });

    useEffect(() => {
        const fetchBlogsInWishlist = async () => {
            if (wishlist && wishlist.length > 0) {
                try {
                    const blogPromises = wishlist.map(async (blogId) => {
                        const response = await axios.get(`https://node-blogs-lyart.vercel.app/blogs/${blogId}`);
                        return response.data;
                    });
                    const fetchedBlogs = await Promise.all(blogPromises);
                    setBlogsInWishlist(fetchedBlogs);
                } catch (error) {
                    //console.log('Error fetching blog data:', error);
                    setBlogsInWishlist([]);
                }
            } else {
                setBlogsInWishlist([]);
            }
        };

        fetchBlogsInWishlist();
    }, [wishlist]);

    return (
        <div className='container mx-auto mt-10 mb-28 text-center'>
            <h2 className='font-space-7 text-2xl md:text-4xl text-black'>My Wishlist</h2>
            <ul className='mt-11 space-y-12'>
                {isLoading ? (
                    <div className="text-center">
                        <Spinner aria-label="Center-aligned spinner example" />
                    </div>
                ) : (
                    blogsInWishlist.length > 0 ? (
                        blogsInWishlist.map((blog) => (
                            <Blog 
                                key={blog._id} 
                                blog={blog} 
                                showWishlist={false} 
                                removeWish={true}
                                wishlist={wishlist}
                                setWishlist={setWishlist}
                            />
                        ))
                    ) : (
                        <li className='text-black text-opacity-70 font-space-4'>No blogs in wishlist</li>
                    )
                )}
            </ul>
        </div>
    );
};

export default Wishlist;
