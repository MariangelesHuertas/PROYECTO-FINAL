import React, { useState, useEffect } from "react";
import { Table, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { getCvGeneralReducer } from '../../../redux/actions/pages/searchCV/GetSearchCV';
import CheckboxC from "../../../components/checkbox/CheckboxProps";
import RatingStar from "../searchCV/RatingStar"; // Importar RatingStar


interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: any) => JSX.Element | string;
}

interface DataType {
  id: string;
  nombre: string;
  valoraciones: number;
  numReviews: number;
  aptitudes: string[];
  softSkills: string;
  ubicacion: string;
  estudios: string[];
  experiencia: string;
  rol: string;
  valoracionesPromedio: number;
  valoracionesCount: number;
}

const SkeletonRow = () => (
  <div className="skeleton-row" style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
    <div style={{ width: '30px' }}><Skeleton.Button active size="small" style={{ width: 20, height: 20 }} /></div>
    <div style={{ width: '20%' }}>
      <Skeleton.Input active size="small" style={{ width: '100%', marginBottom: 4 }} />
      <Skeleton.Input active size="small" style={{ width: '60%' }} />
    </div>
    <div style={{ width: '15%' }}>
      <Skeleton.Input active size="small" style={{ width: '80%' }} />
    </div>
    <div style={{ width: '20%' }}>
      <Skeleton.Input active size="small" style={{ width: '90%', marginBottom: 4 }} />
      <Skeleton.Input active size="small" style={{ width: '70%' }} />
    </div>
    <div style={{ width: '10%' }}>
      <Skeleton.Input active size="small" style={{ width: '100%' }} />
    </div>
    <div style={{ width: '10%' }}>
      <Skeleton.Input active size="small" style={{ width: '100%' }} />
    </div>
    <div style={{ width: '15%' }}>
      <Skeleton.Input active size="small" style={{ width: '90%' }} />
    </div>
    <div style={{ width: '10%' }}>
      <Skeleton.Input active size="small" style={{ width: '80%' }} />
    </div>
  </div>
);

const OfferTableSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, cvGeneral, error } = useSelector((state: RootState) => state.getSearchCV);
  const [selectedKeys, setSelectedKeys] = useState<React.ReactText[]>([]);

  const handleCandidateClick = (candidateId: number) => {
    navigate(`/searchCV/candidate/${candidateId}`);
  };
  
  useEffect(() => {
    dispatch(getCvGeneralReducer());
  }, []);

  const handleCheckboxChange = (id: React.ReactText, checked: boolean) => {
    setSelectedKeys((prevSelectedKeys) =>
      checked
        ? [...prevSelectedKeys, id]
        : prevSelectedKeys.filter((key) => key !== id)
    );
  };

  const columnsWithCheckbox: Column[] = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      render: (text, record) => (
        <CheckboxC value={0} children={undefined} />
      ),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <div className="font-normal text-caption text-green32">
              {record.nombre}
            </div>
            <div className="font-bold text-body-sm text-green32">
              {record.rol}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Valoraciones",
      dataIndex: "valoraciones",
      key: "valoraciones",
      render: (text, record) => {
        const roundedRating = Number(record.valoraciones.toFixed(1) ?? 0);
        return (
          <div style={{ display: "flex", alignItems: "center" }} onClick={() => {
            console.log("record_ --------------------")
            console.log(record)
          }}>
            <RatingStar value={record.valoracionesPromedio} />
            <span className="font-bold text-body-sm ml-[4px]">
              {record.valoracionesPromedio}
            </span>
            <span className="font-normal text-body-sm text-green32 ml-[4px]">
              ({record.valoracionesCount})
            </span>
          </div>
        );
      },
    },
    {
      title: "Aptitudes",
      dataIndex: "aptitudes",
      key: "aptitudes",
      render: (aptitudes) => (
        <div className="font-medium text-caption text-green32">
          {aptitudes.map((aptitud: string, index: number) => (
            <div key={index}>{aptitud}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Soft Skills",
      dataIndex: "softSkills",
      key: "softSkills",
      render: (text) => (
        <div className="cursor-pointer text-caption text-blue3">{text}</div>
      ),
    },
    {
      title: "Ubicación",
      dataIndex: "ubicacion",
      key: "ubicacion",
      render: (text) => (
        <div className="font-normal text-body-sm text-green32">{text}</div>
      ),
    },
    {
      title: "Estudios",
      dataIndex: "estudios",
      key: "estudios",
      render: (educacion) => (
        <div className="font-medium text-body-sm text-green32">
          {educacion.map((carrera: string, index: number) => (
            <div key={index}>{carrera}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Experiencia",
      dataIndex: "experiencia",
      key: "experiencia",
      render: (text) => (
        <div className="font-medium text-body-sm text-green32">{text}</div>
      ),
    },
  ];

  const data: DataType[] = Array.isArray(cvGeneral) ? cvGeneral.map((cv) => ({
    id: cv.id.toString(),
    nombre: `${cv.personas.nombre} ${cv.personas.apellido_paterno} ${cv.personas.apellido_materno}`,
    valoraciones: cv.valoraciones_usuarios.reduce((sum, val) => sum + parseFloat(val.valoracion.toString()), 0) / cv.valoraciones_usuarios.length || 0,
    numReviews: cv.valoraciones_usuarios.length,
    aptitudes: cv.aptitudes_usuarios.map((apt) => apt.aptitudes.aptitud),
    softSkills: "Ver Gráfica",
    ubicacion: cv.ubicacion,
    estudios: cv.educacion_usuarios.map((edu) => edu.carrera),
    experiencia: `${cv.meses_experiencia ?? 0} meses`,
    rol: cv.experiencias_laborales_usuarios[0]?.cargo || "Rol no especificado",
    valoracionesPromedio: cv.valoracionesPromedio,
    valoracionesCount: cv.valoracionesCount,
  })) : [];

  if (loading) return <div>{[...Array(5)].map((_, index) => (
    <SkeletonRow key={index} />
  ))}</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div
    >
    {data.length > 0 ? (
      <Table
        columns={columnsWithCheckbox}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => handleCandidateClick(parseInt(record.id)),
        })}
        className="offer-table cursor-pointer"
      />
    ) : (
      <div>No hay datos disponibles</div>
    )}
      <style>{`
        .offer-table .ant-table-thead > tr > th {
          background-color: white;
          color: #5f5f5f;
          font-weight: normal;
          font-size: 12px;
          border-bottom: 1px solid #5F5F5F;
        }

        .offer-table .ant-table-thead > tr > th,
        .offer-table .ant-table-tbody > tr > td {
          padding: 12px;
          border-right: none;
        }
      `}</style>
    </div>
  );
};

export default OfferTableSearch;