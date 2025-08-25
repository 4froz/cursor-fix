import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { usePageFade } from "../pages/PageFade";

const Navigator = ({ breadcrumbs = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathParts = location.pathname.split("/").filter(Boolean); // remove empty strings

  // Fallback logic if breadcrumbs not passed
  const fallbackBreadcrumbs = pathParts.map((part, index) => {
    // Rebuild URL up to this part
    const url = "/" + pathParts.slice(0, index + 1).join("/");

    // Format label
    const label =
      part.length === 24 && index === pathParts.length - 1
        ? `Order #${part.slice(0, 6)}...` // For Mongo _id-style strings
        : part.replace(/-/g, " ");

    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      to: index !== pathParts.length - 1 ? url : null,
    };
  });

  // Remove 'Product' crumbs
  const finalBreadcrumbs = (breadcrumbs.length > 0 ? breadcrumbs : fallbackBreadcrumbs).filter(
    (crumb) => crumb.label.toLowerCase() !== "product"
  );

  return (
    <div className="flex flex-row mt-5.5 text-sm items-center space-x-0.5 lg:space-x-1.5">
      <div onClick={() => navigate("/")} className="cursor-pointer text-sm lg:text-[14px]">
        Home
      </div>

      {finalBreadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lg:w-[16px] w-[16px] h-[16px] translate-y-[.5px] lg:h-[16px] text-[#102b26]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>

          {crumb.to ? (
            <span
              onClick={() => navigate(crumb.to)}
              className="cursor-pointer capitalize text-sm lg:text-[14px]"
            >
              {crumb.label}
            </span>
          ) : (
            <span className="text-[#0c1b1e7a] line-clamp-1 capitalize text-sm lg:text-[14px]">
              {crumb.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Navigator;
