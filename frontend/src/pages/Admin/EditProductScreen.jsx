import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  CubeIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  UsersIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import AdminHeader from "../../components/Admin/AdminHeader";
import axios from "axios";
import { Server } from "../../consts";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFirebaseToken, selectIsAuthenticated, selectIsInitialized } from "../../redux/authSlice";

const EditProductScreen = () => {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState([]); // existing + preview URLs
  const [imageFiles, setImageFiles] = useState([]); // new uploads
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [inStock, setInStock] = useState(true);
  const [bestSellers, setBestSellers] = useState(false);
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const currentPath = "products";

  // Redux selectors
  const firebaseToken = useSelector(selectFirebaseToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);

  // Check authentication on mount - wait for store to initialize
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [isInitialized, isAuthenticated, navigate]);

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
      alert("Access denied. Admin privileges required.");
    } else {
      console.error(`${operation} failed:`, error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setFetchLoading(true);
        const headers = getAuthHeaders();
        const res = await axios.get(`${Server}/api/products/admin/${id}`, { 
          headers,
          withCredentials: true 
        });
        const product = res.data;

        setName(product.name || "");
        setDesc(product.desc || "");
        setImg(product.img || []);
        setPrice(product.price || 0);
        setDiscountPrice(product.discountPrice || 0);
        setInStock(product.inStock ?? true);
        setBestSellers(product.bestSellers ?? false);
      } catch (err) {
        handleApiError(err, "Fetch product");
        alert("Failed to fetch product.");
      } finally {
        setFetchLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProduct();
    }
  }, [id, isAuthenticated]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImg((prev) => [...prev, ...previews]);
    setImageFiles((prev) => [...prev, ...files]);
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!img || img.length === 0) {
      newErrors.img = "At least one image is required";
    }
    
    if (!price || price <= 0) {
      newErrors.price = "Valid price is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      // For now, we'll use placeholder image URLs for new uploads
      // You'll need to implement your image upload solution here
      const imageUrls = img.map((url, index) => {
        // If it's a blob URL (from file input), create a placeholder
        if (url.startsWith('blob:')) {
          return `https://via.placeholder.com/400x300/cccccc/666666?text=Image+${index + 1}`;
        }
        return url;
      });

      const headers = getAuthHeaders();

      await axios.put(`${Server}/api/products/admin/${id}`, {
        name: name.trim(),
        desc: desc.trim(),
        img: imageUrls,
        price: parseFloat(price),
        discountPrice: parseFloat(discountPrice) || 0,
        inStock,
        bestSellers,
      }, { 
        headers,
        withCredentials: true 
      });

      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      handleApiError(err, "Update product");
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      const headers = getAuthHeaders();
      await axios.delete(`${Server}/api/products/admin/${id}`, { 
        headers,
        withCredentials: true 
      });
      alert("Product deleted successfully!");
      navigate("/admin/products");
    } catch (err) {
      handleApiError(err, "Delete product");
      alert("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="flex lg:flex-row flex-col overflow-y-hidden w-full items-center">
        <div className="lg:flex hidden flex-col w-[22%] h-screen px-[32px] py-10 bg-[#fff]">
          <span
            style={{ fontWeight: 600 }}
            className="font-semibold text-black text-3xl"
          >
            Salesboard
          </span>

          <span
            style={{ fontWeight: 400 }}
            className="mt-12 uppercase text-xs text-gray-400 font-semibold"
          >
            Main Menu
          </span>

          {/* Dashboard Menu */}
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex mt-8 w-full flex-row cursor-pointer items-center space-x-4"
          >
            <div
              className={`flex flex-col justify-center ${
                currentPath === "dashboard" ? "bg-[#07CE4E]" : "bg-[#38383D]"
              } items-center p-1 rounded-md`}
            >
              <Squares2X2Icon className="size-5 text-white" />
            </div>
            <span
              style={{}}
              className={`text-[14px] ${
                currentPath === "dashboard" ? "text-black" : "text-gray-500"
              } font-medium`}
            >
              Dashboard
            </span>
          </div>

          {/* Orders Menu */}
          <div
            onClick={() => navigate("/admin/orders")}
            className="flex mt-8 w-full flex-row cursor-pointer items-center space-x-4"
          >
            <div
              className={`flex flex-col justify-center ${
                currentPath === "orders" ? "bg-[#07CE4E]" : "bg-[#38383D]"
              } items-center p-1 rounded-md`}
            >
              <ShoppingBagIcon className="size-5 text-white" />
            </div>
            <span
              style={{}}
              className={`text-[14px] ${
                currentPath === "orders" ? "text-black" : "text-gray-500"
              } font-medium`}
            >
              Orders
            </span>
          </div>

          {/* Users Menu */}
          <div
            onClick={() => navigate("/admin/users")}
            className="flex mt-8 w-full flex-row cursor-pointer items-center space-x-4"
          >
            <div
              className={`flex flex-col justify-center ${
                currentPath === "users" ? "bg-[#07CE4E]" : "bg-[#38383D]"
              } items-center p-1 rounded-md`}
            >
              <UsersIcon className="size-5 text-white" />
            </div>
            <span
              style={{}}
              className={`text-[14px] ${
                currentPath === "users" ? "text-black" : "text-gray-500"
              } font-medium`}
            >
              Users
            </span>
          </div>

          {/* Products Menu */}
          <div
            onClick={() => navigate("/admin/products")}
            className="flex mt-8 w-full flex-row cursor-pointer items-center space-x-4"
          >
            <div
              className={`flex flex-col justify-center ${
                currentPath === "products" ? "bg-[#07CE4E]" : "bg-[#38383D]"
              } items-center p-1 rounded-md`}
            >
              <CubeIcon className="size-5 text-white" />
            </div>
            <span
              style={{}}
              className={`text-[14px] ${
                currentPath === "products" ? "text-black" : "text-gray-500"
              } font-medium`}
            >
              Products
            </span>
          </div>

          <span
            onClick={() => navigate("/")}
            style={{}}
            className="text-red-600 cursor-pointer font-medium absolute bottom-10"
          >
            Exit Admin Panel
          </span>
        </div>
        {/* <Header /> */}
        <div className="w-full bg-white lg:w-[78%] scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-white overflow-y-scroll flex flex-col h-screen lg:bg-[#EFF3F8] lg:px-[30px]">
          <AdminHeader />
          <div className="flex p-[14px] lg:p-[24px] flex-col w-full">
            <h2
              className="text-xl hidden lg:block mb-0 font-semibold"
              style={{ fontWeight: 600 }}
            >
              Edit Product
            </h2>

                          <div className="lg:bg-white mt-3 w-full lg:p-[24px]">
                {!isInitialized ? (
                  <div className="w-full flex flex-col justify-center items-center h-[200px]">
                    <span className="text-lg font-medium">
                      Loading...
                    </span>
                    <CircularProgress size={60} sx={{ color: "black", mt: 1 }} />
                  </div>
                ) : fetchLoading ? (
                  <div className="w-full flex flex-col justify-center items-center h-[200px]">
                    <span className="text-lg font-medium">
                      Loading Product...
                    </span>
                    <CircularProgress size={60} sx={{ color: "black", mt: 1 }} />
                  </div>
                ) : loading ? (
                <div className="w-full flex flex-col justify-center items-center h-[200px]">
                  <span className="text-lg font-medium">
                    Creating Product...
                  </span>
                  <CircularProgress size={60} sx={{ color: "black", mt: 1 }} />
                </div>
              ) : (
                <form className="mt-0">
                  {/* NAME */}
                  <div className="space-y-2 mb-10">
                    <div className="text-sm font-semibold text-gray-700 tracking-wide">
                      Name*
                    </div>
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-2 outline outline-[#bdbfbf] hover:outline-black focus:outline-black transition-all duration-500 text-base py-[8px] px-[12px]"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>

                  {/* IMAGES */}
                  <div className="space-y-2 mb-10">
                    <div className="text-sm font-semibold text-gray-700 tracking-wide">
                      Images* (Max 4)
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Note: Image upload functionality needs to be implemented. Currently using placeholder images.
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 items-center space-x-1 lg:gap-x-5">
                      {img.map((item, idx) => (
                        <div className="flex relative" key={item}>
                          <img
                            src={item}
                            alt=""
                            className="w-[250px] h-[150px] lg:h-[250px] object-cover"
                          />
                          <XCircleIcon
                            onClick={() => {
                              setImg((prev) =>
                                prev.filter((_, i) => i !== idx)
                              );
                              setImageFiles((prev) =>
                                prev.filter((_, i) => i !== idx)
                              );
                            }}
                            className="absolute cursor-pointer bg-white rounded-full size-5 lg:size-8 top-1 right-1 text-black"
                          />
                        </div>
                      ))}
                      {img.length < 4 && (
                        <input
                          type="file"
                          title="Choose image"
                          onChange={handleImageChange}
                          multiple
                          accept="image/*"
                        />
                      )}
                    </div>
                    {errors.img && <p className="text-red-500 text-xs">{errors.img}</p>}
                  </div>

                  {/* PRICE */}
                  <div className="space-y-2 mb-10">
                    <div className="text-sm font-semibold text-gray-700 tracking-wide">
                      Price*
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Product Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full outline outline-[#bdbfbf] hover:outline-black focus:outline-black transition-all duration-500 py-[8px] px-[12px]"
                      required
                    />
                    {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                  </div>

                  {/* DISCOUNT PRICE */}
                  <div className="space-y-2 mb-10">
                    <div className="text-sm font-semibold text-gray-700 tracking-wide">
                      Discount Price
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Discount Price (Optional)"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      className="w-full outline outline-[#bdbfbf] hover:outline-black focus:outline-black transition-all duration-500 py-[8px] px-[12px]"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="space-y-2 mb-10">
                    <div className="text-sm font-semibold text-gray-700 tracking-wide">
                      Description
                    </div>
                    <textarea
                      value={desc}
                      rows={3}
                      placeholder="Product Description"
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full outline outline-[#bdbfbf] hover:outline-black focus:outline-black transition-all duration-500 py-[8px] px-[12px]"
                    />
                  </div>

                  {/* STOCK STATUS & BEST SELLER */}
                  <div className="space-y-2 mb-10">
                    <div className="text-sm font-semibold text-gray-700 tracking-wide">
                      Product Settings
                    </div>
                    <div className="flex flex-col lg:flex-row gap-3">
                      <label className="flex justify-between items-center p-3 bg-white border border-[#ecf0f4] w-full lg:w-[49%]">
                        <span className="text-sm">In Stock</span>
                        <input
                          type="checkbox"
                          checked={inStock}
                          onChange={(e) => setInStock(e.target.checked)}
                        />
                      </label>
                      <label className="flex justify-between items-center p-3 bg-white border border-[#ecf0f4] w-full lg:w-[49%]">
                        <span className="text-sm">Best Seller</span>
                        <input
                          type="checkbox"
                          checked={bestSellers}
                          onChange={(e) => setBestSellers(e.target.checked)}
                        />
                      </label>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-row items-center justify-between">
                    <button
                      onClick={submitHandler}
                      type="submit"
                      className="bg-black cursor-pointer mt-5 px-5 py-3 text-white w-full lg:w-[30%]"
                    >
                      Edit Product
                    </button>
                    <button
                      onClick={deleteProduct}
                      type="button"
                      className="bg-red-500 cursor-pointer mt-5 px-5 py-3 text-white w-full lg:w-[30%]"
                    >
                      Delete Product
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditProductScreen;
