import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";


const RootElement = () => {
    return (
        <div className="max-w-6xl  mx-auto  ">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootElement;