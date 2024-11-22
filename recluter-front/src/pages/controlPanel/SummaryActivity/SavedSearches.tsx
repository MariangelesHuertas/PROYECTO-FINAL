import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import "../../../components/pages/controlPanel/OpenEstilos.css";

interface Search {
  key: string;
  nombreBusqueda: string;
  puesto: string;
  ubicacion: string;
  ultimaBusqueda: string;
  fechaCreacion: string;
}

const data: Search[] = [
  // { key: "1", nombreBusqueda: "Supermercado", puesto: "Reponedor de supermercado", ubicacion: "Paterna", ultimaBusqueda: "24/02/2024", fechaCreacion: "24/02/2024" },
  // { key: "2", nombreBusqueda: "Almacén", puesto: "Mozo de almacén", ubicacion: "Peñíscola", ultimaBusqueda: "22/02/2024", fechaCreacion: "22/02/2024" },
  // { key: "3", nombreBusqueda: "Administración", puesto: "Administrativo", ubicacion: "Altea", ultimaBusqueda: "20/02/2024", fechaCreacion: "20/02/2024" },
  // { key: "4", nombreBusqueda: "Almacén", puesto: "Mozo de almacén", ubicacion: "Paterna", ultimaBusqueda: "06/02/2024", fechaCreacion: "06/02/2024" },
  // { key: "5", nombreBusqueda: "Supermercado", puesto: "Administrativo", ubicacion: "Paterna", ultimaBusqueda: "03/02/2024", fechaCreacion: "03/02/2024" },
];

const SavedSearches: React.FC = () => {
  const [nombreBusquedaSortOrder, setNombreBusquedaSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [puestoSortOrder, setPuestoSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [ubicacionSortOrder, setUbicacionSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [ultimaBusquedaSortOrder, setUltimaBusquedaSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [fechaCreacionSortOrder, setFechaCreacionSortOrder] = useState<"ascend" | "descend" | null>(null);

  const handleSort = (columnKey: string) => {
    switch (columnKey) {
      case "nombreBusqueda":
        setNombreBusquedaSortOrder(nombreBusquedaSortOrder === "ascend" ? "descend" : "ascend");
        setPuestoSortOrder(null);
        setUbicacionSortOrder(null);
        setUltimaBusquedaSortOrder(null);
        setFechaCreacionSortOrder(null);
        break;
      case "puesto":
        setPuestoSortOrder(puestoSortOrder === "ascend" ? "descend" : "ascend");
        setNombreBusquedaSortOrder(null);
        setUbicacionSortOrder(null);
        setUltimaBusquedaSortOrder(null);
        setFechaCreacionSortOrder(null);
        break;
      case "ubicacion":
        setUbicacionSortOrder(ubicacionSortOrder === "ascend" ? "descend" : "ascend");
        setNombreBusquedaSortOrder(null);
        setPuestoSortOrder(null);
        setUltimaBusquedaSortOrder(null);
        setFechaCreacionSortOrder(null);
        break;
      case "ultimaBusqueda":
        setUltimaBusquedaSortOrder(ultimaBusquedaSortOrder === "ascend" ? "descend" : "ascend");
        setNombreBusquedaSortOrder(null);
        setPuestoSortOrder(null);
        setUbicacionSortOrder(null);
        setFechaCreacionSortOrder(null);
        break;
      case "fechaCreacion":
        setFechaCreacionSortOrder(fechaCreacionSortOrder === "ascend" ? "descend" : "ascend");
        setNombreBusquedaSortOrder(null);
        setPuestoSortOrder(null);
        setUbicacionSortOrder(null);
        setUltimaBusquedaSortOrder(null);
        break;
    }
  };

  const columns = [
    {
      title: (
        <div onClick={() => handleSort("nombreBusqueda")} className="flex items-center cursor-pointer">
          <h1 className="font-bold text-caption">
            Nombre de búsqueda {nombreBusquedaSortOrder === "ascend" ? <UpOutlined className="ml-1" /> : <DownOutlined className="ml-1" />}
          </h1>
        </div>
      ),
      dataIndex: "nombreBusqueda",
      key: "nombreBusqueda",
      render: (text: string) => (
        <Tooltip title={text}>
          <div className="text-body-sm font-bold text-blue3">
            {text.length > 20 ? text.substring(0, 20) + "..." : text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: (
        <div onClick={() => handleSort("puesto")} className="flex items-center cursor-pointer">
          <h1 className="font-bold text-caption">
            Puesto {puestoSortOrder === "ascend" ? <UpOutlined className="ml-1" /> : <DownOutlined className="ml-1" />}
          </h1>
        </div>
      ),
      dataIndex: "puesto",
      key: "puesto",
      render: (text: string) => (
        <Tooltip title={text}>
          <div className="text-body-sm font-bold text-[#5B5B5B]">
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: (
        <div onClick={() => handleSort("ubicacion")} className="flex items-center cursor-pointer">
          <h1 className="font-bold text-caption">
            Ubicación {ubicacionSortOrder === "ascend" ? <UpOutlined className="ml-1" /> : <DownOutlined className="ml-1" />}
          </h1>
        </div>
      ),
      dataIndex: "ubicacion",
      key: "ubicacion",
      render: (text: string) => (
        <div className="text-body-sm font-bold text-[#5B5B5B]">
          {text}
        </div>
      ),
    },
    {
      title: (
        <div onClick={() => handleSort("ultimaBusqueda")} className="flex items-center cursor-pointer">
          <h1 className="font-bold text-caption">
            Última búsqueda {ultimaBusquedaSortOrder === "ascend" ? <UpOutlined className="ml-1" /> : <DownOutlined className="ml-1" />}
          </h1>
        </div>
      ),
      dataIndex: "ultimaBusqueda",
      key: "ultimaBusqueda",
      render: (text: string) => (
        <div className="text-body-sm font-bold text-[#5B5B5B]">
          {text}
        </div>
      ),
    },
    {
      title: (
        <div onClick={() => handleSort("fechaCreacion")} className="flex items-center cursor-pointer">
          <h1 className="font-bold text-caption">
            Fecha creación {fechaCreacionSortOrder === "ascend" ? <UpOutlined className="ml-1" /> : <DownOutlined className="ml-1" />}
          </h1>
        </div>
      ),
      dataIndex: "fechaCreacion",
      key: "fechaCreacion",
      render: (text: string) => (
        <div className="text-body-sm font-bold text-[#5B5B5B]">
          {text}
        </div>
      ),
    },
    {
      title: "", // Sin título para esta columna
      key: "actions",
      render: () => (
        <div
          style={{
            fontSize: "24px",
            color: "#006497",
            fontWeight: "bold",
            textAlign: "center",
            background: "transparent", // Fondo transparente solo para los puntos
          }}
        >
          ...
        </div>
      ),
    },
  ];

  return (
    <div className="px-[15px]">
      <h3 className="font-bold text-lg pb-[24px]">Búsquedas guardadas</h3>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={(record, index) => (index % 2 === 0 ? "bg-[#F2F2F2]" : "bg-[#E6E6E6]")}
          scroll={{ y: 200 }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default SavedSearches;
