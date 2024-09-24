/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, List, Modal, Pagination, Skeleton } from "antd";
import React, { useState } from "react";
import {
  useAddNewProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../redux/Products/Products";
import Title from "../../components/Title";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Toaster, toast } from "sonner"; 

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);

  const showUpdateModal = (updateData : any) => {
    setUpdateformData(updateData)
    setisUpdateModalOpen(true);
  };

  const UpdatehandleOk = () => {
    setisUpdateModalOpen(false);
  };

  const handleCancelUpdateModel = () => {
    setisUpdateModalOpen(false);
  };

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    rating: "",
    image: "",
    age: "",
    height: "",
    sunlight_requirement: "",
    growth_rate: "",
  });

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [AddProduct] = useAddNewProductMutation();

  const handleReset = () => {
    setFormData({
      title: "",
      price: "",
      quantity: "",
      category: "",
      description: "",
      rating: "",
      image: "",
      age: "",
      height: "",
      sunlight_requirement: "",
      growth_rate: "",
    });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();

    AddProduct(formData)
      .then((data : any) => {
        console.log(data);
        handleOk();
        if (data.error.status == 404) {
          toast.info("This Product Allready Exists!");
          handleReset();
        }
        toast.success(data.data.message);
        handleReset();
      })
      .catch((err) => toast.error(err.data.message));
  };

  // update handler 
  const [UpdateformData, setUpdateformData] = useState({
    title: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    rating: "",
    image: "",
    age: "",
    height: "",
    sunlight_requirement: "",
    growth_rate: "",
  });

  const handleUpdateformReset = () => {
    setUpdateformData({
      title: "",
      price: "",
      quantity: "",
      category: "",
      description: "",
      rating: "",
      image: "",
      age: "",
      height: "",
      sunlight_requirement: "",
      growth_rate: "",
    });
  };

  const handleUpdateInputChange = (e: any) => {
    setUpdateformData({
      ...UpdateformData,
      [e.target.name]: e.target.value,
    });
  };

  const [UpdateProduct] = useUpdateProductMutation()

  const UpdateProductHandler = (e: any) => {
    e.preventDefault();
    UpdateProduct(UpdateformData)
    handleUpdateformReset()
    handleCancelUpdateModel()
  }

  const [CurrentPage, setCurrentPage] = useState(1);
  
  const onChange = (page: React.SetStateAction<number>, pageSize: number) => {
    console.log(page, pageSize);
    setCurrentPage(page);
  };

  const { data, isLoading } = useGetProductQuery({  page : CurrentPage,
    Limit: 10 });

  const [DeleteProduct] = useDeleteProductMutation();

  const DeleteHandler = (id: string) => {
    const toastid = toast.loading("Loading...", { duration: 2000 });
    DeleteProduct(id);
    toast.success("Product Deleted", { id: toastid, duration: 2000 });
  };

  return (
    <section>
      <Toaster richColors position="top-right" />
      <Title text={`"Product & Category Managment"`}></Title>
      <div>
        <Button
          className="mt-1 mr-2 px-8 py-2 bg-green-500 text-white text-lg rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={showModal}
        >
          Add More Tree
        </Button>
      </div>
      <div className="p-4">
        <List
          className="demo-loadmore-list"
          loading={isLoading}
          itemLayout="horizontal"
          dataSource={data?.Data}
          renderItem={(item : any) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">
                  <Button className="border-none" onClick={() => showUpdateModal(item)}>
                    <FaEdit className="text-blue-600 text-xl" />
                  </Button>
                </a>,
                <a
                  key="list-loadmore-more "
                  onClick={() => DeleteHandler(item._id)}
                  className="text-red-600 text-xl"
                >
                  <FaTrashAlt />
                </a>,
              ]}
            >
              <Skeleton
                avatar
                className=""
                title={false}
                loading={isLoading}
                active
              >
                <img className="w-20 h-20 mr-5" src={item.image} alt="" />
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={`$${item.price}`}
                />
                <div className="flex justify-around gap-10">
                  <div className="text-slate-500">{item.description}</div>
                  <div>{item.category}</div>
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>

      <div className="flex items-center justify-center">
          <Pagination
            total={data?.total}
            current={CurrentPage}
            onChange={(page, pageSize) => onChange(page, pageSize)}
          />
      </div>

      {/* Add product model  */}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-6">Add Tree Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Tree Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter tree title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            {/* Category Input */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="category"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="Enter category (e.g., Fruit Trees)"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="price">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            {/* Quantity Input */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="quantity"
              >
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity in stock"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                required
              />
            </div>

            {/* Rating Input */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="rating"
              >
                Rating (out of 5)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                max="5"
                placeholder="Enter product rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            {/* Description Input */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
                rows={4}
                required
              />
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="image">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="url"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            {/* Height Input */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="height"
              >
                Height (ft)
              </label>
              <input
                id="height"
                name="height"
                type="text"
                placeholder="Enter height (e.g., 10-15 ft)"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            {/* Age Input */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="age">
                Age (years)
              </label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="Enter tree age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            {/* Sunlight Requirement Input */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="sunlight_requirement"
              >
                Sunlight Requirement
              </label>
              <input
                id="sunlight_requirement"
                name="sunlight_requirement"
                type="text"
                placeholder="Enter sunlight requirement (e.g., Full Sun)"
                value={formData.sunlight_requirement}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            {/* Growth Rate Input */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="growth_rate"
              >
                Growth Rate
              </label>
              <input
                id="growth_rate"
                name="growth_rate"
                type="text"
                placeholder="Enter growth rate (e.g., Medium)"
                value={formData.growth_rate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
              >
                Add Tree Product
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* update product model  */}

      <Modal 
        open={isUpdateModalOpen}
        onOk={UpdatehandleOk}
        onCancel={handleCancelUpdateModel}
      >
        <form onSubmit={UpdateProductHandler} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Update Tree Product
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
             onChange={handleUpdateInputChange}
             value={UpdateformData.title}
              type="text"
              id="title"
              name="title"
              placeholder="Enter Tree Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
             onChange={handleUpdateInputChange}
             value={UpdateformData.category}
              type="text"
              id="category"
              name="category"
              placeholder="Enter Category"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
             onChange={handleUpdateInputChange}
             value={UpdateformData.price}
              type="number"
              id="price"
              name="price"
              placeholder="Enter Price"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
             onChange={handleUpdateInputChange}
             value={UpdateformData.quantity}
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter Quantity"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
             onChange={handleUpdateInputChange}
             value={UpdateformData.description}
              id="description"
              name="description"
              rows={4}
              placeholder="Enter Tree Description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rating"
            >
              Rating
            </label>
            <input
             onChange={handleUpdateInputChange}
             value={UpdateformData.rating}
              type="number"
              id="rating"
              name="rating"
              placeholder="Enter Rating (1-5)"
              min="1"
              max="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image URL
            </label>
            <input
             onChange={handleUpdateInputChange}
             value={UpdateformData.image}
              type="url"
              id="image"
              name="image"
              placeholder="Enter Image URL"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="growthRate"
            >
              Growth Rate
            </label>
            <input
              onChange={handleUpdateInputChange}
              value={UpdateformData.growth_rate}
              type="text"
              id="growthRate"
              name="growthRate"
              placeholder="Enter Growth Rate"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Update Product
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Dashboard;
