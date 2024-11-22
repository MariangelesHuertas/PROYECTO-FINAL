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
import { CreateTiposEducacionReducer, DeleteTiposEducacionReducer, GetTiposEducacionTableReducer, UpdateTipoEducacionReducer } from '../../../redux/actions/common/education/Education';
import CreateTipoEducacionModal from './CreateTipoEducacionModal';
import EditTipoEducacionModal from './EditTipoEducacionModal';

const TipoEducacion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    tiposEducacion,
    rex_meta
  } = useSelector(({ tiposEducacion }: any) => tiposEducacion)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTipoEducacion, setSelectedTipoEducacion] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('tipo_educacion');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    dispatch(GetTiposEducacionTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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

  const handleCreateTipoEducacion = async (values: any) => {
    try {
      await dispatch(CreateTiposEducacionReducer(values));
      message.success('Sector created successfully');
      setIsModalVisible(false);
      // Refresh the table data after creating a new sector
      dispatch(GetTiposEducacionTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
          await dispatch(DeleteTiposEducacionReducer(id));
          message.success('Aptitud eliminada exitosamente');
          // Refresh the table data after deleting
          dispatch(GetTiposEducacionTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
        } catch (error) {
          message.error('Error al eliminar la aptitud');
        }
      },
    });
  };

  const handleEdit = (record: any) => {
    setSelectedTipoEducacion(record);
    setIsEditModalVisible(true);
  };

  const handleEditTipoEducacion = async (id: number, values: any) => {
    try {
      await dispatch(UpdateTipoEducacionReducer(id, values));
      message.success('Aptitud actualizada exitosamente');
      setIsEditModalVisible(false);
      // Refresh the table data after updating
      dispatch(GetTiposEducacionTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
      title: 'Tipo de Educacion',
      key: 'tipo_educacion',
      dataIndex: 'tipo_educacion',
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
        Create Tipo de Educacion
      </Button>
      <TableComponent
        data={tiposEducacion}
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
      <CreateTipoEducacionModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateTipoEducacion={handleCreateTipoEducacion}
      />
      <EditTipoEducacionModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedTipoEducacion(null);
        }}
        onEditTipoEducacion={handleEditTipoEducacion}
        initialValues={selectedTipoEducacion}
        TipoEducacionId={selectedTipoEducacion?.id}
      />
    </div>
  )
}

export default TipoEducacion