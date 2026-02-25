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
