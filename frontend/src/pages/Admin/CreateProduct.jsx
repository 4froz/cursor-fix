import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  CubeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  TrashIcon,
  UsersIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import AdminHeader from "../../components/Admin/AdminHeader";
import axios from "axios";
import { Server } from "../../consts";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFirebaseToken, selectIsAuthenticated, selectIsInitialized } from "../../redux/authSlice";
import { supabase } from "../../supabaseClient";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState([]); // this is your uploaded image URLs
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [inStock, setInStock] = useState(true);
  const [bestSellers, setBestSellers] = useState(false);
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // imageFiles is for new uploads, not in schema
  const [imageFiles, setImageFiles] = useState([]);

  const location = useLocation(); // Access the current location
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

  const uploadImages = async (files) => {
    const imageUrls = [];
    
    for (let file of files) {
      const fileName = `public/${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;
      
      // Try to upload to 'verre-images' bucket
      const { data, error } = await supabase.storage
        .from('verre-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Upload failed:", error);
        if (error.message.includes('new row violates row-level security')) {
          console.log("RLS policy blocking upload. Check if file is JPG and being uploaded to public folder.");
        }
        throw error;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('verre-images')
        .getPublicUrl(fileName);

      imageUrls.push(publicUrl);
    }
    return imageUrls;
  };

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

  const { id } = useParams();
  console.log(id);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setloading(true);
    try {
      // Upload new files (stored in imageFiles)
      const newImageUrls = await uploadImages(imageFiles);

      // Only keep existing Supabase URLs
      const existingImages = img.filter((url) => url.startsWith("http"));
      const allImages = [...existingImages, ...newImageUrls];

      const headers = getAuthHeaders();
      
      await axios.post(`${Server}/api/products/admin`, {
        name: name.trim(),
        desc: desc.trim(),
        img: allImages,
        price: parseFloat(price),
        discountPrice: parseFloat(discountPrice) || 0,
        inStock,
        bestSellers,
      }, {
        headers,
        withCredentials: true,
      });

      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (error) {
      handleApiError(error, "Create product");
      alert("Failed to create product. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <>
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
              Create Product
            </h2>

            <div className="lg:bg-white mt-3 w-full lg:p-[24px]">
              {!isInitialized ? (
                <div className="w-full flex flex-col justify-center items-center h-[200px]">
                  <span className="text-lg font-medium">
                    Loading...
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
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            title="Choose image"
                            onChange={handleImageChange}
                            multiple
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                          />
                          <label 
                            htmlFor="image-upload" 
                            className="cursor-pointer flex flex-col items-center space-y-2"
                          >
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="text-sm text-gray-600">Click to upload images</span>
                            <span className="text-xs text-gray-500">Max {4 - img.length} more</span>
                          </label>
                        </div>
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
                      Create Product
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;