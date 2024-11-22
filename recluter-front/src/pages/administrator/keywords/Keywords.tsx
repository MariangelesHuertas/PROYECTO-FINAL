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
import { 
  CreateKeywordsReducer, 
  DeleteKeywordsReducer, 
  GetKeywordsTableReducer, 
  UpdateKeywordsReducer
} from '../../../redux/actions/common/keywords/Keywords';
import CreateKeywordsModal from './CreateKeywordsModal';
import EditKeywordsModal from './EditKeywordsModal';


const Keywords = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_keywords,
    rex_meta
  } = useSelector(({ keywords }: any) => keywords)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('palabra');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    dispatch(GetKeywordsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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

  const handleCreateKeyword = async (values: any) => {
    try {
      await dispatch(CreateKeywordsReducer(values));
      message.success('Sector created successfully');
      setIsModalVisible(false);
      // Refresh the table data after creating a new sector
      dispatch(GetKeywordsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
    } catch (error) {
      message.error('Failed to create sector');
    }
  };

  const handleEdit = (record: any) => {
    setSelectedKeywords(record);
    setIsEditModalVisible(true);
  };

  const handleEditKeywords = async (id: number, values: any) => {
    try {
      await dispatch(UpdateKeywordsReducer(id, values));
      message.success('Aptitud actualizada exitosamente');
      setIsEditModalVisible(false);
      // Refresh the table data after updating
      dispatch(GetKeywordsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
          await dispatch(DeleteKeywordsReducer(id));
          message.success('Aptitud eliminada exitosamente');
          // Refresh the table data after deleting
          dispatch(GetKeywordsTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
      title: 'Palabra Clave',
      key: 'palabra',
      dataIndex: 'palabra',
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
              onClick={() => handleDelete(record.id)} />
          </Tooltip>
        </Space>
      ),
    }
  ]

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Create Keyword
      </Button>
      <TableComponent
        data={rex_keywords}
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
      <CreateKeywordsModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateKeyword={handleCreateKeyword}
      />
      <EditKeywordsModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedKeywords(null);
        }}
        onEditKeyword={handleEditKeywords}
        initialValues={selectedKeywords}
        KeywordId={selectedKeywords?.id}
      />
    </div>
  )
}

export default Keywords
