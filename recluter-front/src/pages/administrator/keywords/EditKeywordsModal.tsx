
import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface EditKeywordsModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditKeyword: (id: number, values: any) => void;
  initialValues?: any;
  KeywordId?: number;
}

const EditKeywordsModal: React.FC<EditKeywordsModalProps> = ({ 
  visible, 
  onCancel, 
  onEditKeyword, 
  initialValues,
  KeywordId 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (KeywordId) {
        onEditKeyword(KeywordId, values);
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
          name="palabra"
          label="Nombre de la Palabra"
          rules={[{ required: true, message: '¡Por favor ingrese el nombre de la aptitud!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="aprobado"
          label="¿Aprobado?"
          valuePropName="checked"
        >
          <Switch checkedChildren="Sí" unCheckedChildren="No" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditKeywordsModal;

