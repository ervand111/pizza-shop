import React, {useEffect, useState} from 'react';
import {Form, Input, Checkbox, Select, Button, message, Upload} from 'antd';
import {DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getSubCategories} from "../../../store/category/actions";
import {addProduct} from "../../../store/products/actions";
import {getBlogs} from "../../../store/blog/actions";
import {compressImage} from "../../../utils/utils";
import VariantForm from "../../../components/admin/VariantForm";

const {Option} = Select;

const Add = () => {
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.category?.subCategories?.data);
  const categories = useSelector((state) => state.category?.categories);
  const blogs = useSelector((state) => state.blog?.blogs);
  const isAdd = useSelector((state) => state?.product.isAdding);
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [variants, setValues] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false)
  const [parent_id, setParentId] = useState(null)

  useEffect(() => {
    dispatch(getBlogs.request());
    dispatch(getCategories.request())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubCategories.request({id: parent_id}));
  }, [parent_id, dispatch]);

  const normFile = (e) => {
    console.log(e)
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage || Upload.LIST_IGNORE;
  };
  const handleAvatarChange = async (info) => {
    const file = info.fileList[0]?.originFileObj;
    if (file instanceof Blob) {
      const compressedAvatarFile = await compressImage(file);
      setAvatarFile(compressedAvatarFile);
    }
  };

  const handleImagesChange = async (info) => {
    const fileList = [...info.fileList];
    const compressedImages = [];

    for (const file of fileList) {
      const compressedImage = await compressImage(file.originFileObj);
      compressedImages.push(compressedImage);
    }
    setImageFiles(compressedImages);
    setImagePreviews(compressedImages.map(file => URL.createObjectURL(file)));
  };

  function callBackGetValues(variantValues) {
    setValues(variantValues);
  }

  const handleSubmit = (values) => {
    const formData = new FormData();
    if (values.important === undefined) {
      values.important = 0;
    }
    formData.append('title', values.title);
    formData.append('description', values.description);

    formData.append('important', values.important);
    formData.append('variants', JSON.stringify(variants));

    formData.append('category_id', JSON.stringify(values.category_id));
    formData.append('blog_id', values.blog_id !== undefined ? parseInt(values.blog_id) : 0);
    formData.append('price', parseInt(values.price));

    if (imageFiles.length > 0) {
      imageFiles.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    setIsSubmit(true);
    dispatch(addProduct.request(formData));

  };
  useEffect(() => {
    if (isAdd === false && isSubmit) {
      message.success('Product successfully added!');
      form.resetFields();
      setImageFiles([]);
      setImagePreviews([]);
      setAvatarFile(null);
      setAvatarPreview("");
      setIsSubmit(false)
      setValues(null)
    }
  }, [form, isAdd, isSubmit]);
  return (
    <App>
      <h1>Add Product</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name product"
          name="title"
          rules={[{required: true, message: 'Please enter the name'}]}
        >
          <Input placeholder="Enter the Title"/>
        </Form.Item>

        <Form.Item
          label="Parent Category"
          name="parent_category_id"
          rules={[{required: true, message: 'Please select a category'}]}
        >
          <Select
            onChange={(value) => setParentId(value)} // Fix: Use `value` directly, no need for `e.target.value`
            placeholder="Select a category"
          >
            {categories?.length > 0 ?
              categories.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))
              :
              null
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="Category"
          name="category_id"
          rules={[{required: true, message: 'Please select a category'}]}
        >
          <Select
            mode="multiple" // Change to multiple mode
            placeholder="Select categories"
          >
            {subs?.length > 0 ?
              subs.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))
              :
              null
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Info of pizza"
          name="description"
          rules={[{required: true, message: 'Please enter the info'}]}
        >
          <Input.TextArea placeholder="Enter the Info"/>
        </Form.Item>

        <Form.Item
          label="New or Best"
          name="important"
        >
          <Select defaultValue={0}>
            <Option value={0}>Norm Product</Option>
            <Option value={2}>New</Option>
            <Option value={1}>Best</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Blog"
          name="blog_id"
        >
          <Select placeholder="Select a Blog">
            {blogs?.length > 0 ?
              blogs.map(blog => (
                <Option key={blog.id} value={blog.id}>
                  {blog.title}
                </Option>
              ))
              :
              null
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="avatar"
            listType="picture"
            beforeUpload={beforeUpload}
            maxCount={1}
            onChange={handleAvatarChange}
          >
            <Button icon={<UploadOutlined/>}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Images" name="images"
                   valuePropName="fileList"
                   getValueFromEvent={normFile}
        >
          <Upload
            accept="image/*"
            multiple
            fileList={imageFiles.map((file, index) => ({uid: index, originFileObj: file}))}
            onChange={handleImagesChange}
            beforeUpload={beforeUpload}
            listType="picture"
            name="images"
          >
            <Button icon={<UploadOutlined/>}>Upload Images</Button>
          </Upload>
        </Form.Item>

        <VariantForm callback={callBackGetValues}/>
        <Form.Item
          label="Discount"
          name="discount"
        >
          <Input placeholder="Enter the Discount"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" disabled={isAdd} htmlType="submit">
            {isAdd ? "Adding..." : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </App>
  );
};

export default Add;

