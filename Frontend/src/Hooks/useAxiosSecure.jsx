import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Components/AuthProvider/AuthProvider';

const axiosSecure = axios.create({
    baseURL: 'https://node-blogs-lyart.vercel.app',
    withCredentials: true,
});

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext);  

    useEffect(() => {  
        axiosSecure.interceptors.response.use(
            (config) => {
                return config;
            },  (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    //console.log('Forbidden');
                    logOut();
                }
                
            }
        );
    }, []);
    return axiosSecure;
};

export default useAxiosSecure;