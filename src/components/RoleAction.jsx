import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const RoleAction = ({ permissions }) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (event) => {
    console.log(event);
  };
  return (
    <>
      <div className="relative w-50">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="bg-white rounded-sm px-4 cursor-pointer flex items-center space-x-2 py-2"
        >
          <button className="cursor-pointer  hover:bg-gray-200 p-2 rounded-sm font-semibold">
            <BsThreeDots />
          </button>
        </div>

        {open && (
          <div className="bg-white absolute py-4 top-12 w-full shadow-md">
            <ul className="ml-2">
              <div className="font-semibold  px-2">Project Action</div>
              {permissions.map((action, index) => (
                <li
                  onClick={(event) => {
                    handleAction(event);
                    setOpen(false);
                  }}
                  className={`hover:bg-gray-100 w-full cursor-pointer px-2`}
                  key={index}
                >
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default RoleAction;
