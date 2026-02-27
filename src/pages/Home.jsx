import { useContext } from "react";
import Overview from "../components/Overview";
import StatusCard from "../components/StatusCard";
import TasksContext from "../contexts/tasks.context";
import Error from "../components/Error";

const Home = () => {
  const { filteredTasks, error, statusTasks } = useContext(TasksContext);
  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      <StatusCard statusTasks={statusTasks} />
      <Overview tasks={filteredTasks} />
    </>
  );
};

export default Home;
