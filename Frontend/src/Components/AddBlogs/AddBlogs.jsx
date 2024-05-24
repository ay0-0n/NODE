import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: (newBlog) => {
      return axios.post("https://node-blogs-lyart.vercel.app/add-blog", newBlog);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title: e.target.title.value,
      imgUrl: e.target.imgUrl.value,
      category: e.target.category.value,
      shortDescription: e.target.shortDescription.value,
      longDescription: e.target.longDescription.value,
      time: new Date().toLocaleString(),
      length:
        `${e.target.title.value}${e.target.shortDescription.value}${e.target.longDescription.value}`
          .length,
      user: user?.email || "Anonymous",
    };

    //console.log("Submitting blog:", newBlog);

    if (user) {
      mutation.mutate(newBlog, {
        onSuccess: () => {
          toast.success("Blog added successfully");
          e.target.reset();
        },
        onError: (error) => {
          setError(
            error.response?.data?.error ||
              "An error occurred while adding the blog."
          );
        },
      });
    } else {
      setError("Please log in to add a blog");
    }
  };

  return (
    <>
      <Helmet>
        <title>Node - Add Blog</title>
      </Helmet>
      <Toaster position="top-right" />
      <div className="min-h-[90vh] bg-main flex justify-center items-center p-4">
        <div className="container bg-white rounded-xl w-full lg:w-3/5 p-8 shadow-lg">
          <h2 className="text-2xl mb-6 font-semibold text-neutral-800 text-center font-space-7">
            Add a Blog
          </h2>
          <form className="space-y-4 font-space-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-gray-600">Title</label>
              <input
                name="title"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Image URL</label>
              <input
                name="imgUrl"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Category</label>
              <select
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
              ></textarea>
            </div>
            {error && (
              <p className="text-center text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition duration-300 font-space-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
