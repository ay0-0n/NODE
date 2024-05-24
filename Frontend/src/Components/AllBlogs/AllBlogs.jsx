import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Blog from "../Blog/Blog";
import { Spinner } from "flowbite-react";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["allblogs"],
    queryFn: async () => {
      try {
        const response = await axios.get(`https://node-blogs-lyart.vercel.app/allblogs`);
        setBlogs(response.data);
        return response.data;
      } catch (error) {
        //console.log("Error fetching user data");
        return null;
      }
    },
  });

  const filterBlogs = (blog) => {
    if (selectedCategory && blog.category !== selectedCategory) {
      return false;
    }
    if (
      searchTerm &&
      !blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="container mx-auto mt-10 mb-28 text-center">
      <h2 className="font-space-7 text-2xl md:text-4xl text-black">
        All Blogs
      </h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="AI">AI</option>
            <option value="Algorithm Design">Algorithm Design</option>
            <option value="AR">AR</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Big Data">Big Data</option>
            <option value="Bioinformatics">Bioinformatics</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Cloud">Cloud</option>
            <option value="Computer Graphics">Computer Graphics</option>
            <option value="Computer Networks">Computer Networks</option>
            <option value="Cryptography">Cryptography</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Data Science">Data Science</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Database Management">Database Management</option>
            <option value="DevOps">DevOps</option>
            <option value="Embedded Systems">Embedded Systems</option>
            <option value="Game Development">Game Development</option>
            <option value="Human-Computer Interaction">
              Human-Computer Interaction
            </option>
            <option value="IOT">IOT</option>
            <option value="Information Retrieval">Information Retrieval</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Natural Language Processing">
              Natural Language Processing
            </option>
            <option value="Operating Systems">Operating Systems</option>
            <option value="Parallel Computing">Parallel Computing</option>
            <option value="Quantum Computing">Quantum Computing</option>
            <option value="Robotics">Robotics</option>
            <option value="Semantic Web">Semantic Web</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Software Testing">Software Testing</option>
            <option value="User Experience">User Experience</option>
            <option value="Virtualization">Virtualization</option>
            <option value="VR">VR</option>
            <option value="WebDev">WebDev</option>
          </select>
        </div>
      </div>
      <ul className="mt-11 space-y-12">
        {isLoading && (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        )}
        {blogs &&
          blogs
            .filter(filterBlogs)
            .map((blog) => (
              <Blog
                key={blog._id}
                blog={blog}
                showWishlist={true}
                removeWish={false}
              />
            ))}
      </ul>
    </div>
  );
};

export default AllBlogs;
