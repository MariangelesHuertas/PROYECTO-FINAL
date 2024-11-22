import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface EditSkillsModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditSkill: (id: number, values: any) => void;
  initialValues?: any;
  skillId?: number;
}

const EditSkillsModal: React.FC<EditSkillsModalProps> = ({ 
  visible, 
  onCancel, 
  onEditSkill, 
  initialValues,
  skillId 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (skillId) {
        onEditSkill(skillId, values);
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
          name="aptitud"
          label="Nombre de la Aptitud"
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

export default EditSkillsModal;

