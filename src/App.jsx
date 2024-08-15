import { useEffect, useRef, useState } from "react"
import TaskItem from "./components/TaskItem";
import { AnimatePresence } from "framer-motion";
import {v4 as uuid } from 'uuid';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isNewTask, setIsNewTask] = useState();
  const taskListRef = useRef();
  useEffect(()=>{
    if(isNewTask==true)
    taskListRef.current.scrollTop = taskListRef.current.scrollHeight;
  },[tasks])
  const createTask = (e) => {
    e.preventDefault();
    setTask('');
    setIsNewTask(true);
    setTasks([...tasks, {task:task, id:uuid()}]);
  }
  const handleEdit = (newTask, index) => {
    const newTasks = [...tasks];
    newTasks[index].task = newTask;
    setIsNewTask(false);
    setTasks(newTasks);
  }
  const handleDelete = (index) => {
    const newTasks = tasks.filter((t,i)=>i!=index);
    setIsNewTask(false);
    setTasks(newTasks);
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h3 className="text-5xl font-extrabold mb-1">Tasky</h3>
      <div className="task-container grid grid-rows-[auto,1fr] gap-4 h-5/6 w-3/5 min-w-80 py-4 border-2 outline outline-offset-2 outline-base-content rounded-md">
      <form onSubmit={createTask} className="join flex justify-center">
        <input type="text" className="w-3/5 min-w-48 input input-bordered join-item text-accent-content" value={task} onChange={(e)=>setTask(e.target.value)}/>
        <button className="join-item btn min-w-20" type="submit">Create Task</button>
      </form>
      <div className="tasks-container px-4 overflow-auto scroll-smooth" ref={taskListRef}>
      <AnimatePresence>
        {
          tasks.map((t, index)=>{
            return <TaskItem task={t} index={index} handleDelete={handleDelete} handleEdit={handleEdit} key={t.id}/>
          })
        }
        </AnimatePresence>
      </div>
      </div>
    </div>
  )
}
export default App