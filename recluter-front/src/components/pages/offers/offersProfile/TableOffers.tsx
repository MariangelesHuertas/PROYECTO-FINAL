import React, { useState, useEffect } from "react";
import { Table, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { GetPostulacionesByOfertaReducer } from '../../../../redux/actions/pages/offers/offersProfile/GetOffersProfile';
import CheckboxC from "../../../checkbox/CheckboxProps";
import RatingStar from "../../searchCV/RatingStar"; 

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
  aptitudes: {
    role: string;
    language: string;
    level: string;
  };
  softSkills: string;
  ubicacion: string;
  estudios: string;
  experiencia: string;
  rol: string;
}

interface OffersTableProps {
  offerId: number;
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

const OffersTable: React.FC<OffersTableProps> = ({ offerId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { postulaciones, loading, error } = useSelector((state: RootState) => state.getOffersProfile);
  const [selectedKeys, setSelectedKeys] = useState<React.ReactText[]>([]);
  const navigate = useNavigate();

  const handleCandidateClick = (candidateId: number) => {
    if (offerId && candidateId) {
      navigate(`/offers/${offerId}/candidate/${candidateId}`);
    } else {
      console.error("ID del candidato o de la oferta no definidos");
    }
  };

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
        const roundedRating = Number(record?.valoraciones?.toFixed(1) ?? 0);
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <RatingStar value={roundedRating} />
            <span className="font-bold text-body-sm ml-[4px]">
              {roundedRating}
            </span>
            <span className="font-normal text-body-sm text-green32 ml-[4px]">
              ({record.numReviews})
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
          {/*`${aptitudes.join(', ')} ${aptitudes.language} `*/}
          {aptitudes.map((aptitud: string, index: number) => (
            <div key={index}>{aptitud}</div>
          ))}
         {/*} <span className="font-bold text-caption text-green32">
            {aptitudes.level}
          </span>*/}
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

  const data: DataType[] = postulaciones.map((postulacion: any) => ({
    id: postulacion.usuarios.id.toString(),
    nombre: `${postulacion.usuarios.personas.nombre} ${postulacion.usuarios.personas.apellido_paterno} ${postulacion.usuarios.personas.apellido_materno}`,
    valoraciones: postulacion.usuarios.promedioValoraciones,
    numReviews: postulacion.usuarios.valoraciones_usuarios?.length || 0,
    /*aptitudes: {
      role: postulacion.usuarios.aptitudes_usuarios,
      language: "Ingles",
      level: "C1",
    },*/
    aptitudes: postulacion.usuarios.aptitudes_usuarios.map((apt: any) => `${apt.aptitudes.aptitud}`),
    softSkills: "Ver Gráfica",
    ubicacion: postulacion.usuarios.ubicacion,
    estudios: postulacion.usuarios.educacion_usuarios.map((carrera:any) => `${carrera.carrera}`),
    /*estudios: postulacion.usuarios.educacion_usuarios[0]?.carrera,*/
    experiencia: `${postulacion.usuarios.meses_experiencia ?? 0} meses`,
    rol: postulacion.usuarios.cargo || "Rol no especificado",
  }));

  if (loading) return <div>  {[...Array(5)].map((_, index) => (
    <SkeletonRow key={index} />
  ))}</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Table
        columns={columnsWithCheckbox}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => handleCandidateClick(Number(record.id)), // Redirige al perfil del candidato al hacer clic en la fila
        })}
        className="offer-table cursor-pointer"
      />
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

export default OffersTable;