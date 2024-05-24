import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";  
import { Spinner } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://node-blogs-lyart.vercel.app/blogs/${id}`);
                return response.data;
            } catch (error) {
                //console.log('Error fetching blog data');
                return null;
            }
        }
    });

    const mutation = useMutation({
        mutationFn: (updatedBlog) => {
            return axios.patch(`https://node-blogs-lyart.vercel.app/update-blog/${id}`, updatedBlog);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBlog = {
            title: e.target.title.value,
            imgUrl: e.target.imgUrl.value,
            category: e.target.category.value,
            shortDescription: e.target.shortDescription.value,
            longDescription: e.target.longDescription.value
        };
        mutation.mutate(updatedBlog, {
            onSuccess: () => {
                navigate(`/blog/${id}`);
            },
            onError: () => {
                toast.error('Error updating blog');
            }
        });
    }
    return (
        <div>
            <Helmet>
                <title>Node - Update Blog</title>
            </Helmet>
            <Toaster position="top-right" />
            {isLoading && <Spinner aria-label="Center-aligned spinner example" />}
            {data && (
                <div>
                    
      <div className="min-h-[90vh] bg-main flex justify-center items-center p-4">
        <div className="container bg-white rounded-xl w-full lg:w-3/5 p-8 shadow-lg">
          <h2 className="text-2xl mb-6 font-semibold text-neutral-800 text-center font-space-7">
            Update Blog
          </h2>
          <form className="space-y-4 font-space-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-gray-600">Title</label>
              <input
                name="title"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                defaultValue={data.title}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Image URL</label>
              <input
                name="imgUrl"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                defaultValue={data.imgUrl}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Category</label>
              <select
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                defaultValue={data.category}
              >
                <option value="">Select a category</option>
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
                <option value="Information Retrieval">
                  Information Retrieval
                </option>
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
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Software Testing">Software Testing</option>
                <option value="User Experience">User Experience</option>
                <option value="Virtualization">Virtualization</option>
                <option value="VR">VR</option>
                <option value="WebDev">WebDev</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-600">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                required
                defaultValue={data.shortDescription}
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 text-gray-600">
                Long Description
              </label>
              <textarea
                name="longDescription"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="6"
                required
                defaultValue={data.longDescription}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition duration-300 font-space-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
                </div>
            )}
        </div>
    );
};

export default UpdateBlog;