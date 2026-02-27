import { useContext, useEffect, useMemo } from "react";
import Filter from "./Filter";
import SectionText from "./SectionText";
import TaskCard from "./TaskCard";
import TasksContext from "../contexts/tasks.context";
import { roleData } from "../assets";

const OperatorView = ({ tasks }) => {
  const { filterText, role, setRole, setFilterText } = useContext(TasksContext);
  const handleFilter = async (e) => {
    setFilterText(e.target.innerText);
  };

  useEffect(() => {
    setRole(roleData[1]);
  }, [setRole]);

  const displayTasks = useMemo(() => {
    if (filterText === "All Tasks") return tasks;
    return tasks.filter((task) => task.status === filterText);
  }, [tasks, filterText]);

  return (
    <>
      <div className="flex justify-between items-center">
        <SectionText text="Operator View" />
        <Filter filterText={filterText} handleFilter={handleFilter} />
      </div>
      <div className="grid mb-10 justify-center gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayTasks.map((task) => (
          <TaskCard
            key={task.id}
            status={task.status}
            title={task.title}
            content={task.content}
            lastUpdate={task.lastUpdate}
            agent={task.assignedTo}
            role={role}
          />
        ))}
      </div>
    </>
  );
};

export default OperatorView;
