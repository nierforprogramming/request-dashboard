import { Suspense, useContext, useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import TasksContext from "../contexts/tasks.context";
import Error from "../components/Error";
import OperatorView from "../components/OperatorView";
import { operatorData } from "../assets";

const Operator = () => {
  const [operator, setOperator] = useState({});
  const { perOperatorTasks, perOperatorStatus, error } =
    useContext(TasksContext);
  const [tasks, setTasks] = useState([]);
  const [statusTasks, setStatusTasks] = useState([]);

  useEffect(() => {
    const handleTasks = () => {
      setOperator(operatorData[0]);
      const operatorTask = perOperatorTasks(operator);
      setTasks(operatorTask);
    };
    handleTasks();
  }, [operator, perOperatorTasks]);

  useEffect(() => {
    const handleStatus = () => {
      const operatorStatus = perOperatorStatus(operator);
      setStatusTasks(operatorStatus);
    };
    handleStatus();
  }, [operator, perOperatorStatus]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <StatusCard statusTasks={statusTasks} />
        <OperatorView tasks={tasks} />
      </Suspense>
    </>
  );
};

export default Operator;
