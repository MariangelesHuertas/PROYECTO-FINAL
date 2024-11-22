import React, { useState } from 'react';
import { Table } from 'antd';

interface TableProps {
  columns: {
    title: string | JSX.Element,
    key: string,
    dataIndex?: string,
    render?: (text: string, record: any, index: number) => JSX.Element | null
  }[]
  data: any[]
  meta: {
    total: number
  }
  currentPage: number
  getData: (page: number, sortOrder: string, sortColumn: string) => void
  onPageChange: (page: number) => void
  pageSize: number
  customDesign: boolean
}

const TableComponentDessign: React.FC<TableProps> = ({
  columns,
  data,
  meta,
  currentPage,
  getData,
  onPageChange,
  pageSize,
  customDesign
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

  // Si customDesign está activado, aplicamos los divs y estilos personalizados
  const customColumns = columns.map((col, index) => ({
    ...col,
    title: customDesign ? (
      <div className="custom-header flex items-center cursor-pointer h-[6px] font-bold">
        {col.title}
      </div>
    ) : col.title,
    render: col.render
      ? (text: string, record: any, idx: number) => {
          const isFirstColumn = index === 0; 
          return customDesign ? (
            <div
              className={`custom-cell flex items-center font-bold ${isFirstColumn ? 'text-blue3' : 'text-[#5B5B5B]'}`}
              style={{ borderColor: "blue",margin: "2px"}}
            >
              {col.render?.(text, record, idx)} {/* Comprobación de undefined */}
            </div>
          ) : (
            col.render?.(text, record, idx)
          );
        }
      : undefined,
  }));
  return (
    <Table
      columns={customColumns}
      dataSource={data}
      rowKey="id"
      rowClassName={(record, index) => (index % 2 === 0 ? "bg-[#F2F2F2]" : "bg-[#E6E6E6]")}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: meta.total,
        onChange: onPageChange,
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
      }}
      onChange={handleTableChange}
      className={customDesign ? 'custom-table' : ''}
    />
  );
};

export default TableComponentDessign;
