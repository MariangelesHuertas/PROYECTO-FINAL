import React, { useEffect, useState } from "react";
import { Table, Tooltip, Modal, Button } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import "../../../components/pages/controlPanel/OpenEstilos.css";
import FinalistInfo from "../../../components/pages/controlPanel/FinalistCandidates";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { GetClosedOffersReducerTable } from "../../../redux/actions/pages/company/ClosedOffers";
import TableComponentDessign from "../../../components/table/TableDessign";
import moment from "moment";

interface FinalistData {
  key: string;
  nombreBusqueda: string;
  inscritos: string;
  finalistas: string;
  fechaApertura: string;
  fechaCierre: string;
  diasActivos: string;
  promedioInscritos: string;
  imageUrl: string;
  nombre: string;
  puesto: string;
  ubicacion: string;
  habilidades: string[];
  descripcion: string;
  radarData: any[];
  isProfileUnlocked: boolean;
}

const CompletedFinalists: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortColumn, setSortColumn] = useState<string>('cargo');
  const [selectedFinalistData, setSelectedFinalistData] = useState<FinalistData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 2;
  const {
    rex_closedoffers: offersData,
    rex_loading: loading,
    rex_error: error,
    rex_meta } = useSelector(({ closedOffers }: any) => closedOffers);

  useEffect(() => {
    dispatch(GetClosedOffersReducerTable(1, 10));
  }, [dispatch]);

  const [offers, setOffers] = useState<FinalistData[]>([]);

  const showModal = (finalistData: FinalistData) => {
    setSelectedFinalistData(finalistData);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedFinalistData(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (column: string, order: string) => {
    setSortColumn(column);
    setSortOrder(order as 'asc' | 'desc');
  };

  useEffect(() => {
    if (offersData) {
      const transformedOffers = offersData.map((offer: any) => ({
        key: offer.id.toString(),
        nombreBusqueda: offer.cargo || '--',
        inscritos: offer._count?.postulaciones?.toString() || '--',
        finalistas: '--',
        fechaApertura: '--',
        fechaCierre: '--',
        diasActivos: '--',
        promedioInscritos: '--',
      }));
      setOffers(transformedOffers);
    }
  }, [offersData]);

  const columns = [
    {
      title: "Cargo",
      key: "cargo",
      dataIndex: "cargo",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Inscritos",
      key: "_count",
      render: (data: any) => (
        <span>{data._count.postulaciones}</span>
      ),
    },
    {
      title: "Finalistas",
      dataIndex: "countFinalistas",
      key: "countFinalistas",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Fecha de apertura",
      key: "dateApertura",
      render: (data: any) => (
        <span>{moment(data.dateApertura).format("DD/MM/YYYY H:mm")}</span>
      ),
    },
    {
      title: "Fecha de cierre",
      key: "dateFinalizada",
      render: (data: any) => (
        <span>{moment(data.dateFinalizada).format("DD/MM/YYYY H:mm")}</span>
      ),
    },
    {
      title: "Días activos de búsqueda",
      key: "diasActivos",
      render: (data: any) => {
        const fechaInicio = moment(data.dateApertura);
        const fechaFin = moment(data.dateFinalizada);

        const diferenciaEnDias = fechaFin.diff(fechaInicio, 'days');
        return (
          <span>{diferenciaEnDias}</span>
        )
      },
    },
    {
      title: "Promedio de Inscritos al día",
      key: "promedioInscritos",
      render: (data: any) => (
        <span>{data.promedioDatosPorDia.toFixed(2)}</span>
      ),
    },
    {
      title: "",
      key: "actions",
      render: () => <span>Actions</span>,
    },
  ];

  return (
    <div className="px-[15px]">
      <h3 className="font-bold text-lg pb-[24px]">Finalistas Completados</h3>
      <div style={{ maxHeight: "210px", overflowY: "auto" }}>
        <TableComponentDessign
          customDesign={true}
          columns={columns}
          data={offersData}
          meta={rex_meta}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          getData={(current, order, column) => {
            handleSortChange(column, order);
            setCurrentPage(current);
          }}
        />
      </div>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        closeIcon={<button className="bg-blue3 text-white rounded-full p-2 w-6 h-6 flex items-center justify-center">X</button>}
      >
        {selectedFinalistData && (
          <>
            <h2 className="text-center font-bold text-[22px] mb-2">Candidatos finalistas</h2>
            <p className="text-center text-gray-500 mb-4">Te presentamos a los finalistas de tu proceso de selección:</p>
            <FinalistInfo
              imageUrl={selectedFinalistData.imageUrl}
              nombre={selectedFinalistData.nombre}
              puesto={selectedFinalistData.puesto}
              ubicacion={selectedFinalistData.ubicacion}
              habilidades={selectedFinalistData.habilidades}
              descripcion={selectedFinalistData.descripcion}
              radarData={selectedFinalistData.radarData}
              isProfileUnlocked={selectedFinalistData.isProfileUnlocked}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default CompletedFinalists;