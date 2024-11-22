import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface CreateIdiomasModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateIdiomas: (values: { sector: string }) => void;
}

const CreateIdiomasModal: React.FC<CreateIdiomasModalProps> = ({ visible, onCancel, onCreateIdiomas }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateIdiomas(values);
      form.resetFields();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title="Create New Sector"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleOk}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="idioma"
          label="Idioma"
          rules={[{ required: true, message: 'Please input the sector name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateIdiomasModal;