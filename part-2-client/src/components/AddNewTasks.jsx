import React from 'react';
import AxiosInstance from '../Hook/AxiosInstance';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const AddNewTasks = ({ tasks, setTasks }) => {

    const handleCreateTask = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const dueDate = e.target.dueDate.value;

        const newTask = { name, title, description, dueDate }

        AxiosInstance.post('/tasks', newTask).then(data => {

            if (data.data.insertedId) {

                Swal.fire({
                    title: "Task create done!",
                    icon: " success",
                    draggable: true,
                    timer: 1800
                });

                newTask._id = data.data.insertedId;
                setTasks([...tasks, newTask]);

            }

        })



    }
    return (
        <div >
            <form onSubmit={handleCreateTask} className=" bg-gray-200 p-4 border-gray-100 rounded "   >

                <div>
                    <h3 className='font-bold text-xl  text-gray-500 m-3'>𝐀d𝐝 𝐍e𝐰 𝐓a𝐬k𝐬</h3>
                </div>

                <fieldset className="fieldset lg:flex justify-start gap-3   ml-3">
                    <div>
                        <label className="label font-bold text-black text-[14px] ">𝐍𝐚𝐦𝐞</label>
                        <input type="text" name='name' className="input" placeholder='𝐍𝐚𝐦𝐞' />

                    </div>
                    <div>
                        <label className="label font-bold text-black text-[14px] ">Tɪᴛʟᴇ</label>
                        <input type="text" name='title' className="input    " placeholder='Eɴᴛᴇʀ Tᴀsᴛ Tɪᴛʟᴇ ' />

                    </div>
                    <div>
                        <label className="label font-bold text-black text-[14px]">Description</label>
                        <input type="text" className="input  " name='description' placeholder='Eɴᴛᴇʀ Dᴇsᴄʀɪᴘᴛɪᴏɴ' />
                    </div>
                    <div>
                        <label className="label font-bold text-black text-[14px]">Due Date</label>
                        <input type="date" className="input" name='dueDate' />
                    </div>

                    <div>
                        <button className="btn btn-primary mt-5">Create New Task</button>
                    </div>

                </fieldset>

            </form>


        </div>





    );
};

export default AddNewTasks;