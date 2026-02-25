import React from "react";
import Card from "./Card";
import { statusCard } from "../assets";

const StatusCard = () => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {statusCard.map((card, index) => (
        <Card key={index} status={card.status} value={card.value} />
      ))}
    </div>
  );
};

export default StatusCard;
