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
import CreateCompanyModal from './CreateCompanyModal';
import { CreateEmpresasReducer, DeleteEmpresasReducer, GetEmpresasTableReducer, UpdateEmpresasReducer } from '../../../redux/actions/common/company/Company';
import EditCompanyModal from './EditCompanyModal';

const CompanyC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_company,
    rex_meta
  } = useSelector(({ companyC }: any) => companyC)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedEmpresas, setSelectedEmpresas] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('empresa');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    dispatch(GetEmpresasTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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

  const handleCreateEmpresas = async (values: any) => {
    try {
      await dispatch(CreateEmpresasReducer(values));
      message.success('Sector created successfully');
      setIsModalVisible(false);
      // Refresh the table data after creating a new sector
      dispatch(GetEmpresasTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
          await dispatch(DeleteEmpresasReducer(id));
          message.success('Aptitud eliminada exitosamente');
          // Refresh the table data after deleting
          dispatch(GetEmpresasTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
        } catch (error) {
          message.error('Error al eliminar la aptitud');
        }
      },
    });
  };

  const handleEdit = (record: any) => {
    setSelectedEmpresas(record);
    setIsEditModalVisible(true);
  };

  const handleEditEmpresas = async (id: number, values: any) => {
    try {
      await dispatch(UpdateEmpresasReducer(id, values));
      message.success('Aptitud actualizada exitosamente');
      setIsEditModalVisible(false);
      // Refresh the table data after updating
      dispatch(GetEmpresasTableReducer('', currentPage, pageSize, sortColumn, sortOrder));
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
      title: 'Empresa',
      key: 'empresa',
      dataIndex: 'empresa',
      sorter: true,
    },
    {
      title: 'Logo',
      key: 'logo',
      dataIndex: 'logo',
      sorter: true,
    },
    {
      title: 'Banner',
      key: 'banner',
      dataIndex: 'banner',
      sorter: true,
    },
    {
      title: 'Pagina Web',
      key: 'pagina_web',
      dataIndex: 'pagina_web',
      sorter: true,
    },
    {
      title: 'Sede Fiscal',
      key: 'sede_fiscal',
      dataIndex: 'sede_fiscal',
      sorter: true,
    },
    {
      title: 'Descripcion',
      key: 'descripcion',
      dataIndex: 'descripcion',
      sorter: true,
    },
    {
      title: 'Tamaño',
      key: 'tamanio',
      dataIndex: 'tamanio',
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
        Crear Empresa
      </Button>
      <TableComponent
        data={rex_company}
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
      <CreateCompanyModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onCreateEmpresas={handleCreateEmpresas}
      />
      <EditCompanyModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedEmpresas(null);
        }}
        onEditCompany={handleEditEmpresas}
        initialValues={selectedEmpresas}
        CompanyId={selectedEmpresas?.id}
      />
    </div>
  )
}

export default CompanyC