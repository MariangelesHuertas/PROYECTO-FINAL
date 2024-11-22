import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { GetTipoUsuarioTableReducer } from '../../../redux/actions/common/TipoUsuario/TipoUsuario';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';

interface CreateUsersModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateUsers: (values: { users: string }) => void;
}

const { Option } = Select;

const CreateUsersModal: React.FC<CreateUsersModalProps> = ({ visible, onCancel, onCreateUsers }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { rex_tipo_usuario } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;

  useEffect(() => {
    dispatch(GetTipoUsuarioTableReducer('', currentPage, pageSize));
  }, [currentPage, pageSize, dispatch]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateUsers(values);
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
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: 'Please input the sector name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="apellido_paterno"
          label="Apellido Paterno"
          rules={[{ required: true, message: 'Please input the sector name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="apellido_materno"
          label="Apellido Materno"
          rules={[{ required: true, message: 'Please input the sector name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="usuario"
          label="Usuario"
          rules={[{ required: true, message: 'Please input the sector name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input the sector name!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="contrasena"
          label="Contraseña"
          rules={[{ required: true, message: 'Please input the sector name!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
              name="tipo_usuario_id"
              label="Tipo de Usuario"
              rules={[{ required: true, message: 'Please select the user type!' }]}
            >
              <Select>
                {rex_tipo_usuario.map((tipoUsuario: any) => (
                  <Option key={tipoUsuario.id} value={tipoUsuario.id}>{tipoUsuario.tipo_usuario}</Option>
                ))}
              </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUsersModal;