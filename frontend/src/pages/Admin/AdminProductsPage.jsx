import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getProductsAdmin, createProductAdmin, updateProductAdmin, deleteProductAdmin } from '../../api/api';

const { Option } = Select;

import './AdminProductsPage.css';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductsAdmin();
      // data may have shape { count, rows }
      const list = Array.isArray(data.rows) ? data.rows : [];
      setProducts(list);
    } catch (error) {
      message.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submit
  const handleSubmit = async (values) => {
    try {
      if (editingProduct) {
        await updateProductAdmin(editingProduct.id, values);
        message.success('Product updated successfully');
      } else {
        await createProductAdmin(values);
        message.success('Product created successfully');
      }
      setModalVisible(false);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteProductAdmin(id);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  // Table columns
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Category',
      key: 'category',
      render: (_, record) => record.Category?.name || '-',
    },
    {
      title: 'Brand',
      key: 'brand',
      render: (_, record) => record.Brand?.name || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setEditingProduct(record);
              // Pre-fill form fields
              form.setFieldsValue({
                name: record.name,
                price: record.price,
                description: record.description,
                category_id: record.category_id,
                brand_id: record.brand_id,
              });
              setModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Product Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingProduct(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="electronics">Electronics</Option>
              <Option value="clothing">Clothing</Option>
              <Option value="books">Books</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="brand_id"
            label="Brand"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="apple">Apple</Option>
              <Option value="samsung">Samsung</Option>
              <Option value="sony">Sony</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="images"
            label="Images"
          >
            <Upload
              listType="picture"
              maxCount={5}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProduct ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProductsPage;