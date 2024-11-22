import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface EditCentrosEducativosModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditCentrosEducativos: (id: number, values: any) => void;
  initialValues?: any;
  CentrosEducativosId?: number;
}

const EditCentrosEducativosModal: React.FC<EditCentrosEducativosModalProps> = ({ 
  visible, 
  onCancel, 
  onEditCentrosEducativos, 
  initialValues,
  CentrosEducativosId 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (CentrosEducativosId) {
        onEditCentrosEducativos(CentrosEducativosId, values);
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
          name="centro_educativo"
          label="Actualizar Centro Educativo"
          rules={[{ required: true, message: '¡Por favor ingrese el nombre de la aptitud!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCentrosEducativosModal;

