import { Suspense, useContext } from "react";
import StatusCard from "../components/StatusCard";
import TasksContext from "../contexts/tasks.context";
import SupervisorView from "../components/SupervisorView";
import Error from "../components/Error";

const Supervisor = () => {
  const { filteredTasks, error } = useContext(TasksContext);
  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <StatusCard />
        <SupervisorView tasks={filteredTasks} />
      </Suspense>
    </>
  );
};

export default Supervisor;
