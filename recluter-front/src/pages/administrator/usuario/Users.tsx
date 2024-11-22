import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Button, message, Modal, Space, Tooltip } from 'antd'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import TableComponent from '../../../components/table/Table';
import CreateUsersModal from './CreateUsersModal';
import { CreateUsersReducer, DeleteUsersReducer, GetUsersTableReducer, UpdateUsersReducer } from '../../../redux/actions/common/usuario/Users';
import EditUsersModal from './EditUsersModal';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_usuarios,
    rex_meta
  } = useSelector(({ usuarios }: any) => usuarios)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('usuario');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    dispatch(GetUsersTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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

  const handleCreateUsers = async (values: any) => {
    try {
      await dispatch(CreateUsersReducer(values));
      message.success('Sector created successfully');
      setIsModalVisible(false);
      // Refresh the table data after creating a new sector
      dispatch(GetUsersTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
    } catch (error) {
      message.error('Failed to create idioma');
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
          await dispatch(DeleteUsersReducer(id));
          message.success('Aptitud eliminada exitosamente');
          // Refresh the table data after deleting
          dispatch(GetUsersTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
        } catch (error) {
          message.error('Error al eliminar la aptitud');
        }
      },
    });
  };
  
  const handleEdit = (record: any) => {
    setSelectedUsers(record);
    setIsEditModalVisible(true);
  };

  const handleEditUsers = async (id: number, values: any) => {
    try {
      await dispatch(UpdateUsersReducer(id, values));
      message.success('Aptitud actualizada exitosamente');
      setIsEditModalVisible(false);
      // Refresh the table data after updating
      dispatch(GetUsersTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
      title: 'Usuario',
      key: 'usuario',
      dataIndex: 'usuario',
      sorter: true,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Estado',
      key: 'estado',
      dataIndex: 'estado',
      sorter: true,
    },
    {
      title: 'Codigo Generado',
      key: 'codigo_generado',
      dataIndex: 'codigo_generado',
      sorter: true,
    },
    {
      title: 'Cargo',
      key: 'cargo',
      dataIndex: 'cargo',
      sorter: true,
    },
    {
      title: 'Meses Experiencia',
      key: 'meses_experiencia',
      dataIndex: 'meses_experiencia',
      sorter: true,
    },
    {
      title: 'Ubicacion',
      key: 'ubicacion',
      dataIndex: 'ubicacion',
      sorter: true,
    },
    {
      title: 'Fecha Creacion',
      key: 'createdAt',
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
          <Tooltip title="Editar">
            <EditOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
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
        Crear Usuarios
      </Button>
      <TableComponent
        data={rex_usuarios}
        columns={columnsTable}
        meta={rex_meta}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        getData={(current, order, column) => {
          handleSortChange(column, order);
          setCurrentPage(current);
        }}
      />
      <CreateUsersModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateUsers={handleCreateUsers}
      />
      <EditUsersModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedUsers(null);
        }}
        onEditUsers={handleEditUsers}
        initialValues={selectedUsers}
        UsersId={selectedUsers?.id}
      />
    </div>
  )
}

export default Users