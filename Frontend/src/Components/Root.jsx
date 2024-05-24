import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import NodeFooter from './NodeFooter/NodeFooter';
const Root = () => {
    return (
        <div className='bg-white'>
            <Helmet>
              <title>Node</title>
            </Helmet>
            <Header/>
            <Outlet/>
            <NodeFooter/>
        </div>
    );
};

export default Root;