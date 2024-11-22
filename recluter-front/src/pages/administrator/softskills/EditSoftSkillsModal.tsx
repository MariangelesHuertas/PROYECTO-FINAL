import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';

interface EditSoftSkillsModalProps {
  visible: boolean;
  onCancel: () => void;
  onEditSoftSkill: (id: number, values: any) => void;
  initialValues?: any;
  SoftSkillsId?: number;
}

const EditSoftSkillsModal: React.FC<EditSoftSkillsModalProps> = ({ 
  visible, 
  onCancel, 
  onEditSoftSkill, 
  initialValues,
  SoftSkillsId 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (SoftSkillsId) {
        onEditSoftSkill(SoftSkillsId, values);
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
          name="soft_skill"
          label="Actualizar Soft Skill"
          rules={[{ required: true, message: '¡Por favor ingrese el nombre de la aptitud!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSoftSkillsModal;

