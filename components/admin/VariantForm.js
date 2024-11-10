// components/VariantForm.js
import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const VariantForm = ({callback}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variants, setVariants] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setVariants([...variants, values]);
        setIsModalOpen(false);
        callback([...variants, values]);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Variant
      </Button>
      <Modal
        title="Add Variant"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name of Variant"
            name="variantName"
            rules={[{ required: true, message: 'Please enter the variant name' }]}
          >
            <Input placeholder="Enter variant name" />
          </Form.Item>
          <Form.Item
            label="Value of Variant"
            name="variantValue"
            rules={[{ required: true, message: 'Please enter the variant value' }]}
          >
            <Input placeholder="Enter variant value" />
          </Form.Item>
          <Form.Item
            label="Price of Variant"
            name="variantPrice"
            rules={[{ required: true, message: 'Please enter the variant Price' }]}
          >
            <Input placeholder="Enter variant Price" />
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ marginTop: 20 }}>
        {variants.map((variant, index) => (
          <div key={index}>
            {index + 1}. {variant.variantName}: {variant.variantValue}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantForm;
