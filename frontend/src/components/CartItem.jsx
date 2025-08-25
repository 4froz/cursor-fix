import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
// import { usePageFade } from "../pages/PageFade";
import { closeCartModal } from "../redux/modalSlice";
import { useNavigate } from "react-router-dom";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  const handleDecrease = () => {
    if (item.qty === 1) {
      setIsVisible(false);
      setTimeout(() => {
        dispatch(removeFromCart({ name: item.name, variant: item.variant }));
      }, 500); // 500ms matches the exit animation
    } else {
      dispatch(decreaseQty({ name: item.name, variant: item.variant }));
    }
  };

  const navigateWithFade = useNavigate();
  const slug = useMemo(
    () => item.name.toLowerCase().replace(/\s+/g, "-"),
    [item.name]
  );
  const handleClick = useCallback(() => {
    navigateWithFade(`/product/${slug}`);
    dispatch(closeCartModal());
  }, [navigateWithFade, item.category, slug]);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(removeFromCart({ name: item.name, variant: item.variant }));
    }, 500); // 500ms matches the exit animation
  };

  const handleIncrease = () => {
    dispatch(increaseQty({ name: item.name, variant: item.variant }));
  };

  return (
<AnimatePresence>
  {isVisible && (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1, // you can tweak this for speed
        ease: "easeInOut",
      }}
      layout
      className="flex py-10 border-b border-[#bdbfbf] flex-row justify-between items-start"
    >
      <img
        onClick={handleClick}
        className="w-[90px] bg-slate-50 cursor-pointer h-[90px] md:w-[120px] md:h-[120px]"
        src={item.img}
        alt=""
      />

      <div className="flex w-[65%] flex-col">
        <h1 className="text-[16px] md:text-[18px]">{item.name}</h1>
        {item.variant !== "default" && (
          <span className="md:text-[13px] text-[12px] text-gray-400">
            {item.variant}
          </span>
        )}
        <span className="text-[16px] mt-3 mb-7">₹{item.price}</span>

        <div className="flex w-full flex-row justify-between">
          <div className="border border-[#bdbfbf] px-2 py-2 flex flex-row justify-between space-x-4">
            <button
              style={{ fontFamily: "LaNordLight" }}
              onClick={handleDecrease}
              className="text-3xl w-6 lg:w-5 cursor-pointer"
            >
              <svg width="13" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1.5 10.75H.25v2.5H1.5v-2.5zm21 2.5h1.25v-2.5H22.5v2.5zm-21 0H12v-2.5H1.5v2.5zm10.5 0h10.5v-2.5H12v2.5z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <span className="w-4 text-lg text-center">{item.qty}</span>
            <button
              style={{ fontFamily: "LaNordLight" }}
              onClick={handleIncrease}
              className="text-3xl w-6 lg:w-5 flex justify-end cursor-pointer"
            >
              <svg width="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13.25 1.5V.25h-2.5V1.5h2.5zm-2.5 21v1.25h2.5V22.5h-2.5zM1.5 10.75H.25v2.5H1.5v-2.5zm21 2.5h1.25v-2.5H22.5v2.5zm-21 0H12v-2.5H1.5v2.5zm10.5 0h10.5v-2.5H12v2.5zM10.75 1.5V12h2.5V1.5h-2.5zm0 10.5v10.5h2.5V12h-2.5z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={handleRemove}
            className="text-gray-600 cursor-pointer text-sm md:text-base underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )}
</AnimatePresence>

  );
}

export default CartItem;

// import React from "react";
// import { useDispatch } from "react-redux";
// import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";

// function CartItem({ item }) {
//   const dispatch = useDispatch();

//   const handleDecrease = () => {
//     if (item.qty === 1) {
//       dispatch(removeFromCart({ name: item.name, variant: item.variant }));
//     } else {
//       dispatch(decreaseQty({ name: item.name, variant: item.variant }));
//     }
//   };

//   const handleRemove = () => {
//     dispatch(removeFromCart({ name: item.name, variant: item.variant }));
//   };

//   const handleIncrease = () => {
//     dispatch(increaseQty({ name: item.name, variant: item.variant }));
//   };

//   return (
//     <div className="flex py-10 border-b border-[#bdbfbf] flex-row justify-between items-start">
//       <img
//         className="w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
//         src={item.img}
//         alt=""
//       />

//       <div className="flex w-[65%] flex-col">
//         <h1 className="text-[16px] md:text-[18px]">{item.name}</h1>
//         {item.variant !== "default" && (
//           <span className="md:text-[13px] text-[12px] text-gray-400">
//             {item.variant}
//           </span>
//         )}
//         <span className="text-[16px] mt-3 mb-7">${item.price}</span>

//         <div className="flex w-full flex-row justify-between">
//           <div className="border border-[#bdbfbf] px-2 py-2 flex flex-row justify-between space-x-4">
//             <button
//               style={{ fontFamily: "LaNordLight" }}
//               onClick={handleDecrease}
//               className="text-3xl w-6 lg:w-5 cursor-pointer"
//             >
//               {/* Minus Icon */}
//               <svg
//                 width={"13"}
//                 height={"24"}
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M1.5 10.75H.25v2.5H1.5v-2.5zm21 2.5h1.25v-2.5H22.5v2.5zm-21 0H12v-2.5H1.5v2.5zm10.5 0h10.5v-2.5H12v2.5z"
//                   fill="currentColor"
//                 ></path>
//               </svg>
//             </button>
//             <span className="w-4 text-lg text-center">{item.qty}</span>
//             <button
//               style={{ fontFamily: "LaNordLight" }}
//               onClick={handleIncrease}
//               className="text-3xl w-6 lg:w-5 flex justify-end cursor-pointer"
//             >
//               {/* Plus Icon */}
//               <svg
//                 width={"13"}
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M13.25 1.5V.25h-2.5V1.5h2.5zm-2.5 21v1.25h2.5V22.5h-2.5zM1.5 10.75H.25v2.5H1.5v-2.5zm21 2.5h1.25v-2.5H22.5v2.5zm-21 0H12v-2.5H1.5v2.5zm10.5 0h10.5v-2.5H12v2.5zM10.75 1.5V12h2.5V1.5h-2.5zm0 10.5v10.5h2.5V12h-2.5z"
//                   fill="currentColor"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//           <button
//             onClick={handleRemove}
//             className="text-gray-600 cursor-pointer text-sm md:text-base underline"
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




