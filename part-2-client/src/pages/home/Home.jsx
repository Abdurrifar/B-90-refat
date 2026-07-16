import { useEffect, useState } from "react";
import AddNewTasks from "../../components/AddNewTasks";
import Tasks from "../../components/Tasks";
import AxiosInstance from "../../Hook/AxiosInstance";


const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        AxiosInstance.get("/tasks").then(res => {
            setTasks(res.data);
        });
    }, []);

    return (
        <div >



            <AddNewTasks tasks={tasks} setTasks={setTasks} />
            <Tasks tasks={tasks} setTasks={setTasks} />

        </div>
    );
};

export default Home;