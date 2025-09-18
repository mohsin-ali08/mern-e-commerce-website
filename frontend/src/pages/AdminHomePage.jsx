import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Spin, Table, Tag } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const AdminHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          _id: "ORD-12356",
          user: { name: "Mohsin Ali" },
          totalPrice: 120,
          status: "Processing",
        },
        {
          _id: "ORD-78945",
          user: { name: "Ali Khan" },
          totalPrice: 250,
          status: "Completed",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User",
      dataIndex: ["user", "name"],
      key: "user",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => <span>${price}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Processing"
              ? "orange"
              : "blue"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className="font-bold text-3xl mb-6">📊 Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md">
          <div className="flex items-center gap-4">
            <DollarOutlined className="text-green-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Revenue</h2>
              <p className="text-2xl font-bold">$10,000</p>
            </div>
          </div>
        </Card>

        <Card className="shadow-md">
          <div className="flex items-center gap-4">
            <ShoppingCartOutlined className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Total Orders</h2>
              <p className="text-2xl font-bold">200</p>
              <Link
                to="/admin/orders"
                className="text-blue-500 hover:underline text-sm"
              >
                Manage Orders
              </Link>
            </div>
          </div>
        </Card>

        <Card className="shadow-md">
          <div className="flex items-center gap-4">
            <AppstoreOutlined className="text-purple-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Total Products</h2>
              <p className="text-2xl font-bold">100</p>
              <Link
                to="/admin/products"
                className="text-blue-500 hover:underline text-sm"
              >
                Manage Products
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <h2 className="text-2xl font-bold mb-4">📦 Recent Orders</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" tip="Loading orders..." />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="_id"
            pagination={false}
            scroll={{ x: true }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
