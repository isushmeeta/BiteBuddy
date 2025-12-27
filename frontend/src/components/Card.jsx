import React from "react";

export function Card({ children, className }) {
  return <div className={`bg-white p-4 rounded ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
