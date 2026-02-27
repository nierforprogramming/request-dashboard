import { useContext } from "react";
import StatusCard from "../components/StatusCard";
import TasksContext from "../contexts/tasks.context";
import SupervisorView from "../components/SupervisorView";
import Error from "../components/Error";
import WorkLoad from "../components/WorkLoad";

const Supervisor = () => {
  const { filteredTasks, error, statusTasks } = useContext(TasksContext);
  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      <StatusCard statusTasks={statusTasks} />
      <WorkLoad />
      <SupervisorView tasks={filteredTasks} />
    </>
  );
};

export default Supervisor;
