import { FaRegClock } from "react-icons/fa6";

const Card = ({ icon, status = "Pending", value = 12 }) => {
  return (
    <div id="card" className="bg-white w-xs rounded-sm">
      <div className="card-container space-y-3 p-6">
        <div className="bg-blue-400/30 text-blue-600 w-fit p-3 rounded-full">
          <FaRegClock className="text-2xl" />
        </div>

        <div className="text-gray-600">
          <p>{status}</p>
        </div>

        <div className="text-3xl font-bold">
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
