import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {v4 as uuid} from "uuid";
import TaskItem from "./components/TaskItem";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isNewTask, setIsNewTask] = useState();
  const tasksListRef = useRef();

  useEffect(()=>{
    if(isNewTask===true){

      tasksListRef.current.scrollTop = tasksListRef.current.scrollHeight;
    }
  }, [tasks])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setTask('');
    setIsNewTask(true);
    setTasks([...tasks, {id:uuid(), task}]);
  }
  const handleEdit = (updatedTask, index) => {
    const newTasks = [...tasks];
    newTasks[index].task = updatedTask;
    setIsNewTask(false);
    setTasks(newTasks);
  }
  const handleDelete = (index) => {
    const newTasks = tasks.filter((t,i)=>i!==index);
    setIsNewTask(false);
    setTasks(newTasks);
  }

  return (
    <div className="flex flex-col justify-center items-center text-center font-serif h-screen w-screen">
        <h2 className="text-5xl mb-4">React Tasky</h2>
      <div className="grid grid-rows-[auto,auto,1fr] bg-accent-content h-5/6 w-5/6 md:w-3/5 border-2 border-accent outline outline-offset-4 outline-primary rounded-md py-4 gap-4">
        <form onSubmit={handleSubmit} className="join flex justify-center px-6">
          <input type="text" className="join-item input input-bordered w-3/5" value={task} onChange={(e)=>setTask(e.target.value)}/>
          <button className="join-item btn">Create Task</button>
        </form>
        <div className="h-1 w-full bg-accent"></div>
        <div className="px-4 text-start overflow-auto flex flex-col gap-2" ref={tasksListRef}>
          <AnimatePresence>
            {tasks && tasks.map((t,i)=>{
              return <TaskItem key={t.id} task={t} index={i} handleEdit={handleEdit} handleDelete={handleDelete} tasksListLength={tasks.length}/>
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
export default App