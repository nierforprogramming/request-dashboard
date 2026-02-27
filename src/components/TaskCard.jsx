import React from "react";
import { MdUpdate } from "react-icons/md";

import { statusColor } from "../assets";
import { BsThreeDots } from "react-icons/bs";
import RoleAction from "./RoleAction";

const TaskCard = ({ id, status, title, content, lastUpdate, agent, role }) => {
  const bgColor = statusColor[status].bgColor;
  const color = statusColor[status].color;
  const borderColor = statusColor[status].borderColor;

  const isFinal = status === "Completed" || status === "Cancelled";
  const canShowActions = role && !isFinal;

  return (
    <div
      id="task-card"
      className="bg-white rounded-sm shadow-sm w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
    >
      <div className="container p-6 space-y-3">
        <div className=":flex space-y-3">
          <div className={`border-l-4 pl-2 ${borderColor}`}>
            <div className="task-title font-bold text-2xl">{title}</div>
            <div className="task-content text-gray-500">{content}</div>
          </div>

          <div
            className={`${bgColor} ${color}  w-fit h-fit px-3 py-1 rounded-full font-semibold`}
          >
            <p>{status}</p>
          </div>

          {canShowActions && (
            <RoleAction role={role} taskId={id} taskStatus={status} />
          )}
        </div>

        <div className="flex items-center space-x-1 text-gray-500">
          <div className="text-xl">
            <MdUpdate />
          </div>
          <div>Last Update:</div>
          <div>{lastUpdate}</div>
        </div>

        <div className="flex text-gray-500 space-x-1">
          <div>Assigned To: </div>
          <div> {agent}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
