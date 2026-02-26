import SectionText from "./SectionText";
import TaskCard from "./TaskCard";

const Overview = ({ tasks }) => {
  return (
    <>
      <SectionText text="Overview" />
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
