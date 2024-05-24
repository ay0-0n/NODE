import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import Blog from '../../Blog/Blog';
import { useState, useEffect } from 'react';

// Function to parse the date string "DD/MM/YYYY, HH:MM:SS" to a Date object
const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
};

const RecentBlogs = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['RecentBlogs'],
        queryFn: async () => {
            try {
                const response = await axios.get('https://node-blogs-lyart.vercel.app/blogs');
                //console.log("Fetched data:", response.data);
                return response.data;
            } catch (error) {
                //console.log('Error fetching data');
                return [];
            }
        }
    });

    const [sortedData, setSortedData] = useState([]);
    useEffect(() => {
        if (data) {
            const sorted = [...data]
                .filter(blog => parseDate(blog.time).toString() !== "Invalid Date")
                .sort((a, b) => parseDate(b.time) - parseDate(a.time))
                .slice(0, 6);

            //console.log("Sorted data:", sorted);
            setSortedData(sorted);
        }
    }, [data]);

    return (
        <div className='container mx-auto my-28 text-center'>
            <h2 className='font-space-7 text-2xl md:text-4xl text-black'>Recent Blogs</h2>
            <ul className='mt-11 space-y-12'>
                {isLoading && (
                    <div className="text-center">
                        <Spinner aria-label="Center-aligned spinner example" />
                    </div>
                )}
                {sortedData && sortedData.map((blog) => (
                    <Blog key={blog._id} blog={blog} showWishlist={true} removeWish={false} />
                ))}
            </ul>
        </div>
    );
}

export default RecentBlogs;
