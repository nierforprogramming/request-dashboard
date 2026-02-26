import { useContext } from "react";
import Filter from "./Filter";
import SectionText from "./SectionText";
import TaskCard from "./TaskCard";
import TasksContext from "../contexts/tasks.context";

const Overview = ({ tasks }) => {
  const { filterText, setFilterText } = useContext(TasksContext);
  const handleFilter = async (e) => {
    setFilterText(e.target.innerText);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <SectionText text="Overview" />
        <Filter filterText={filterText} handleFilter={handleFilter} />
      </div>
      <div className="grid mb-10 justify-center gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            status={task.status}
            title={task.title}
            content={task.content}
            lastUpdate={task.lastUpdate}
            agent={task.assignedTo}
          />
        ))}
      </div>
    </>
  );
};

export default Overview;
