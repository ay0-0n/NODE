import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DataType, Table } from 'ka-table';
import { SortingMode } from 'ka-table/enums';
import './featuredtable.css';

const FeaturedBlogs = () => {
  const [data, setData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);

  const { isLoading } = useQuery({
    queryKey: ["allblogs"],
    queryFn: async () => {
      try {
        const response = await axios.get(`https://node-blogs-lyart.vercel.app/allblogs`);
        setData(response.data);
        return response.data;
      } catch (error) {
        //console.log("Error fetching user data");
        return [];
      }
    },
  });

  const getDiv = async (email) => {
    try {
      const response = await axios.get(`https://node-blogs-lyart.vercel.app/user/${email}`,{withCredentials: true});
      const name = response.data.name; 
      return name;
    } catch (error) {
      //console.log("Error fetching user data");
      return null;
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      const fetchData = async () => {
        const mappedData = await Promise.all(
          data
            .sort((a, b) => b.length - a.length) // Sort by length descending
            .slice(0, 10) // Take top 10 entries
            .map(async (item, index) => ({
              sl: index + 1,
              title: item.title,
              user: await getDiv(item.user),
              length: item.length,
            }))
        );
        //console.log(mappedData);
        setTransformedData(mappedData);
      };
      fetchData();
    }
  }, [data]);
  


  const columns = [
    {
      dataType: DataType.Number,
      key: 'sl',
      title: 'Sl',
      style: { width: 90, textAlign: 'center', fontWeight: 'bold' }, // Example styles
    },
    {
      dataType: DataType.String,
      key: 'title',
      title: 'Blog Title',
      style: { width: 200 },
    },
    {
      dataType: DataType.String,
      key: 'user',
      title: 'User',
      style: { width: 150 },
    },
  ];

  return (
    <div className="container mx-auto mt-10 mb-28 text-center">
      <h2 className="font-space-7 text-2xl md:text-4xl text-black">
        Featured Blogs
      </h2>
      <div className="mt-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            columns={columns}
            data={transformedData}
            rowKeyField={'sl'}
            sortingMode={SortingMode.Single}          
          />
        )}
      </div>
    </div>
  );
};

export default FeaturedBlogs;
