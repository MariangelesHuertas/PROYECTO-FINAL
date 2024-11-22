import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import "../../../components/pages/controlPanel/OpenEstilos.css";

interface Search {
  key: string;
  puesto: string;
  ubicacion: string;
  fechaBusqueda: string;
}

const data: Search[] = [
  // { key: "1", puesto: "Reponedor de supermercado", ubicacion: "Paterna", fechaBusqueda: "24/02/2024" },
  // { key: "2", puesto: "Mozo de almacén", ubicacion: "Peñíscola", fechaBusqueda: "22/02/2024" },
  // { key: "3", puesto: "Administrativo", ubicacion: "Altea", fechaBusqueda: "20/02/2024" },
  // { key: "4", puesto: "Mozo de almacén", ubicacion: "Paterna", fechaBusqueda: "06/02/2024" },
  // { key: "5", puesto: "Administrativo", ubicacion: "Paterna", fechaBusqueda: "03/02/2024" },
];

const LatestSearches: React.FC = () => {
  const [puestoSortOrder, setPuestoSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [ubicacionSortOrder, setUbicacionSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [fechaSortOrder, setFechaSortOrder] = useState<"ascend" | "descend" | null>(null);

  const handleSort = (columnKey: string) => {
    switch (columnKey) {
      case "puesto":
        setPuestoSortOrder(puestoSortOrder === "ascend" ? "descend" : "ascend");
        setUbicacionSortOrder(null);
        setFechaSortOrder(null);
        break;
      case "ubicacion":
        setUbicacionSortOrder(ubicacionSortOrder === "ascend" ? "descend" : "ascend");
        setPuestoSortOrder(null);
        setFechaSortOrder(null);
        break;
      case "fechaBusqueda":
        setFechaSortOrder(fechaSortOrder === "ascend" ? "descend" : "ascend");
        setPuestoSortOrder(null);
        setUbicacionSortOrder(null);
        break;
    }
  };

  const columns = [
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
          <div className="text-body-sm font-bold text-blue3">
            {text.length > 20 ? text.substring(0, 20) + "..." : text}
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
        <div className="text-body-sm font-bold text-[#5B5B5B]">{text}</div>
      ),
    },
    {
      title: (
        <div onClick={() => handleSort("fechaBusqueda")} className="flex items-center cursor-pointer">
          <h1 className="font-bold text-caption">
            Fecha de búsqueda {fechaSortOrder === "ascend" ? <UpOutlined className="ml-1" /> : <DownOutlined className="ml-1" />}
          </h1>
        </div>
      ),
      dataIndex: "fechaBusqueda",
      key: "fechaBusqueda",
      render: (text: string) => (
        <div className="text-body-sm font-bold text-[#5B5B5B]">{text}</div>
      ),
    },
    {
      // Columna para los puntos "..."
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
    <div className="relative px-[15px]">
      <h3 className="font-bold text-lg pb-[24px]">Últimas búsquedas</h3>
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

export default LatestSearches;
