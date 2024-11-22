import React, { useEffect, useState } from 'react'
import { Button, message, Space, Tooltip } from 'antd'
import moment from 'moment'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { AppDispatch } from '../../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTypeUsersReducer, GetTypeUsersReducer } from '../../../redux/actions/common/type-users/Type-Users';
import TableComponent from '../../../components/table/Table';
import { GetPermissionsTypeUserReducer } from '../../../redux/actions/common/permissions/Permissions';
import { useNavigate } from 'react-router-dom';
import CreateTypeUsersModal from './CreateTypeUsers';
// import CreateSkillsModal from './CreateSkillsModal';

const TypeUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_types_users,
    rex_meta
  } = useSelector(({ typeUsers }: any) => typeUsers)

  const {
    rex_permissions_type_user
  } = useSelector(({ permissions }: any) => permissions)
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetTypeUsersReducer());
    // dispatch(GetPermissionsTypeUserReducer(1))
  }, [dispatch]);

  const handleViewPermissions = (tipoUsuarioId: number) => {
    navigate(`${tipoUsuarioId}/permisos`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateTypeUsers = async (values: any) => {
    try {
      await dispatch(CreateTypeUsersReducer(values));
      message.success('Sector created successfully');
      setIsModalVisible(false);
      // Refresh the table data after creating a new sector
      dispatch(GetTypeUsersReducer());
    } catch (error) {
      message.error('Failed to create sector');
    }
  };

  const columnsTable = [
    // {
    //   title: 'Item',
    //   key: 'item',
    //   render: (_: any, __: any, index: number) => {
    //     return (currentPage - 1) * pageSize + index + 1;
    //   },
    // },
    {
      title: 'Aptitud',
      key: 'tipo_usuario',
      dataIndex: 'tipo_usuario'
    },
    {
      title: 'Permisos',
      key: 'permisos',
      render: (text: string, record: any) => (
        <Button onClick={() => handleViewPermissions(record.id)}>
          Ver Permisos
        </Button>
      ),
    },
    {
      title: 'Fecha Creacion',
      key: 'createAt',
      dataIndex: 'createdAt',
      render: (text: string) => text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : 'N/A'
    },
    {
      title: 'Fecha Actualizacion',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (text: string) => text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : 'N/A'
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: () => (
        <Space size="middle">
          <Tooltip title="Ver detalles">
            <EyeOutlined style={{ cursor: 'pointer' }} />
          </Tooltip>
          <Tooltip title="Editar">
            <EditOutlined style={{ cursor: 'pointer' }} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <DeleteOutlined style={{ cursor: 'pointer' }} />
          </Tooltip>
        </Space>
      ),
    }
  ]

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Create Tipo de Usuario
      </Button>
      <TableComponent 
      columns={columnsTable} 
      data={rex_types_users} 
      meta={rex_meta}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      pageSize={pageSize}  
      getData={() => {}}
      />
      <CreateTypeUsersModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateSkills={handleCreateTypeUsers}
      />
    </div>
  )
}

export default TypeUsers