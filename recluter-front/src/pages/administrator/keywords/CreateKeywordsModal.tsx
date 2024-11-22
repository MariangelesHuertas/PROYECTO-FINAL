import React from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface CreateKeywordModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateKeyword: (values: { sector: string }) => void;
}

const CreateKeywordsModal: React.FC<CreateKeywordModalProps> = ({ visible, onCancel, onCreateKeyword }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateKeyword(values);
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
          name="palabra"
          label="Keyword Name"
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

export default CreateKeywordsModal;