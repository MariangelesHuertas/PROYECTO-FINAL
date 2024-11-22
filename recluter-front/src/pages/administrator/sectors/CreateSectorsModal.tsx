import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface CreateSectorModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateSector: (values: { sector: string }) => void;
}

const CreateSectorModal: React.FC<CreateSectorModalProps> = ({ visible, onCancel, onCreateSector }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateSector(values);
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
          name="sector"
          label="Sector Name"
          rules={[{ required: true, message: 'Please input the sector name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSectorModal;