import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminHeader from "../../components/Admin/AdminHeader";
import {
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Server } from "../../consts";
import { useNavigate } from "react-router-dom";
import { selectFirebaseToken } from "../../redux/authSlice";


function Users() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const currentPath = "users";
  const firebaseToken = useSelector(selectFirebaseToken);
  const navigate = useNavigate();

  const isSearching = search.trim() !== "";

  // Create axios instance with authentication
  const createAuthHeaders = () => ({
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${firebaseToken}`,
    },
  });

  const fetchUsers = async (pageToLoad = 1, append = false) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(
        `${Server}/api/users?page=${pageToLoad}&limit=12`, 
        createAuthHeaders()
      );

      if (response.data.success) {
        const { users, pagination } = response.data;

        if (append) {
          setAllUsers((prev) => [...prev, ...users]);
        } else {
          setAllUsers(users);
        }

        setTotalPages(pagination.pages);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || "Error fetching users");
      
      // Handle auth errors
      if (err.response?.status === 401) {
        setError("Authentication required. Please login again.");
      } else if (err.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async () => {
    if (!search.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(
        `${Server}/api/users/search`, 
        { query: search.trim() },
        createAuthHeaders()
      );

      if (response.data.success) {
        setSearchResults(response.data.results);
      } else {
        setError("Search failed");
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError(err.response?.data?.message || "Search failed");
      
      if (err.response?.status === 401) {
        setError("Authentication required. Please login again.");
      } else if (err.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!firebaseToken) {
      setError("Authentication token not found. Please login.");
      return;
    }

    if (isSearching) {
      const debounceTimer = setTimeout(() => {
        fetchSearchResults();
      }, 500); // Debounce search

      return () => clearTimeout(debounceTimer);
    } else {
      fetchUsers(1);
      setPage(1);
    }
  }, [search, firebaseToken]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(nextPage, true);
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchResults([]);
  };

  const handleViewDetails = (user) => {
    // Use firebaseUID for navigation since backend expects it
    navigate(`/user/${user.firebaseUID}/edit`);
  };

  const usersToRender = isSearching ? searchResults : allUsers;
  const canLoadMore = !isSearching && page < totalPages;



  return (
    <div className="w-full lg:w-[78%] scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-white overflow-y-scroll flex flex-col h-screen bg-[#EFF3F8] lg:px-[30px]">
      <AdminHeader />
      <div className="flex p-[14px] lg:p-[24px] flex-col w-full">
        <h2 className="text-xl mb-0 font-semibold">
          {isSearching ? `Search Results for "${search}"` : "All Users"}
        </h2>

        <div className="bg-white mt-3 w-full p-[16px] lg:p-[24px] border-gray-300 min-h-[550px]">
          {/* Search Bar */}
          <div className="md:w-[60%] w-full bg-[#F7F7F8] space-x-3 mr-5 flex px-2 py-3 flex-row items-center justify-between">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11.0475 17.89C11.9567 17.89 12.857 17.7109 13.697 17.3629C14.537 17.015 15.3003 16.505 15.9432 15.8621C16.5861 15.2192 17.0961 14.456 17.444 13.616C17.7919 12.776 17.971 11.8757 17.971 10.9665C17.971 10.0573 17.7919 9.15696 17.444 8.31696C17.0961 7.47696 16.5861 6.71372 15.9432 6.07081C15.3003 5.42791 14.537 4.91793 13.697 4.56999C12.857 4.22205 11.9567 4.04297 11.0475 4.04297C9.2113 4.04297 7.45028 4.77241 6.15187 6.07081C4.85346 7.36922 4.12402 9.13024 4.12402 10.9665C4.12402 12.8027 4.85346 14.5637 6.15187 15.8621C7.45028 17.1605 9.2113 17.89 11.0475 17.89Z"
                stroke="#0C1B1E"
                strokeWidth="1.4"
              />
              <path
                d="M16 16L20.308 20.308"
                stroke="#0C1B1E"
                strokeWidth="1.4"
              />
            </svg>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-base focus:outline-none bg-transparent"
            />

            {search.trim() !== "" && (
              <XMarkIcon
                strokeWidth={2}
                className="size-6 text-gray-500 cursor-pointer hover:text-black transition"
                onClick={handleClearSearch}
              />
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (!isSearching || page === 1) ? (
            <div className="w-full flex flex-col justify-center items-center h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
              <span className="text-lg font-medium">
                {isSearching ? "Searching..." : "Loading Users..."}
              </span>
            </div>
          ) : usersToRender.length === 0 && !loading ? (
            <div className="py-12 text-center text-sm text-gray-600">
              {isSearching ? `No users found for "${search}"` : "No users found."}
            </div>
          ) : (
            <>
              {/* Users Table */}
              <div className="w-full overflow-x-auto">
                <table className="min-w-[700px] text-center mt-10 w-full">
                  <thead>
                    <tr>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm text-start">
                        Name
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Email
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Admin
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Joined
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersToRender.map((user, index) => (
                      <tr
                        key={user.firebaseUID || user._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"
                        } hover:bg-gray-50 transition-colors`}
                      >
                        <td className="text-start text-sm py-5 px-5 font-semibold text-stone-800">
                          <div className="flex items-center space-x-3">
                            <img
                              src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                              className="w-10 h-10 object-cover rounded-full"
                              alt="User Avatar"
                            />
                            <span className="w-[150px] truncate" title={user.name}>
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="text-center text-sm py-5 font-medium text-stone-800">
                          <span className="truncate max-w-[200px] inline-block" title={user.email}>
                            {user.email}
                          </span>
                        </td>
                        <td className="text-center text-sm py-5 font-semibold text-stone-800">
                          {user.isAdmin ? (
                            <div className="flex items-center justify-center">
                              <CheckCircleIcon className="text-green-500 size-5" />
                              <span className="ml-1 text-green-600 text-xs">Admin</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <XCircleIcon className="text-gray-400 size-5" />
                              <span className="ml-1 text-gray-500 text-xs">User</span>
                            </div>
                          )}
                        </td>
                        <td className="text-center text-sm py-5 font-medium text-stone-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-center text-sm py-5 font-semibold text-stone-800">
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="px-4 py-[6px] animated-button cursor-pointer whitespace-nowrap border text-sm font-medium hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Load More Button */}
              {canLoadMore && (
                <div className="w-full flex justify-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="mx-auto mt-0 border animated-button cursor-pointer px-6 py-2 hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Load More Users"
                    )}
                  </button>
                </div>
              )}

              {/* Search Results Info */}
              {isSearching && (
                <div className="mt-4 text-sm text-gray-600 text-center">
                  Found {usersToRender.length} user{usersToRender.length !== 1 ? 's' : ''} 
                  {usersToRender.length >= 50 && " (showing first 50 results)"}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;