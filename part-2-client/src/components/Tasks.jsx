import { useState } from "react";
import AxiosInstance from "../Hook/AxiosInstance";


const Tasks = ({ tasks, setTasks }) => {
    const [selectedTask, setSelectedTask] = useState(null);



    // to pass data haswal button 
    const handleEditButton = (task) => {
        setSelectedTask(task);


        document.getElementById("my_modal_5").showModal();
    };

    // update button--------------------------------------------

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (!selectedTask) {
            console.log("No task selected");
            return;
        }

        const form = e.target;
        const name = e.target.name.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const dueDate = e.target.dueDate.value;
        const newTask = { name, title, description, dueDate }
        console.log(selectedTask);
        console.log(selectedTask._id);
        // console.log(tasks.data._id)

        const res = await AxiosInstance.patch(
            `/tasks/${selectedTask._id}`,
            newTask
        );

        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            setTasks(prev =>
                prev.map(task =>
                    task._id === selectedTask._id
                        ? { ...task, ...newTask }
                        : task
                )
            );
            document.getElementById("my_modal_5").close();

            setSelectedTask(null);
            e.target.reset();

        }
    }

    return (

        <div className="bg-gray-200 mt-2 border-gray-100 rounded p-4 ">

            <div>
                <h3 className='font-bold text-xl  text-gray-500 ml-3 '>  𝐓a𝐬k𝐬</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head -------------------------------------------------*/}
                    <thead>
                        <tr className=' font-family: " Archivo Black", sans-serif; "font-bold text-[15px]  text-black'>
                            <th>
                                No.
                            </th>
                            <th>𝐍𝐚𝐦𝐞</th>
                            <th>Tɪᴛʟᴇ</th>
                            <th>Details</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map(({ _id, name, title, description, dueDate, status, location }, index) => <tr key={_id}>
                                <th  >
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{name}</div>
                                            <div className="text-sm opacity-50">{location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {title}
                                </td>
                                <td>{description}</td>
                                <th>
                                    <p>{dueDate}</p>
                                </th>
                                <th>
                                    <select

                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </th>
                                <th>

                                    <button onClick={() =>
                                        handleEditButton({
                                            _id,
                                            name,
                                            title,
                                            description,
                                            dueDate,
                                            status,
                                            location,
                                        })} className="btn btn-primary">Edit</button>
                                </th>
                                <th>
                                    <a className="btn btn-warning">Delete</a>
                                </th>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


            {/* modal--------------- */}
            <dialog id="my_modal_5" className="modal modal-bottom md:modal-middle">
                <div className="modal-box">

                    <div className="modal-action">

                        <form onSubmit={handleUpdate} className=" bg-gray-200 p-4 border-gray-100 rounded  mx-0-auto   text-xl font-bold w-120 "   >

                            <div>
                                <h3 className='font-bold text-xl  text-gray-500 m-3'>Edit  𝐓a𝐬k𝐬</h3>
                            </div>

                            <fieldset className="fieldset  gap-3   ml-3">
                                <div>
                                    <label className="label font-bold text-black text-[14px] ">𝐍𝐚𝐦𝐞</label>
                                    <input className="h-[25px]  ml-2 border border-2px-solid rounded p-2 
                                          "
                                        type="text"
                                        name="name"
                                        defaultValue={selectedTask?.name}
                                    />

                                </div>
                                <div>
                                    <label className="label font-bold text-black text-[14px] ">Tɪᴛʟᴇ</label>
                                    <input className="h-[25px] ml-2 border border-2px-solid
                                         rounded p-2 "
                                        type="text"
                                        name="title"
                                        defaultValue={selectedTask?.title}
                                    />

                                </div>
                                <div>
                                    <label className="label font-bold text-black text-[14px]">Description:</label>
                                    <input className="h-[25px] w-80 ml-2 border border-2px-solid
                                          rounded p-2 "
                                        type="text"
                                        name="description"
                                        defaultValue={selectedTask?.description}
                                    />

                                </div>
                                <div>
                                    <label className="label font-bold text-black text-[14px]">Due Date</label>
                                    <input className="h-[25px] ml-2 border border-2px-solid
                                        rounded p-2  "
                                        type="date"
                                        name="dueDate"
                                        defaultValue={selectedTask?.dueDate.slice(0, 10)}
                                    />
                                </div>

                                <div>
                                    <button type="submit" className="btn btn-primary mt-5">Update Task</button>
                                </div>

                            </fieldset>

                            <button
                                type="button"
                                className="btn"
                                onClick={() => document.getElementById("my_modal_5").close()}
                            >
                                Close
                            </button>
                        </form>


                    </div>
                </div>
            </dialog >
        </div >
    );
};

export default Tasks;