import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface EditIdiomaModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditIdiomas: (id: number, values: any) => void;
  initialValues?: any;
  IdiomasId?: number;
}

const EditIdiomaModal: React.FC<EditIdiomaModalProps> = ({ 
  visible, 
  onCancel, 
  onEditIdiomas, 
  initialValues,
  IdiomasId 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (IdiomasId) {
        onEditIdiomas(IdiomasId, values);
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
          name="idioma"
          label="Actualizar Idioma"
          rules={[{ required: true, message: '¡Por favor ingrese el nombre de la aptitud!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditIdiomaModal;

