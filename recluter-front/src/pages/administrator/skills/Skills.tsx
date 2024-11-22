import React, { useEffect, useState } from 'react'
import { Button, message, Modal, Space, Tooltip } from 'antd'
import moment from 'moment'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { AppDispatch } from '../../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { CreateSkillReducer, DeleteSkillReducer, GetSkillsTableReducer, UpdateSkillReducer } from '../../../redux/actions/common/skills/Skills';
import TableComponent from '../../../components/table/Table';
import CreateSkillsModal from './CreateSkillsModal';
import EditSkillsModal from './EditSkillsModal';

const Skills: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_skills,
    rex_meta
  } = useSelector(({ skills }: any) => skills)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('aptitud');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    dispatch(GetSkillsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
  }, [currentPage, pageSize, sortColumn, sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const handleSortChange = (column: string, order: string) => {
    setSortColumn(column);
    setSortOrder(order as 'asc' | 'desc');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateSkill = async (values: any) => {
    try {
      await dispatch(CreateSkillReducer(values));
      message.success('Sector created successfully');
      setIsModalVisible(false);
      // Refresh the table data after creating a new sector
      dispatch(GetSkillsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
    } catch (error) {
      message.error('Failed to create sector');
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '¿Está seguro de eliminar esta aptitud?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'No, cancelar',
      onOk: async () => {
        try {
          await dispatch(DeleteSkillReducer(id));
          message.success('Aptitud eliminada exitosamente');
          // Refresh the table data after deleting
          dispatch(GetSkillsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
        } catch (error) {
          message.error('Error al eliminar la aptitud');
        }
      },
    });
  };

  const handleEdit = (record: any) => {
    setSelectedSkill(record);
    setIsEditModalVisible(true);
  };

  const handleEditSkill = async (id: number, values: any) => {
    try {
      await dispatch(UpdateSkillReducer(id, values));
      message.success('Aptitud actualizada exitosamente');
      setIsEditModalVisible(false);
      // Refresh the table data after updating
      dispatch(GetSkillsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
    } catch (error) {
      message.error('Error al actualizar la aptitud');
    }
  };

  const columnsTable = [
    {
      title: 'Item',
      key: 'item',
      render: (_: any, __: any, index: number) => {
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: 'Aptitud',
      key: 'aptitud',
      dataIndex: 'aptitud',
      sorter: true,
    },
    {
      title: 'Aprobado',
      key: 'aprobado',
      dataIndex: 'aprobado',
      sorter: true,
      render: (text: string) => text ? 'Aprobado' : 'Desaprobado'
    },
    {
      title: 'Fecha Creacion',
      key: 'createAt',
      dataIndex: 'createdAt',
      sorter: true,
      render: (text: string) => text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : 'N/A'
    },
    {
      title: 'Fecha Actualizacion',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      sorter: true,
      render: (text: string) => text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : 'N/A'
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="Ver detalles">
            <EyeOutlined style={{ cursor: 'pointer' }} />
          </Tooltip>
            <EditOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => handleEdit(record)}
            />
          <Tooltip title="Eliminar">
            <DeleteOutlined
              style={{ cursor: 'pointer', color: '#ff4d4f' }}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    }
  ]

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Create Aptitud
      </Button>
      <TableComponent
        columns={columnsTable}
        data={rex_skills}
        meta={rex_meta}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        getData={(current, order, column) => {
          handleSortChange(column, order);
          setCurrentPage(current);
        }}
      />
      <CreateSkillsModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateSkills={handleCreateSkill}
      />
      <EditSkillsModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedSkill(null);
        }}
        onEditSkill={handleEditSkill}
        initialValues={selectedSkill}
        skillId={selectedSkill?.id}
      />
    </div>
  )
}

export default Skills