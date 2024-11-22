import React, { useState } from 'react';
import { Table } from 'antd';

interface TableProps {
  columns: {
    title: string,
    key: string,
    dataIndex?: string,
    render?: (text: string, record: any, index: number) => {}
  }[]
  data: any[]
  meta: {
    total: number
  }
  currentPage: number
  getData: (page: number, sortOrder: string, sortColumn: string) => void
  onPageChange: (page: number) => void
  pageSize: number
}

const TableComponent: React.FC<TableProps> = ({
  columns,
  data,
  meta,
  currentPage,
  getData,
  onPageChange,
  pageSize,
}) => {
  const [sortOrder, setSortOrder] = useState('');
  const [sortColumn, setSortColumn] = useState('');

  const handleTableChange = (
    pagination: any,
    filters: any,
    sorter: any
  ) => {
    const { current } = pagination;
    const order = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : 'asc';
    const column = sorter.field || '';
    setSortOrder(order);
    setSortColumn(column);
    getData(current, order, column);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: meta.total,
        onChange: onPageChange,
        showSizeChanger: false,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
      }}
      onChange={handleTableChange}
    />
  );
};

export default TableComponent;
