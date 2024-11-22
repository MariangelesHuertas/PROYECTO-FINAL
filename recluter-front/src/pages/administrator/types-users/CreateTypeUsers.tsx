import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetTypePermissionReducer } from '../../../redux/actions/common/permissions/Permissions';
import { AppDispatch } from '../../../redux/store/store';

interface CreateTypeUsersModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateSkills: (values: { sector: string }) => void;
}

const CreateTypeUsersModal: React.FC<CreateTypeUsersModalProps> = ({ visible, onCancel, onCreateSkills }) => {
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
      title="Create Tipo de Usuario"
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
          name="tipo_usuario"
          label="Tipo de Usuario"
          rules={[{ required: true, message: 'Please input the type user name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTypeUsersModal;