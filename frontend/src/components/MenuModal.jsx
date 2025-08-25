import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
// import { usePageFade } from "../pages/PageFade";
import { useSelector } from "react-redux";

export default function MenuModal({ open, setOpen, children }) {
  // Use a ref to store the body's original paddingRight value.
  const originalBodyPadding = useRef(document.body.style.paddingRight);
  const navigate = useNavigate();
  // This effect handles the body's scrollbar to prevent layout shift.
  useEffect(() => {
    if (open) {
      // Store the original value when the modal opens.
      originalBodyPadding.current = document.body.style.paddingRight;
      // Calculate the scrollbar width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      // Hide the scrollbar
      document.body.style.overflow = "hidden";
      // Add padding to compensate for the scrollbar's width.
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    // Cleanup is handled by afterLeave to sync with animation
  }, [open]);

  function handleClose() {
    setOpen(false);
  }

  function afterLeave() {
    // This is called by Transition.Root *only after* the leave animation has fully completed.
    document.body.style.overflow = "auto";
    // Restore the original paddingRight value.
    document.body.style.paddingRight = originalBodyPadding.current;
  }

  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Transition.Root show={open} as={Fragment} afterLeave={afterLeave}>
        <Dialog as="div" className="relative z-999" onClose={handleClose}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[rgb(0,0,0,0.7)] bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                {/* Modal Panel */}
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-[85vw] md:w-[60vw] lg:w-[30vw]">
                    <div className="flex h-full overflow-y-scroll no-scrollbar flex-col bg-[rgb(255,255,255,1)] shadow-xl w-full">
                      <div className="px-4 py-6 sm:px-6">
                        {/* Search Bar */}

                        {/* Main Menu */}
                        <div className="flex flex-col gap-0">
                          {[
                            {
                              name: "Shop",
                              url: "/shop",
                            },
                            {
                              name: "About Us",
                              url: "/about-us",
                            },
                            { name: "Contact Us", url: "/contact-us" },
                            ,
                          ].map((item) => (
                            <div
                              onClick={() => {
                                handleClose(), navigate(item.url);
                              }}
                              key={item.name}
                              className="flex items-center justify-between border-b border-gray-300 py-4 cursor-pointer hover:bg-gray-50 transition"
                            >
                              <span className="text-[16px] hover:underline">
                                {item.name}
                              </span>
                              {/* Chevron Right SVG */}
                              <svg
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          ))}

                               <div
                              onClick={() => {
                                handleClose(), navigate("/admin/dashboard");
                              }}
                              className="flex items-center justify-between border-b border-gray-300 py-4 cursor-pointer hover:bg-gray-50 transition"
                            >
                              <span className="text-[16px] hover:underline">
                                Enter Admin Panel
                              </span>
                              {/* Chevron Right SVG */}
                              <svg
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                        </div>
                        <div className="mt-16" />

                        <div
                          onClick={() => {
                            handleClose(),
                              navigate(user ? "/account" : "/login");
                          }}
                          className="flex items-center justify-between border-y border-gray-300 py-4 cursor-pointer hover:bg-gray-50 transition"
                        >
                          <span className="text-[16px] hover:underline">
                            My Account
                          </span>
                          {/* Chevron Right SVG */}
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                        {user?.isAdmin && (
                          <div
                            onClick={() => {
                              handleClose(),
                                navigate(
                                  user.isAdmin ? "/admin/dashboard" : "/"
                                );
                            }}
                            className="flex items-center justify-between border-b border-gray-300 py-4 cursor-pointer hover:bg-gray-50 transition"
                          >
                            <span className="text-[16px] hover:underline">
                              Enter Admin Panel
                            </span>
                            {/* Chevron Right SVG */}
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        )}
                        {/* Spacer */}
                        <div className="mt-16" />

                        {/* Secondary Links */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <style>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE & Edge */
    scrollbar-width: none;     /* Firefox */
  }
`}</style>
    </>
  );
}
