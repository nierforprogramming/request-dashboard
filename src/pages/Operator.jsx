import { Suspense, useContext, useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import TasksContext from "../contexts/tasks.context";
import Error from "../components/Error";
import OperatorView from "../components/OperatorView";
import { operatorData } from "../assets";

const Operator = () => {
  const [operator, setOperator] = useState({});
  const { perOperatorTasks, error } = useContext(TasksContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const handleTasks = async () => {
      setOperator(operatorData[0]);
      const operatorTask = perOperatorTasks(operator);
      setTasks(operatorTask);
    };
    handleTasks();
  }, [operator, perOperatorTasks]);

  if (error) {
    return <Error error={error} />;
  }

  console.log(tasks);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <StatusCard />
        <OperatorView tasks={tasks} />
      </Suspense>
    </>
  );
};

export default Operator;
