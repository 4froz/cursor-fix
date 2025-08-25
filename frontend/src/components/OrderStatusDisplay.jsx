import React from "react";

const OrderStatusDisplay = ({ status, variant = "badge" }) => {
  // Status configuration that matches backend exactly
  const statusConfig = {
    'pending': { 
      label: 'Pending', 
      badgeColor: 'bg-yellow-100 text-yellow-700',
      textColor: 'text-yellow-600'
    },
    'processing': { 
      label: 'Processing', 
      badgeColor: 'bg-blue-100 text-blue-800',
      textColor: 'text-blue-600'
    },
    'out for delivery': { 
      label: 'Out for Delivery', 
      badgeColor: 'bg-purple-100 text-purple-800',
      textColor: 'text-purple-600'
    },
    'delivered': { 
      label: 'Delivered', 
      badgeColor: 'bg-green-100 text-green-800',
      textColor: 'text-green-600'
    },
    'cancelled': { 
      label: 'Cancelled', 
      badgeColor: 'bg-red-100 text-red-700',
      textColor: 'text-red-600'
    },
    'cancelled by admin': { 
      label: 'Cancelled by Admin', 
      badgeColor: 'bg-red-100 text-red-700',
      textColor: 'text-red-600'
    }
  };

  const statusInfo = statusConfig[status?.toLowerCase()] || {
    label: status || 'Unknown',
    badgeColor: 'bg-gray-100 text-gray-800',
    textColor: 'text-gray-600'
  };

  if (variant === "badge") {
    return (
      <span className={`px-3 py-[6px] rounded-full text-xs md:text-sm font-medium inline-block ${statusInfo.badgeColor}`}>
        {statusInfo.label}
      </span>
    );
  }

  if (variant === "text") {
    return (
      <span className={statusInfo.textColor}>
        {statusInfo.label}
      </span>
    );
  }

  if (variant === "dot") {
    return (
      <div className={`w-3 h-3 rounded-full ${statusInfo.badgeColor.replace('text-', 'bg-').split(' ')[0]}`}></div>
    );
  }

  return (
    <span className={statusInfo.textColor}>
      {statusInfo.label}
    </span>
  );
};

export default OrderStatusDisplay;





