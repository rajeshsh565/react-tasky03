import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const TaskItem = ({ task, index, handleEdit, handleDelete, tasksListLength }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.task);
  const editInputRef = useRef();
  useEffect(() => {
    if (showEdit && editInputRef.current) {
      editInputRef.current.focus();
    }
  });
  const updateTask = () => {
    handleEdit(updatedTask, index);
    setShowEdit(false);
  };
  return (
    <motion.div
      initial={{ y: "-50%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between">
        <p className="max-w-48 break-words">
          <span className="text-primary">{`${index + 1 + ") "}`}</span>
          {task.task}
        </p>
        <div className="flex gap-1 items-baseline">
          <button
            className="px-2 bg-success text-success-content rounded-md font-bold"
            onClick={() => setShowEdit(!showEdit)}
          >
            Edit
          </button>
          <button
            className="px-2 bg-error text-error-content rounded-md font-bold"
            onClick={() => handleDelete(index)}
          >
            Dlt
          </button>
        </div>
      </div>
      {showEdit && (
        <form onSubmit={updateTask} className={`flex justify-between mt-2 ${index===(tasksListLength-1) && 'mb-2'}`}>
          <input
            type="text"
            className="max-w-48 px-2 rounded-md"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
            ref={editInputRef}
          />
          <button className="px-2 bg-accent text-accent-content rounded-md font-bold">
            Update
          </button>
        </form>
      )}
    </motion.div>
  );
};
export default TaskItem;
