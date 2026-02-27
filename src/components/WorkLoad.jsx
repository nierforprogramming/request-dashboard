import React, { useContext } from "react";
import TasksContext from "../contexts/tasks.context";
import SectionText from "./SectionText";
import Card from "./Card";

const WorkLoad = () => {
  const { getActiveWorkLoad } = useContext(TasksContext);
  const workloads = getActiveWorkLoad();
  return (
    <>
      <SectionText text="Workload Summary" />
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {workloads.map((workload) => (
          <Card
            className="font-semibold text-xl"
            key={workload.name}
            status="Active"
            value={`${workload.name} ${workload.active}`}
          />
        ))}
      </div>
    </>
  );
};

export default WorkLoad;
