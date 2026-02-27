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

export const statusColor = {
  Pending: {
    bgColor: "bg-amber-300/30",
    color: "text-amber-800",
    borderColor: "border-amber-500",
  },

  Active: {
    bgColor: "bg-blue-400/30",
    color: "text-blue-600",
    borderColor: "border-blue-500",
  },
  Completed: {
    bgColor: "bg-emerald-300/30",
    color: "text-emerald-800",
    borderColor: "border-emerald-500",
  },

  Cancelled: {
    bgColor: "bg-red-300/30",
    color: "text-red-800",
    borderColor: "border-red-500",
  },
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

export const navlinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Supervisor",
    path: "/supervisor",
  },
  {
    name: "Operator",
    path: "/operator",
  },
];

export const baseURL = "http://localhost:3000";

export const filterByStatus = [
  "Pending",
  "Active",
  "Completed",
  "Cancelled",
  "All Tasks",
];

export const roleData = [
  {
    name: "Supervisor",
    permissions: ["Change Status", "Reassign"],
  },

  {
    name: "Operator",
    permissions: ["Start", "Mark Complete"],
  },
];

export const operatorData = [
  {
    id: 1,
    name: "Niraj",
  },
  {
    id: 2,
    name: "Bob",
  },
  {
    id: 3,
    name: "David",
  },
  {
    id: 4,
    name: "Charlie",
  },
];
