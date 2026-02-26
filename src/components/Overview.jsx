import SectionText from "./SectionText";
import TaskCard from "./TaskCard";

const Overview = () => {
  return (
    <>
      <SectionText text="Overview" />
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {["Pending", "Active", "Completed", "Cancelled"].map(
          (status, index) => (
            <TaskCard
              key={index}
              status={status}
              title="Keep React"
              content="React component library development"
              lastUpdate="Nov 15, 2023"
              agent="John Doe"
            />
          ),
        )}
      </div>
    </>
  );
};

export default Overview;
