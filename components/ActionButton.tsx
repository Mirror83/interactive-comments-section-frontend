import React from "react";

type ActionButtonProps = {
  onClick?: () => void;
  action: "confirm" | "cancel";
  children?: React.ReactNode;
};

function ActionButton({ onClick, action, children }: ActionButtonProps) {
  return (
    <button
      className={`py-3 min-w-[150px] text-white rounded-lg 
            hover:opacity-70 ${
              action === "confirm" ? "bg-soft-red" : "bg-grayish-blue"
            }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ActionButton;
