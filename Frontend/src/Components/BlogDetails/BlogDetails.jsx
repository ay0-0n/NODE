import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useMutation } from "@tanstack/react-query";

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [owner, setOwner] = useState(null);
  const [readtime, setReadtime] = useState(0);
  const [publishDate, setPublishDate] = useState(null);
  const [comments, setComments] = useState([]);

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return axios.post("https://node-blogs-lyart.vercel.app/add-comment", newComment);
    },
    onSuccess: (data, newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    },
  });

  const { isLoading: isCommentLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://node-blogs-lyart.vercel.app/comments/${id}`
        );
        setComments(response.data);
        return response.data;
      } catch (error) {
        //console.error("Error fetching comments:", error);
        return [];
      }
    },
  });

  const addComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    if (!comment) {
      return;
    }
    const newComment = {
      blogId: blog?._id,
      email: user?.email,
      name: user?.displayName,
      photoUrl: user?.photoURL,
      text: comment,
      time: new Date().toLocaleString(),
    };
    if (user && blog) {
      mutation.mutate(newComment, {
        onSuccess: () => {
          e.target.reset();
        },
      });
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["Ablog", id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://node-blogs-lyart.vercel.app/blogs/${id}`
        );
        setBlog(response.data);
        return response.data;
      } catch (error) {
        //console.error("Error fetching blog data:", error);
        return null;
      }
    },
  });

  useEffect(() => {
    if (blog) {
      setReadtime(Math.ceil(parseInt(blog.length) / 1000));

      // Function to format the date string
      const formatDate = (dateString) => {
        const [datePart, timePart] = dateString.split(", ");
        const [day, month, year] = datePart.split("/").map(Number);
        const date = new Date(year, month - 1, day); // month is 0-indexed
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Intl.DateTimeFormat("en-GB", options).format(date);
      };

      const formattedDate = formatDate(blog.time);
      setPublishDate(formattedDate);
    }
  }, [blog]);

  const { isLoading: isOwnerLoading } = useQuery({
    queryKey: ["user", blog?.user],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://node-blogs-lyart.vercel.app/user/${blog?.user}`,{withCredentials: true}
        );
        setOwner(response.data);
        return response.data;
      } catch (error) {
        //console.error("Error fetching user data:", error);
        return null;
      }
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
      {blog && (
        <section className="w-[93%] md:w-[98%] lg:w-[70%] mx-auto">
          <div className="pt-2">
            <h2 className="text-4xl font-bold mb-4 text-black text-opacity-90 font-space-7">
              {blog.title}
            </h2>
            <p className="text-neutral-500 text-left w-[80%]">
              {blog.shortDescription}
            </p>
            {owner ? (
              <div className="flex justify-start py-6">
                <Avatar
                  img={owner.photoUrl}
                  size="md"
                  rounded
                  bordered
                  color="gray"
                >
                  <div className="space-y-1 font-medium dark:text-white ">
                    <div className="text-black font-space-4">{owner.name}</div>
                    <div className="text-gray-500 font-space-4">
                      {publishDate} . {readtime} min read
                    </div>
                    <div></div>
                  </div>
                </Avatar>
              </div>
            ) : (
              <Avatar rounded />
            )}
            <hr className="border-b-[1px] border-neutral-400 my-4" />
            <div></div>
            <img
              src={blog.imgUrl}
              alt={blog.title}
              className="w-full rounded-lg mb-4"
            />

            <div className="prose mb-8 text-black text-xl leading-10 text-opacity-90">
              {blog.longDescription}
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-black font-space-4">
              Comments
            </h3>
            <div className="flex flex-col space-y-4">
              {isCommentLoading && (
                <Spinner aria-label="Center-aligned spinner example" />
              )}
              {comments.length === 0 ? (
                <p className="text-gray-500 mb-10">No comments yet</p>
              ) : (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar
                        img={comment.photoUrl}
                        size="sm"
                        rounded
                        bordered
                        color="gray"
                      />
                      <div>
                        <p className="text-gray-700 font-space-4">
                          {comment.name}
                        </p>
                        <p className="text-gray-500 font-space-4">
                          {comment.time}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))
              )}
            </div>

            {(owner?.email === user?.email)? (
              <Link to={`/updateblog/${id}`}>
              <button className="bg-black w-full hover:shadow-xl text-white py-2 px-4 rounded-md font-space-4 font-semibold mb-12">
                Update Blog
              </button>
              </Link>
            ) : (
              <form
                className="flex flex-col space-y-4 mt-8"
                onSubmit={addComment}
              >
                <textarea
                  name="comment"
                  className="border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-1 text-black text-opacity-75 focus:ring-black"
                />
                <button
                  type="submit"
                  className="bg-black w-full hover:shadow-xl text-white py-2 px-4 rounded-md font-space-4 font-semibold mb-12"
                >
                  Submit Comment
                </button>
              </form>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;
