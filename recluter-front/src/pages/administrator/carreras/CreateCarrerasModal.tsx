import React from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface CreateCarrerasModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateCarreras: (values: { sector: string }) => void;
}

const CreateCarrerasModal: React.FC<CreateCarrerasModalProps> = ({ visible, onCancel, onCreateCarreras }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateCarreras(values);
      form.resetFields();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title="Create New Keyword"
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
          name="carrera"
          label="Carrera Name"
          rules={[{ required: true, message: 'Please input the keyword name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="aprobado"
          label="¿Aprobado?"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch checkedChildren="Sí" unCheckedChildren="No" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCarrerasModal;