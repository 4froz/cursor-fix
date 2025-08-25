const OrderStep = ({ label, status, currentStatus, message }) => {
  const isActive = status === currentStatus;

  return (
    <>
      {/* Step header */}
      <div className="flex justify-between w-full items-center flex-row">
        <div className="flex flex-row space-x-4 items-center">
          {isActive ? (
            <div className="flex items-center justify-center rounded-full w-6 h-6 bg-green-200">
              <svg
                className="text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="w-6 h-6 border-[2px] border-slate-300 rounded-full" />
          )}
          <span className="font-semibold">{label}</span>
        </div>
      </div>

      {/* Step content */}
      <div
        className={`w-full justify-center md:justify-start flex mx-[12px] border-l ${
          status === "Delivered" && !isActive
            ? "h-0"
            : status === currentStatus
            ? "h-min"
            : "h-[20px]"
        }`}
      >
        {isActive && (
          <span className="italic text-gray-500 md:ml-10 ml-1 w-[80%] my-3 mb-4 text-xs md:text-sm">
            {message}
          </span>
        )}
      </div>
    </>
  );
};

export default OrderStep;
