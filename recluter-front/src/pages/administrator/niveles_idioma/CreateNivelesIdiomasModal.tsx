import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { GetIdiomasTableReducer } from '../../../redux/actions/common/idiomas/Idiomas';

interface CreateIdiomasNivelModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateIdiomasNivel: (values: { nivel: string; idioma_id: number }) => void;
}

const { Option } = Select;

const CreateNivelesIdiomasModal: React.FC<CreateIdiomasNivelModalProps> = ({ visible, onCancel, onCreateIdiomasNivel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { rex_idioma } = useSelector(({ idiomas }: any) => idiomas)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;

  useEffect(() => {
    dispatch(GetIdiomasTableReducer('', currentPage, pageSize));
  }, [currentPage, pageSize, dispatch]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onCreateIdiomasNivel(values);
      form.resetFields();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title="Crear Nuevo Nivel de Idioma"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="create" type="primary" onClick={handleOk}>
          Crear
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nivel"
          label="Nivel de Idioma"
          rules={[{ required: true, message: '¡Por favor ingrese el nivel de idioma!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="idioma_id"
          label="Idioma"
          rules={[{ required: true, message: '¡Por favor seleccione un idioma!' }]}
        >
          <Select>
            {rex_idioma.map((idioma: any) => (
              <Option key={idioma.id} value={idioma.id}>{idioma.idioma}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNivelesIdiomasModal;