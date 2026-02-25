import { FaRegClock } from "react-icons/fa6";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const statusIcon = {
  Pending: FaRegClock,
  Active: HiOutlineDotsCircleHorizontal,
  Completed: IoMdCheckmarkCircleOutline,
  Cancelled: ImCancelCircle,
};

export const statusCard = [
  {
    status: "Active",
    value: 12,
  },

  {
    status: "Pending",
    value: 12,
  },

  {
    status: "Completed",
    value: 12,
  },

  {
    status: "Cancelled",
    value: 12,
  },
];
