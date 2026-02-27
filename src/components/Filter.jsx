import { CiFilter } from "react-icons/ci";
import { filterByStatus } from "../assets";
import { useState } from "react";

const Filter = ({ filterText, handleFilter }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative w-50 z-49">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="bg-white rounded-sm px-4 cursor-pointer flex items-center space-x-2 py-2"
        >
          <span>
            <CiFilter />
          </span>
          <button className="cursor-pointer font-semibold">{filterText}</button>
        </div>

        {open && (
          <div className="bg-white absolute py-4 top-12 w-full shadow-md">
            <ul className="ml-2">
              <div className="font-semibold  px-2">Filter by Status</div>
              {filterByStatus.map((status) => (
                <li
                  onClick={(event) => {
                    handleFilter(event);
                    setOpen(false);
                  }}
                  className={`hover:bg-gray-100 w-full cursor-pointer px-2 ${status == filterText ? "font-semibold" : ""}`}
                  key={status}
                >
                  {status}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
