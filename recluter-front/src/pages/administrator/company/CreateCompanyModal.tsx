import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { AppDispatch } from '../../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetSectorsTableReducer } from '../../../redux/actions/common/sectors/Sectors';
import { GetTipoUsuarioTableReducer } from '../../../redux/actions/common/TipoUsuario/TipoUsuario';

interface CreateCompanyModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateEmpresas: (values: any) => void;
}

const { Option } = Select;

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({ 
  visible, onCancel, onCreateEmpresas }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { rex_sectors } = useSelector(({ sectors }: any) => sectors)
  const { rex_tipo_usuario } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;

  useEffect(() => {
    dispatch(GetSectorsTableReducer('', currentPage, pageSize));
    dispatch(GetTipoUsuarioTableReducer('', currentPage, pageSize));
  }, [currentPage, pageSize, dispatch]);

  useEffect(() => {
    if (rex_tipo_usuario && rex_tipo_usuario.length > 0) {
      const empresaOption = rex_tipo_usuario.find(
        (tipo: any) => tipo.tipo_usuario.toLowerCase() === 'empresa'
      );
      
      if (empresaOption) {
        form.setFieldValue('tipo_usuario_id', empresaOption.id);
      }
    }
  }, [rex_tipo_usuario, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateEmpresas(values);
      form.resetFields();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title="Create New Company"
      visible={visible}
      onCancel={onCancel}
      width={800}
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
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h3>User Information</h3>
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="apellido_paterno"
              label="Apellido Paterno"
              rules={[{ required: true, message: 'Please input the paternal surname!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="apellido_materno"
              label="Apellido Materno"
              rules={[{ required: true, message: 'Please input the maternal surname!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input the email!' },
                { type: 'email', message: 'Please input a valid email!' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="contrasena"
              label="Contraseña"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="tipo_usuario_id"
              label="Tipo de Usuario"
              rules={[{ required: true, message: 'Please select the user type!' }]}
            >
              <Select
                disabled={true}
                className="cursor-not-allowed"
              >
                {rex_tipo_usuario.map((tipoUsuario: any) => (
                  <Option key={tipoUsuario.id} value={tipoUsuario.id}>{tipoUsuario.tipo_usuario}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <h3>Company Information</h3>
            <Form.Item
              name="empresa"
              label="Empresa"
              rules={[{ required: true, message: 'Please input the company name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="pagina_web"
              label="Página Web"
              rules={[{ required: true, message: 'Please input the website URL!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="sede_fiscal"
              label="Sede Fiscal"
              rules={[{ required: true, message: 'Please input the fiscal address!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tamanio"
              label="Tamaño"
              rules={[{ required: true, message: 'Please input the company size!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="sector_id"
              label="Sector"
              rules={[{ required: true, message: 'Please select a sector!' }]}
            >
              <Select>
                {rex_sectors.map((sector: any) => (
                  <Option key={sector.id} value={sector.id}>{sector.sector}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="descripcion"
              label="Descripción"
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateCompanyModal;