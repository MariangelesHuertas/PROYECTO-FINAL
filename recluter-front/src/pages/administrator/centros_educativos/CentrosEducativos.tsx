import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, message, Modal, Space, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import TableComponent from '../../../components/table/Table';
import { CreateCentrosEducativosReducer, DeleteCentrosEducativosReducer, GetCentrosEducativosTableReducer, UpdateCentrosEducativosReducer } from '../../../redux/actions/common/centroEducativo/CentroEducativo';
import CreateCentrosEducativosModal from './CreateCentrosEducativosModal';
import EditCentrosEducativosModal from './EditCentrosEducativosModal';

const CentrosEducativos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_centros_educativos,
    rex_meta
  } = useSelector(({ centrosEducativos }: any) => centrosEducativos);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCentrosEducativos, setSelectedCentrosEducativos] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('centro_educativo');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    dispatch(GetCentrosEducativosTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
  }, [currentPage, pageSize, sortColumn, sortOrder, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  const handleCreateCentrosEducativos = async (values: any) => {
    try {
      await dispatch(CreateCentrosEducativosReducer(values));
      message.success('Centro Educativo created successfully');
      setIsModalVisible(false);
      dispatch(GetCentrosEducativosTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
    } catch (error) {
      message.error('Failed to create Centro Educativo');
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
          await dispatch(DeleteCentrosEducativosReducer(id));
          message.success('Aptitud eliminada exitosamente');
          // Refresh the table data after deleting
          dispatch(GetCentrosEducativosTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
        } catch (error) {
          message.error('Error al eliminar la aptitud');
        }
      },
    });
  };

  const handleEdit = (record: any) => {
    setSelectedCentrosEducativos(record);
    setIsEditModalVisible(true);
  };

  const handleEditCentrosEducativos = async (id: number, values: any) => {
    try {
      await dispatch(UpdateCentrosEducativosReducer(id, values));
      message.success('Aptitud actualizada exitosamente');
      setIsEditModalVisible(false);
      // Refresh the table data after updating
      dispatch(GetCentrosEducativosTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
      title: 'Centro Educativo',
      key: 'centro_educativo',
      dataIndex: 'centro_educativo',
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
      render: (text: string) => text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : 'N/A',
    },
    {
      title: 'Fecha Actualizacion',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      sorter: true,
      render: (text: string) => text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : 'N/A',
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
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Create Centro Educativo
      </Button>
      <TableComponent
        data={rex_centros_educativos}
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
      <CreateCentrosEducativosModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateCentrosEducativos={handleCreateCentrosEducativos}
      />
      <EditCentrosEducativosModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedCentrosEducativos(null);
        }}
        onEditCentrosEducativos={handleEditCentrosEducativos}
        initialValues={selectedCentrosEducativos}
        CentrosEducativosId={selectedCentrosEducativos?.id}
      />
    </div>
  );
};

export default CentrosEducativos;
