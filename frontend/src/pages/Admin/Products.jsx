import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/Admin/AdminHeader";
import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Server } from "../../consts";
import { useSelector } from "react-redux";
import { selectFirebaseToken, selectIsAuthenticated, selectIsInitialized } from "../../redux/authSlice";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import ErrorHandler from "../../components/ErrorHandler";

function Products() {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchPages, setSearchPages] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState(null);
  
  const navigate = useNavigate();
  const firebaseToken = useSelector(selectFirebaseToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);
  const { error, success, showError, showSuccess, clearError, clearSuccess } = useErrorHandler();

  const isSearching = search.trim() !== "";

  // Simple auth headers helper using Redux token
  const getAuthHeaders = () => {
    if (!firebaseToken) {
      throw new Error("No authentication token available");
    }
    
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${firebaseToken}`,
    };
  };

  // Simple error handler for API requests
  const handleApiError = (error, operation) => {
    console.error(`${operation} error:`, error);
    
    if (error.response?.status === 401) {
      navigate("/login");
    } else if (error.response?.status === 403) {
      showError("Access denied. Admin privileges required.");
    } else {
      console.error(`${operation} failed:`, error.response?.data?.message || error.message);
    }
  };

  // Fetch normal paginated products
  const fetchProducts = async (pageToLoad = 1, append = false) => {
    setLoading(true);
    
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(
        `${Server}/api/products/admin?page=${pageToLoad}&limit=12`,
        {
          headers,
          withCredentials: true,
        }
      );
      
      const { products, pages } = response.data;

      if (append) {
        setAllProducts((prev) => [...prev, ...products]);
      } else {
        setAllProducts(products);
      }

      setTotalPages(pages);
    } catch (error) {
      handleApiError(error, "Fetch products");
      // Don't clear products on error, keep existing data
    } finally {
      setLoading(false);
    }
  };

  // Enhanced search implementation
  const fetchSearchResults = async (pageToLoad = 1, append = false) => {
    setLoading(true);
    
    try {
      // For search, we don't need admin auth since it's a public endpoint
      // But if you want admin-only search, keep the auth headers
      const response = await axios.post(
        `${Server}/api/products/search`,
        { query: search },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      const products = response.data || [];
      
      // Simulate pagination for search results
      const itemsPerPage = 12;
      const startIndex = (pageToLoad - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = products.slice(startIndex, endIndex);
      const totalPages = Math.ceil(products.length / itemsPerPage);

      if (append) {
        setSearchProducts((prev) => [...prev, ...paginatedProducts]);
      } else {
        setSearchProducts(paginatedProducts);
      }

      setSearchPages(totalPages);
    } catch (error) {
      handleApiError(error, "Search products");
      setSearchProducts([]);
      setSearchPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced delete product function
  const handleDeleteProduct = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    setDeleteLoading(productId);
    
    try {
      const headers = getAuthHeaders();
      await axios.delete(`${Server}/api/products/admin/${productId}`, {
        headers,
        withCredentials: true,
      });

      // Remove from local state
      setAllProducts((prev) => prev.filter((p) => p._id !== productId));
      setSearchProducts((prev) => prev.filter((p) => p._id !== productId));
      
      showSuccess("Product deleted successfully!");
    } catch (error) {
      handleApiError(error, "Delete product");
      showError("Failed to delete product. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Check authentication status on component mount - wait for store to initialize
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // If we have auth, proceed with initial data fetch
    if (isSearching) {
      fetchSearchResults(1, false);
      setSearchPage(1);
    } else {
      fetchProducts(1, false);
      setPage(1);
    }
  }, [search, isInitialized, isAuthenticated]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, true);
  };

  const handleLoadMoreSearch = () => {
    const nextPage = searchPage + 1;
    setSearchPage(nextPage);
    fetchSearchResults(nextPage, true);
  };

  const productsToRender = isSearching ? searchProducts : allProducts;
  const maxPages = isSearching ? searchPages : totalPages;
  const currentPage = isSearching ? searchPage : page;



  return (
    <>
      <ErrorHandler 
        error={error} 
        success={success} 
        onClose={clearError} 
        type={success ? 'success' : 'error'} 
      />
      <div className="w-full lg:w-[78%] scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-white overflow-y-scroll flex flex-col h-screen bg-[#EFF3F8] lg:px-[30px]">
        <AdminHeader />
      <div className="flex p-[10px] lg:p-[24px] flex-col w-full">
        <h2 className="text-xl mb-0 font-semibold">
          {isSearching ? `Search Results for "${search}"` : "All Products"}
        </h2>

        <div className="bg-white mt-3 w-full p-[16px] lg:p-[24px] border-gray-300 min-h-[550px]">
          <div className="flex md:flex-row items-start md:justify-between justify-start flex-col md:items-center">
            <div className="md:w-[60%] w-full bg-[#F7F7F8] space-x-3 mr-5 flex px-2 py-3 flex-row items-center justify-between">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0475 17.89C11.9567 17.89 12.857 17.7109 13.697 17.3629C14.537 17.015 15.3003 16.505 15.9432 15.8621C16.5861 15.2192 17.0961 14.456 17.444 13.616C17.7919 12.776 17.971 11.8757 17.971 10.9665C17.971 10.0573 17.7919 9.15696 17.444 8.31696C17.0961 7.47696 16.5861 6.71372 15.9432 6.07081C15.3003 5.42791 14.537 4.91793 13.697 4.56999C12.857 4.22205 11.9567 4.04297 11.0475 4.04297C9.2113 4.04297 7.45028 4.77241 6.15187 6.07081C4.85346 7.36922 4.12402 9.13024 4.12402 10.9665C4.12402 12.8027 4.85346 14.5637 6.15187 15.8621C7.45028 17.1605 9.2113 17.89 11.0475 17.89Z"
                  stroke="#0C1B1E"
                  strokeWidth="1.4"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M16 16L20.308 20.308"
                  stroke="#0C1B1E"
                  strokeWidth="1.4"
                  strokeMiterlimit="10"
                />
              </svg>
              <input
                type="text"
                placeholder="Search here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-base focus:outline-none"
              />

              {search.trim() !== "" && (
                <XMarkIcon
                  strokeWidth={2}
                  className="size-6 text-gray-500 cursor-pointer hover:text-black transition"
                  onClick={() => setSearch("")}
                />
              )}
            </div>

            <button
              onClick={() => navigate("/product/create")}
              className="flex flex-row items-center space-x-1 justify-center cursor-pointer animated-button border md:items-center p-[10px] px-[12px] w-full md:w-auto lg:w-auto mt-3 md:mt-0"
            >
              <PlusIcon
                strokeWidth={2}
                className="text-black size-4 transform scale-[1.1]"
              />
              <span className="text-md font-semibold">Create Product</span>
            </button>
          </div>

          {!isInitialized ? (
            <div className="w-full flex flex-col justify-center items-center h-[200px]">
              <span className="text-lg font-medium">Loading...</span>
            </div>
          ) : loading && currentPage === 1 ? (
            <div className="w-full flex flex-col justify-center items-center h-[200px]">
              <span className="text-lg font-medium">Loading Products...</span>
            </div>
          ) : productsToRender.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-600">
              No products found.
            </div>
          ) : (
            <>
              <div className="w-full overflow-x-auto">
                <table className="min-w-[700px] text-center mt-10 w-full">
                  <thead>
                    <tr>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Name
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Price
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Best Seller
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsToRender.map((item, index) => (
                      <tr
                        key={item._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"
                        }`}
                      >
                        <td className="text-start text-sm py-5 px-5 font-semibold text-stone-800">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.img?.[0]}
                              className="w-10 h-10 bg-slate-200 object-cover rounded-md"
                              alt={item.name}
                            />
                            <span className="w-[150px]">{item.name}</span>
                          </div>
                        </td>
                        <td className="text-center text-sm py-5 font-semibold text-stone-800">
                          ₹{item.price}
                        </td>
                        <td className="text-center text-sm py-5 font-semibold text-stone-800">
                          {item.bestSellers ? (
                            <CheckCircleIcon className="text-green-500 size-5 inline-block" />
                          ) : (
                            <XCircleIcon className="text-red-500 size-5 inline-block" />
                          )}
                        </td>
                        <td className="text-center text-sm py-5 font-semibold text-stone-800">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => navigate(`/product/${item._id}/edit`)}
                              className="px-4 py-[6px] animated-button cursor-pointer border text-sm font-medium hover:bg-blue-50"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(item._id, item.name)}
                              disabled={deleteLoading === item._id}
                              className="px-3 py-[6px] animated-button cursor-pointer border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deleteLoading === item._id ? (
                                "..."
                              ) : (
                                <TrashIcon className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {currentPage < maxPages && (
                <div className="w-full flex justify-center mt-6">
                  <button
                    onClick={isSearching ? handleLoadMoreSearch : handleLoadMore}
                    className="mx-auto mt-0 border animated-button cursor-pointer px-6 py-2 hover:bg-black hover:text-white transition"
                  >
                    {loading ? "Loading..." : "Load More Products"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Products;