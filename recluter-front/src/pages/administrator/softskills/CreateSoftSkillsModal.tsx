import React from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface CreateSoftSkillsModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateSoftSkills: (values: { softskills: string }) => void;
}

const CreateSoftSkillsModal: React.FC<CreateSoftSkillsModalProps> = ({ visible, onCancel, onCreateSoftSkills }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateSoftSkills(values);
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
          name="soft_skill"
          label="Soft Skill"
          rules={[{ required: true, message: 'Please input the sector name!' }]}
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

export default CreateSoftSkillsModal;