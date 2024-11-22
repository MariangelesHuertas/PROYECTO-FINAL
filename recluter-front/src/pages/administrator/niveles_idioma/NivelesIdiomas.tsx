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
import { CreateIdiomasNivelReducer, DeleteIdiomasNivelReducer, GetIdiomasNivelTableReducer, UpdateIdiomasNivelReducer } from '../../../redux/actions/common/idiomasNivel/IdiomasNivel';
import CreateNivelesIdiomasModal from './CreateNivelesIdiomasModal';
import EditNivIdiomaModal from './EditNivIdiomaModal';

const NivelesIdiomas = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_idioma_nivel,
    rex_meta
  } = useSelector(({ nivel_idiomas }: any) => nivel_idiomas)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedNivelIdiomas, setSelectedNivelIdiomas] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('nivel');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    dispatch(GetIdiomasNivelTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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

  const handleCreateNivelIdiomas = async (values: any) => {
    try {
      await dispatch(CreateIdiomasNivelReducer(values));
      message.success('Sector created successfully');
      setIsModalVisible(false);
      // Refresh the table data after creating a new sector
      dispatch(GetIdiomasNivelTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
    } catch (error) {
      message.error('Failed to create sector');
    }
  };

  
  const handleEdit = (record: any) => {
    setSelectedNivelIdiomas(record);
    setIsEditModalVisible(true);
  };

  const handleEditNivelIdiomas = async (id: number, values: any) => {
    try {
      await dispatch(UpdateIdiomasNivelReducer(id, values));
      message.success('Aptitud actualizada exitosamente');
      setIsEditModalVisible(false);
      // Refresh the table data after updating
      dispatch(GetIdiomasNivelTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
    } catch (error) {
      message.error('Error al actualizar la aptitud');
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
          await dispatch(DeleteIdiomasNivelReducer(id));
          message.success('Aptitud eliminada exitosamente');
          // Refresh the table data after deleting
          dispatch(GetIdiomasNivelTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
        } catch (error) {
          message.error('Error al eliminar la aptitud');
        }
      },
    });
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
      title: 'Nivel',
      key: 'nivel',
      dataIndex: 'nivel',
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
        Crear Nivel Idiomas
      </Button>
      <TableComponent
        data={rex_idioma_nivel}
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
      <CreateNivelesIdiomasModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateIdiomasNivel={handleCreateNivelIdiomas}
      />
      <EditNivIdiomaModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedNivelIdiomas(null);
        }}
        onEditnvlIdioma={handleEditNivelIdiomas}
        initialValues={selectedNivelIdiomas}
        nvlIdiomaId={selectedNivelIdiomas?.id}
      />
    </div>
  )
}

export default NivelesIdiomas