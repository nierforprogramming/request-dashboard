import Card from "./Card";

const StatusCard = ({ statusTasks }) => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {statusTasks.map((status, index) => (
        <Card key={index} status={status.status} value={status.value || 0} />
      ))}
    </div>
  );
};

export default StatusCard;
