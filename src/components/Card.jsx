import { statusIcon } from "../assets";

const Card = ({ status, value }) => {
  const Icon = statusIcon[status];
  return (
    <div
      id="card"
      className="bg-white shadow-sm w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-sm"
    >
      <div className="card-container space-y-3 p-6">
        <div className="bg-blue-400/30 text-blue-600 w-fit p-3 rounded-full">
          {Icon && <Icon className="text-2xl" />}
        </div>

        <div className="text-gray-600 font-semibold">
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
