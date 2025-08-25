import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectFirebaseToken, selectIsAuthenticated } from "../../redux/authSlice";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Server } from "../../consts";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SortDropdown = ({ selected, setSelected, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selectedLabel}</span>
        <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      
      {open && (
        <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg min-w-[100px] z-20">
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
              onClick={() => {
                setSelected(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const OrdersMonthbyChart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [error, setError] = useState(null);

  const firebaseToken = useSelector(selectFirebaseToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const startYear = 2022;
  const yearOptions = Array.from(
    { length: new Date().getFullYear() - startYear + 1 },
    (_, i) => {
      const year = startYear + i;
      return { label: `${year}`, value: year };
    }
  ).reverse();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !firebaseToken) {
        setError("Authentication required");
        return;
      }

      try {
        setChartData(null);
        setError(null);

        const res = await axios.get(
          `${Server}/api/orders/analytics/by-month?year=${selectedYear}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${firebaseToken}`,
            },
            withCredentials: true,
          }
        );

        const data = res.data;
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const labels = data.map((item) => monthNames[item.month - 1]);
        const counts = data.map((item) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Orders",
              data: counts,
              borderColor: "#3B82F6",
              backgroundColor: "rgba(59, 130, 246, 0.08)",
              tension: 0.3,
              fill: true,
              pointBackgroundColor: "#3B82F6",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 5,
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error loading chart data:", error);
        
        if (error.response?.status === 401) {
          setError("Authentication failed");
        } else if (error.response?.status === 403) {
          setError("Access denied");
        } else {
          setError("Failed to load data");
        }
      }
    };

    fetchData();
  }, [selectedYear, firebaseToken, isAuthenticated]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#111827",
        bodyColor: "#6B7280",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 8,
        titleFont: { size: 12, weight: "500" },
        bodyFont: { size: 12 },
        cornerRadius: 6,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: { 
          color: "#9CA3AF",
          font: { size: 11 }
        },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: { 
          color: "#9CA3AF", 
          beginAtZero: true,
          font: { size: 11 }
        },
        grid: { 
          color: "rgba(0,0,0,0.06)",
          borderDash: [1, 3]
        },
        border: { display: false },
      },
    },
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg lg:flex-1 p-4">
        <div className="flex items-center justify-center h-[280px] text-gray-500 text-sm">
          Please log in to view analytics
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg lg:flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Sales Overview</h3>
        <SortDropdown
          selected={selectedYear}
          setSelected={setSelectedYear}
          options={yearOptions}
        />
      </div>

      <div className="h-[280px]">
        {error ? (
          <div className="flex items-center justify-center h-full text-red-500 text-sm">
            {error}
          </div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersMonthbyChart;