import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface EditTipoEducacionModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditTipoEducacion: (id: number, values: any) => void;
  initialValues?: any;
  TipoEducacionId?: number;
}

const EditTipoEducacionModal: React.FC<EditTipoEducacionModalProps> = ({ 
  visible, 
  onCancel, 
  onEditTipoEducacion, 
  initialValues,
  TipoEducacionId 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (TipoEducacionId) {
        onEditTipoEducacion(TipoEducacionId, values);
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
          name="tipo_educacion"
          label="Actualizar TipoEducacion"
          rules={[{ required: true, message: '¡Por favor ingrese el nombre de la aptitud!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTipoEducacionModal;

