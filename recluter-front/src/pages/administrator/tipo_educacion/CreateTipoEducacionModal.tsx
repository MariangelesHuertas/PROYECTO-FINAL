import React from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface CreateTipoEducacionModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateTipoEducacion: (values: { sector: string }) => void;
}

const CreateTipoEducacionModal: React.FC<CreateTipoEducacionModalProps> = ({ visible, onCancel, onCreateTipoEducacion }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateTipoEducacion(values);
      form.resetFields();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title="Create New Tipo Educacion"
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
          name="tipo_educacion"
          label="Tipo de Educacion"
          rules={[{ required: true, message: 'Please input the keyword name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTipoEducacionModal;