// src/components/OrderCard.jsx
import React from "react";
import "./OrderCard.css";

const OrderCard = ({ order, onReorder }) => {
  const dateText = order.orderDate
    ? new Date(order.orderDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <div className="order-card">
      <div>
        <h2 className="text-lg font-semibold uppercase">{order.restaurantName}</h2>
        <p className="text-xs text-gray-700 mt-1">{dateText}</p>
        <p className="mt-2 font-semibold text-black">${order.totalPrice}</p>
      </div>

      <div>
        <button
          onClick={onReorder}
          className="bg-[#6b6363] text-white px-5 py-2 rounded-sm border-2 border-black hover:bg-[#5a5353] transition"
        >
          REORDER
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
