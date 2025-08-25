import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { UserIcon } from "@heroicons/react/24/outline";
import { Server } from "../../consts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFirebaseToken } from "../../redux/authSlice";

export const NewUsersWidget = () => {
  const [loading, setLoading] = useState(false);
  const [newUsers, setNewUsers] = useState([]);
  const navigate = useNavigate();
  const firebaseToken = useSelector(selectFirebaseToken);

  useEffect(() => {
    const fetchNewUsers = async () => {
      if (!firebaseToken) return;
      try {
        setLoading(true);
        const response = await axios.get(`${Server}/api/users/latest?limit=7`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
          withCredentials: true,
        });
        setNewUsers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching new users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewUsers();
  }, [firebaseToken]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg w-full lg:w-80 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Recent Users</h3>
        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
          <UserIcon className="w-3 h-3 text-gray-600" />
        </div>
      </div>

      <div className="space-y-3 max-h-[280px] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-8">
            <CircularProgress size={20} sx={{ color: "#6B7280" }} />
          </div>
        ) : newUsers.length > 0 ? (
          newUsers.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/user/${item.firebaseUID}/edit`)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-500 truncate">{item.email}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            No recent users
          </div>
        )}
      </div>
    </div>
  );
};