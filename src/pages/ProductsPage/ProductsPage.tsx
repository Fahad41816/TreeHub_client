/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import Title from "../../components/Title";
import { useGetProductQuery } from "../../redux/Products/Products";
import ProductCard from "../../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import {  Pagination, Spin } from "antd";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  let search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  console.log(search, category);

  const [CurrentPage, setCurrentPage] = useState(1);

  const onChange = (page : number, pageSize: number) => {
    console.log(page, pageSize);
    setCurrentPage(page);
  };

  const [Search, setSearch] = useState(search);

  const [showSearch, setShowSearch] = useState(false); 

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setSearch("");
  };

 

  const { data: TreeData, isLoading } = useGetProductQuery({
    search: Search,
    category :  Search ? "" : category,
    page: CurrentPage,
    Limit: 10,
  });

  if (isLoading) {
    return (
      <Spin fullscreen />
    );
  }

  return (
    <section>
      <Title text={`"Our Tree Collection"`}></Title>
      <div className="relative ml-4">
        {/* Search Icon */}
        {!showSearch && (
          <button
            className="text-green-600 border border-green-400 p-4 ml-4 hover:text-gray-900 focus:outline-none"
            onClick={handleSearchToggle}
          >
            <FaSearch size={20} />
          </button>
        )}

        {/* Search Input */}
        {showSearch && (
          <div className="flex items-center">
            <form  className="relative">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition w-64"
                placeholder="Search products..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FaSearch size={16} />
              </button>
            </form>
            <button
              className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={handleSearchToggle}
            >
              ✖
            </button>
          </div>
        )}
      </div>
      {TreeData?.Data?.length == 0 && (
        <div className="text-2xl text-green-500 text-center p-40">
          No Product Found!
        </div>
      )}
      <div className="w-full  grid  grid-cols-1 md:grid-cols-3 p-2 md:p-5 items-center justify-center gap-5">
        {TreeData?.Data?.map((data: any) => (
          <ProductCard
            key={data.id}
            redirectLink={`/product/${data._id}`}
            TreeData={data}
          ></ProductCard>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Pagination
          total={TreeData?.total}
          current={CurrentPage}
          onChange={(page, pageSize) => onChange(page, pageSize)}
        />
      </div>
    </section>
  );
};

export default ProductsPage;
