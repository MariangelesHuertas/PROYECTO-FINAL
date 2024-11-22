import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface CreateCentrosEducativosModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateCentrosEducativos: (values: { sector: string }) => void;
}

const CreateCentrosEducativosModal: React.FC<CreateCentrosEducativosModalProps> = ({ visible, onCancel, onCreateCentrosEducativos }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateCentrosEducativos(values);
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
          name="centro_educativo"
          label="Centro Educativo"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ubicacion"
          label="Ubicacion"
          rules={[{ required: true, message: 'Please input the ubicacion!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCentrosEducativosModal;