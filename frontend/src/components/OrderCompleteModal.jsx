import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { closesuccesModal } from "../redux/modalSlice";
// import { usePageFade } from "../pages/PageFade";
import success from "../assets/success-ezgif.com-loop-count.gif";
import { useNavigate } from "react-router-dom";

const SuccessModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.succesModal);
  const user = useSelector((state) => state.auth.user); // uses your updated structure
  const navigate = useNavigate();

  const closeModal = () => dispatch(closesuccesModal());

  // ✅ Preload the image once
  useEffect(() => {
    const preloadImg = new Image();
    preloadImg.src = success;
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 backdrop-blur-xs z-[2500] bg-black/50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#FFFEFD] h-[530px] w-[90%] sm:w-[60%] lg:w-[30%] p-6 text-center"
          >
            <img
              src={success}
              alt="Success"
              className="w-full -translate-y-6 md:-translate-y-0 lg:w-[300px] mx-auto mb-4 object-contain"
              loading="eager"
            />

            <div className="flex flex-col -translate-y-16  md:-translate-y-7">
              <p className="text-lg font-normal">Hey {user?.name},</p>

              <h2 className="text-xl md:text-2xl font-bold mt-2">
                Your Order is Confirmed
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                Thanks for your order. It's now being prepared and will ship
                soon.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => {
                    closeModal();
                    setTimeout(() => {
                      navigate(`/account/order/${isOpen.orderId}`);
                    }, 300); // slight delay for modal to close
                  }}
                  className="w-full cursor-pointer animated-button border py-3 transition"
                >
                  View Order
                </button>

                <button
                  onClick={closeModal}
                  className="w-full cursor-pointer bg-black text-white py-3 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
