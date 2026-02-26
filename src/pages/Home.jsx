import { Suspense, useContext } from "react";
import Overview from "../components/Overview";
import StatusCard from "../components/StatusCard";
import TasksContext from "../contexts/tasks.context";
import Error from "../components/Error";

const Home = () => {
  const { tasks, error } = useContext(TasksContext);
  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <StatusCard />
        <Overview tasks={tasks} />
      </Suspense>
    </>
  );
};

export default Home;
