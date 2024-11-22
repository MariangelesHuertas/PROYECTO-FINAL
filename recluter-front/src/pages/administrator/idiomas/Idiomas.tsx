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
import { CreateIdiomasReducer, DeleteIdiomasReducer, GetIdiomasTableReducer, UpdateIdiomasReducer } from '../../../redux/actions/common/idiomas/Idiomas';
import CreateIdiomasModal from './CreateIdiomasModal';
import EditIdiomaModal from './EditIdiomaModal';

const Idiomas = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_idioma,
    rex_meta
  } = useSelector(({ idiomas }: any) => idiomas)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedIdiomas, setSelectedIdiomas] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('idioma');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    dispatch(GetIdiomasTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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

  const handleCreateIdiomas = async (values: any) => {
    try {
      await dispatch(CreateIdiomasReducer(values));
      message.success('Sector created successfully');
      setIsModalVisible(false);
      // Refresh the table data after creating a new sector
      dispatch(GetIdiomasTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
          await dispatch(DeleteIdiomasReducer(id));
          message.success('Aptitud eliminada exitosamente');
          // Refresh the table data after deleting
          dispatch(GetIdiomasTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
        } catch (error) {
          message.error('Error al eliminar la aptitud');
        }
      },
    });
  };

  const handleEdit = (record: any) => {
    setSelectedIdiomas(record);
    setIsEditModalVisible(true);
  };

  const handleEditIdiomas = async (id: number, values: any) => {
    try {
      await dispatch(UpdateIdiomasReducer(id, values));
      message.success('Aptitud actualizada exitosamente');
      setIsEditModalVisible(false);
      // Refresh the table data after updating
      dispatch(GetIdiomasTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
      title: 'Idioma',
      key: 'idioma',
      dataIndex: 'idioma',
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
        Create Idiomas
      </Button>
      <TableComponent
        data={rex_idioma}
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
      <CreateIdiomasModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateIdiomas={handleCreateIdiomas}
      />
      <EditIdiomaModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedIdiomas(null);
        }}
        onEditIdiomas={handleEditIdiomas}
        initialValues={selectedIdiomas}
        IdiomasId={selectedIdiomas?.id}
      />
    </div>
  )
}

export default Idiomas