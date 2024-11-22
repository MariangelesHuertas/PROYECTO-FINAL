import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface EditNivIdiomaModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditnvlIdioma: (id: number, values: any) => void;
  initialValues?: any;
  nvlIdiomaId?: number;
}

const EditNivIdiomaModal: React.FC<EditNivIdiomaModalProps> = ({ 
  visible, 
  onCancel, 
  onEditnvlIdioma, 
  initialValues,
  nvlIdiomaId 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (nvlIdiomaId) {
        onEditnvlIdioma(nvlIdiomaId, values);
        form.resetFields();
      }
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title="Editar Aptitud"
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
          name="nivel"
          label="Actualizar Nivel"
          rules={[{ required: true, message: '¡Por favor ingrese el nombre de la aptitud!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditNivIdiomaModal;

