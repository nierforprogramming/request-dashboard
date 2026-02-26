import { CiFilter } from "react-icons/ci";
import { filterByStatus } from "../assets";

const Filter = ({ filterText, handleFilter }) => {
  return (
    <>
      <div className="relative">
        <div className="bg-white rounded-sm px-4 cursor-pointer flex items-center space-x-2 py-2">
          <span>
            <CiFilter />
          </span>
          <button className="cursor-pointer font-semibold">{filterText}</button>
        </div>

        <div className="bg-white absolute py-4 top-12 -left-30 shadow-md">
          <ul className="ml-2">
            <div className="font-semibold  px-2">Filter by Status</div>
            {filterByStatus.map((status, index) => (
              <li
                onClick={(event) => handleFilter(event)}
                className={`hover:bg-gray-100 w-full px-2 ${status == filterText ? "font-semibold" : ""}`}
                key={index}
              >
                {status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Filter;
