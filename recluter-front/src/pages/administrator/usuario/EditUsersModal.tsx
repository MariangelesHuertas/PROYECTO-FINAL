import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber, Select } from 'antd';
import { useSelector } from 'react-redux';

interface EditUsersModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditUsers: (id: number, values: any) => void;
  initialValues?: any;
  UsersId?: number;
}

const { Option } = Select;

const EditUsersModal: React.FC<EditUsersModalProps> = ({
  visible,
  onCancel,
  onEditUsers,
  initialValues,
  UsersId
}) => {
  const { rex_tipo_usuario } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios)
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (UsersId) {
        onEditUsers(UsersId, values);
        form.resetFields();
      }
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title="Editar Usuario"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Actualizar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: false, message: 'Por favor ingrese el nombre' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="apellido_paterno"
          label="Apellido Paterno"
          rules={[{ required: false, message: 'Por favor ingrese el apellido paterno' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="apellido_materno"
          label="Apellido Materno"
          rules={[{ required: false, message: 'Por favor ingrese el apellido materno' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="usuario"
          label="Nombre de Usuario"
          rules={[{ required: false, message: 'Por favor ingrese el nombre de usuario' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="contrasena"
          label="Contraseña"
          rules={[
            { required: false, message: 'Por favor ingrese la contraseña' },
            { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
          ]}
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

        <Form.Item
          name="imagen"
          label="URL de Imagen"
          rules={[{ required: false, message: 'Por favor ingrese la URL de la imagen' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="imagen_banner"
          label="URL de Imagen Banner"
          rules={[{ required: false, message: 'Por favor ingrese la URL de la imagen banner' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUsersModal;