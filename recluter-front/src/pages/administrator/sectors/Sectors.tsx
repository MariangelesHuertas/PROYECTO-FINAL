import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { GetSectorsTableReducer, CreateSectorReducer, DeleteSectorReducer, UpdateSectorReducer } from '../../../redux/actions/common/sectors/Sectors';
import { Button, message, Space, Tooltip, Input, DatePicker, InputRef, Modal } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import moment from 'moment';
import CreateSectorModal from './CreateSectorsModal';
import TableComponent from '../../../components/table/Table';
import EditSectorModal from './EditSectorModal';

const Sectors: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_sectors,
    rex_meta
  } = useSelector(({ sectors }: any) => sectors);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('sector');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    dispatch(GetSectorsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
  }, [currentPage, pageSize, sortColumn, sortOrder]);


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

  const handleCreateSector = async (values: any) => {
    try {
      await dispatch(CreateSectorReducer(values));
      message.success('Sector created successfully');
      setIsModalVisible(false);
      dispatch(GetSectorsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
    } catch (error) {
      message.error('Failed to create sector');
    }
  };

  const handleEdit = (record: any) => {
    setSelectedSector(record);
    setIsEditModalVisible(true);
  };

  const handleEditSector = async (id: number, values: any) => {
    try {
      await dispatch(UpdateSectorReducer(id, values));
      message.success('Aptitud actualizada exitosamente');
      setIsEditModalVisible(false);
      // Refresh the table data after updating
      dispatch(GetSectorsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
          await dispatch(DeleteSectorReducer(id));
          message.success('Aptitud eliminada exitosamente');
          // Refresh the table data after deleting
          dispatch(GetSectorsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
      title: 'Sector',
      key: 'sector',
      dataIndex: 'sector',
      sorter: true,
    },
    {
      title: 'Fecha Creacion',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (text: string) => text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : 'N/A',
      sorter: true,
    },
    {
      title: 'Fecha Actualizacion',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (text: string) => text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : 'N/A',
      sorter: true,
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
              onClick={() => handleDelete(record.id)} />
          </Tooltip>
        </Space>
      ),
    }
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Create Sector
      </Button>
      <TableComponent
        columns={columnsTable}
        data={rex_sectors}
        meta={rex_meta}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        getData={(current, order, column) => {
          handleSortChange(column, order);
          setCurrentPage(current);
        }}
      />
      <CreateSectorModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateSector={handleCreateSector}
      />
      <EditSectorModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedSector(null);
        }}
        onEditSector={handleEditSector}
        initialValues={selectedSector}
        sectorId={selectedSector?.id}
      />
    </div>
  );
};

export default Sectors;
