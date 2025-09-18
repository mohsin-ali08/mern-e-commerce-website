import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  Spin,
  message,
  Modal,
  Popconfirm,
} from "antd";

const { Option } = Select;

export const UserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([
    {
      key: 1,
      name: "Mohsin Ali",
      email: "mohsinali@gmail.com",
      role: "Admin",
    },
  ]);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add User
  const handleAddUser = (values) => {
    setLoading(true);
    setTimeout(() => {
      const newUser = {
        key: users.length + 1,
        ...values,
      };
      setUsers([...users, newUser]);

      console.log("All Users:", [...users, newUser]);
      console.log("New User Added:", newUser);

      setLoading(false);
      messageApi.success("User added successfully ✅");
      form.resetFields();
    }, 1000);
  };

  // Delete User
  const handleDelete = (key) => {
    setUsers(users.filter((user) => user.key !== key));
    messageApi.success("User deleted successfully 🗑️");
  };

  // Open Edit Modal
  const handleEdit = (record) => {
    setEditingUser(record);
    setIsModalOpen(true);
  };

  // Save Edited User
  const handleSaveEdit = (values) => {
    const updatedUser = { ...editingUser, ...values };

    setUsers(
      users.map((user) =>
        user.key === editingUser.key ? updatedUser : user
      )
    );

    console.log("Updated User:", updatedUser);

    messageApi.success("User updated successfully ✏️");
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md", "lg"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span
          className={`px-2 py-1 rounded text-white text-sm ${
            role === "Admin"
              ? "bg-indigo-600"
              : role === "Editor"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {role}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="link"
            className="text-green-600"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {contextHolder}

      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Add User Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
          className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input className="py-2" placeholder="Enter user name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input className="py-2" placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password className="py-2" placeholder="Enter password" />
          </Form.Item>

          <Form.Item label="Role" name="role" initialValue="Customer">
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Customer">Customer</Option>
              <Option value="Editor">Editor</Option>
            </Select>
          </Form.Item>

          <div className="md:col-span-4 flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500"
            >
              {loading ? <Spin size="small" /> : "Add User"}
            </Button>
          </div>
        </Form>
      </div>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Users List</h3>
        <Table
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 5 }}
          bordered
          scroll={{ x: true }}
        />
      </div>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {editingUser && (
          <Form
            layout="vertical"
            initialValues={editingUser}
            onFinish={handleSaveEdit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Role" name="role">
              <Select>
                <Option value="Admin">Admin</Option>
                <Option value="Customer">Customer</Option>
                <Option value="Editor">Editor</Option>
              </Select>
            </Form.Item>

            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};
