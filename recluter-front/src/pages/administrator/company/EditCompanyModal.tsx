import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface EditCompanyModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditCompany: (id: number, values: any) => void;
  initialValues?: any;
  CompanyId?: number;
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ 
  visible, 
  onCancel, 
  onEditCompany, 
  initialValues,
  CompanyId 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (CompanyId) {
        onEditCompany(CompanyId, values);
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
          name="empresa"
          label="Actualizar Empresa"
          rules={[{ required: true, message: '¡Por favor ingrese el nombre de la empresa!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCompanyModal;

