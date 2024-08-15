import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TaskItem = ({task, index, handleDelete, handleEdit}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [newTask, setNewTask] = useState(task);
    const [isAlive, setIsAlive] = useState(true);
    const inputRef = useRef();
    useEffect(()=>{
        if(showEdit && inputRef.current){
            inputRef.current.focus();
        }
    })
    const variants = {
        open: {opacity: 1, y:0},
        closed: {opactity: 0, x:'-100%'}
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        handleEdit(newTask, index);
        setShowEdit(false);
    }
  return (
    <motion.div className="mb-2" initial={{opacity:0, y:'-50%'}} animate={isAlive?'open':'closed'} variants={variants} transition={{duration:0.3}}>
    <div className="flex justify-between mb-1 break-words">
        <p className="w-3/5">{index+1+`) `}{task.task}</p>
        <div className="flex gap-2 items-baseline">
            <button className="px-2 rounded-md bg-base-content text-accent font-bold" onClick={()=>setShowEdit(!showEdit)}>Edit</button>
            <button className="px-2 rounded-md bg-base-content text-accent font-bold" onClick={()=>{
                setIsAlive(false);
                setTimeout(()=>{
                    handleDelete(index);
                },300)
            }}>Dlt</button>
        </div>
    </div>
        {
            showEdit && <form onSubmit={handleUpdate} className="flex justify-between">
                <input type="text" className="border-2 border-primary bg-base-300 rounded-md w-3/5 px-2" ref={inputRef} value={newTask.task} onChange={(e)=>setNewTask(e.target.value)}/>
                <button type="submit" className="px-2 rounded-md bg-base-content text-accent font-bold">Submit</button>
            </form>
        }
        </motion.div>
  )
}
export default TaskItem