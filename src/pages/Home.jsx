import { Suspense, useContext } from "react";
import Overview from "../components/Overview";
import StatusCard from "../components/StatusCard";
import TasksContext from "../contexts/tasks.context";

const Home = () => {
  const { tasks, error } = useContext(TasksContext);
  console.log(tasks);
  if (error) {
    console.log(error);

    return <p>{error}</p>;
  }
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <StatusCard />
        <Overview />
      </Suspense>
    </>
  );
};

export default Home;
