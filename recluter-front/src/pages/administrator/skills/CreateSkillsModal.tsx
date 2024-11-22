import React from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface CreateSkillsModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateSkills: (values: { sector: string }) => void;
}

const CreateSkillsModal: React.FC<CreateSkillsModalProps> = ({ visible, onCancel, onCreateSkills }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateSkills(values);
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
          name="aptitud"
          label="Aptitud Name"
          rules={[{ required: true, message: 'Please input the skills name!' }]}
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

export default CreateSkillsModal;