import {
  Fragment,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
  Suspense,
  lazy,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { closeCartModal } from "../redux/modalSlice";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
// import { usePageFade } from "../pages/PageFade";

// Lazy load CartCarousel

export default function CartModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.isCartModalOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const originalBodyPadding = useRef(null);
  const [showCarousel, setShowCarousel] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!open) return;

    originalBodyPadding.current = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const timeout = setTimeout(() => {
      setShowCarousel(true);
    }, 200); // slight delay to smooth modal load

    return () => {
      clearTimeout(timeout);
      setShowCarousel(false);
    };
  }, [open]);

  const handleClose = () => dispatch(closeCartModal());

  const afterLeave = () => {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = originalBodyPadding.current ?? "";
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartItems]);

  const handleClick = useCallback(() => {
    if (user) {
      dispatch(closeCartModal());
      setTimeout(() => {
        navigate(`/collections`);
      }, 800);
    } else {
      dispatch(closeCartModal());
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={afterLeave}>
      <Dialog as="div" className="relative z-[9999]" onClose={handleClose}>
        {/* Smooth Overlay */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-[1000ms] ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-[900ms] ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 will-change-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              {/* Smooth Sliding Panel */}
              <Transition.Child
                as={Fragment}
                enter="transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                enterFrom="translate-x-[100%]"
                enterTo="translate-x-0"
                leave="transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-[100%]"
              >
                <Dialog.Panel className="pointer-events-auto w-[92vw] sm:w-[61vw] md:w-[60vw] lg:w-[30vw] bg-white flex flex-col h-full relative px-[16px] md:px-[29px] transform-gpu will-change-transform">
                  {/* Header */}
                  <div className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-[10px] flex justify-between pt-7 pb-5 border-b-2">
                    <h1
                      style={{  fontWeight: 700 }}
                      className="text-[16px] md:text-[20px] flex items-start"
                    >
                      Your cart
                      <span className="text-[10px] ml-2 translate-y-0.5">
                        {cartItems?.length ?? 0}
                      </span>
                    </h1>
                    <button
                      className="text-gray-900 hover:text-gray-500 text-2xl"
                      aria-label="Close"
                      onClick={handleClose}
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Main Content */}
                  {cartItems?.length > 0 ? (
                    <>
                      <div className="flex-1 overflow-x-hidden pb-[100px] no-scrollbar overflow-y-auto">
                        {/* Cart Items */}
                        <div>
                          {cartItems
                            .slice()
                            .reverse()
                            .map((item) => (
                              <CartItem
                                key={`${item.name}-${item.variant}`}
                                item={item}
                              />
                            ))}
                        </div>

                        {/* Lazy Loaded Carousel */}
                        {/* {showCarousel && (
                          <Suspense fallback={null}>
                            <LazyCartCarousel />
                          </Suspense>
                        )} */}
                      </div>

                      {/* Sticky Footer */}
                      <div className="w-full border-t sticky bottom-0 left-0 z-20 pt-4 pb-6 bg-white">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg lg:text-xl text-gray-900">
                            Subtotal
                          </span>
                          <span className="text-lg lg:text-xl text-gray-900 font-medium">
                            ₹{subtotal}
                          </span>
                        </div>
                        <div className="text-gray-500 text-sm lg:text-base mb-6">
                          Tax included and shipping calculated at checkout
                        </div>
                        <button
                          onClick={() => {
                            if (user) {
                              dispatch(closeCartModal());
                              setTimeout(() => {
                                navigate(`/checkout`);
                              }, 800);
                            } else {
                              dispatch(closeCartModal());
                              navigate("/login");
                            }
                          }}
                          className="w-full cursor-pointer bg-black text-white py-3 text-base font-medium transition"
                        >
                          Checkout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-10 h-screen flex flex-col justify-center items-center">
                      <span className="text-center text-[24px]">
                        Your cart is empty
                      </span>
                      <button
                        onClick={handleClick}
                        className="cursor-pointer mt-5 px-4 animated-button border bg-transparent text-white py-3 text-[18px] font-medium transition"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
