import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import Newsletter from "./Newsletter/Newsletter";
import OurTopics from "./OurTopics/OurTopics";
import RecentBlogs from "./RecentBlogs/RecentBlogs";

const Home = () => {
    return (
        <section>
            <Banner />
            <AboutUs/>
            <OurTopics/>
            <RecentBlogs/>
            <Newsletter/>
        </section>
    );
};

export default Home;