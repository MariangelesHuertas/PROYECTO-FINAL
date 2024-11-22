import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface EditSectorModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditSector: (id: number, values: any) => void;
  initialValues?: any;
  sectorId?: number;
}

const EditSectorModal: React.FC<EditSectorModalProps> = ({ 
  visible, 
  onCancel, 
  onEditSector, 
  initialValues,
  sectorId 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (sectorId) {
        onEditSector(sectorId, values);
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
          name="sector"
          label="Actualizar nombre del sector"
          rules={[{ required: true, message: '¡Por favor ingrese el nombre de la sector!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSectorModal;

