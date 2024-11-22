import React, { useEffect, useState } from "react";
import { Button, Table, Tooltip } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import "./OpenEstilos.css";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import latestInscritos from "../../../redux/reducers/pages/controlPanel/LatestRegistrations";
import { GetLatestInscritosReducer } from "../../../redux/actions/pages/controlPanel/LatestRegistrations";
import TableComponentDessign from "../../table/TableDessign";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
interface Registrant {
  key: string;
  name: string;
  offer: string;
  ko: string;
}

const data: Registrant[] = [
  // { key: "1", name: "Elena Rodríguez", offer: "Reponedor de supermercado", ko: "7/7 true" },
  // { key: "2", name: "Lucía Romero", offer: "Mozo de almacén en la sección de productos perecederos", ko: "3/7 true" },
  // { key: "3", name: "Carmen Delgado", offer: "Administrativo en la sección de recursos humanos", ko: "5/7 true" },
  // { key: "4", name: "Lucía Romero", offer: "Mozo de almacén", ko: "4/7 true" },
  // { key: "5", name: "Carmen Delgado", offer: "Administrativo", ko: "6/7 true" },
  // { key: "6", name: "Carlos García", offer: "Cajero", ko: "6/7 true" },
  // { key: "7", name: "Laura Pérez", offer: "Gerente", ko: "4/7 true" },
];

const LatestRegistrants: React.FC = () => {
  const [nameSortOrder, setNameSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [offerSortOrder, setOfferSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [koSortOrder, setKoSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [dataInscritos, setDataInscritos] = useState<Registrant[]>([])

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    rex_error_latest_inscritos, rex_latest_inscritos, rex_loading_latest_inscritos 
  } = useSelector(({ latestInscritos }: RootState) => latestInscritos);


  const [currentPage, setCurrentPage] = useState(1);
  const [sizePage, setSizePage] = useState(1);
  const handleSort = (columnKey: string) => {

   

    switch (columnKey) {
      case "name":
        setNameSortOrder(nameSortOrder === "ascend" ? "descend" : "ascend");
        setOfferSortOrder(null);
        setKoSortOrder(null);
        break;
      case "offer":
        setOfferSortOrder(offerSortOrder === "ascend" ? "descend" : "ascend");
        setNameSortOrder(null);
        setKoSortOrder(null);
        break;
      case "ko":
        setKoSortOrder(koSortOrder === "ascend" ? "descend" : "ascend");
        setNameSortOrder(null);
        setOfferSortOrder(null);
        break;
    }

 
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (column: string, order: string) => {
/*     setSortColumn(column);
    setSortOrder(order as 'asc' | 'desc'); */
  };

  useEffect(() => {
    dispatch(GetLatestInscritosReducer(currentPage, sizePage));
  }, [dispatch, currentPage]);

  const columns = [
    {
      title: "Nombre",
      key: "name",
      dataIndex: "usuario.personas.nombre",
      sorter: true,
      sortOrder: null,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Oferta",
      key: "inscritos",
      dataIndex: "ofertas.cargo",
      sorter: true,
      sortOrder: null,
      render: (text: string) => <span>{text}</span>,
    },
  ];

/* 
  const columns = [
    {
      title: (
        <div onClick={() => handleSort("name")} className="flex items-center cursor-pointer  h-[6px]">
          <h1 className="font-bold text-caption">
            Nombre {nameSortOrder === "ascend" ? <UpOutlined className="ml-1" /> : <DownOutlined className="ml-1" />}
          </h1>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      width: 182,
      render: (text: string) => (
        <h1 className="font-bold text-blue3 text-body-sm custom-cell">
          {text}
        </h1>
      ),
    },
    {
      title: (
        <div onClick={() => handleSort("offer")} className="flex items-center cursor-pointer  h-[6px]">
          <h1 className="font-bold text-caption">
            Oferta {offerSortOrder === "ascend" ? <UpOutlined className="ml-1" /> : <DownOutlined className="ml-1" />}
          </h1>
        </div>
      ),
      dataIndex: "offer",
      key: "offer",
      width: 107,
      render: (text: string) => (
        <Tooltip title={text}>
          <div className="text-body-sm font-bold text-[#5B5B5B] custom-cell">
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: (
        <div onClick={() => handleSort("ko")} className="flex items-center cursor-pointer  h-[6px]">
          <h1 className="font-bold text-caption">
            KO {koSortOrder === "ascend" ? <UpOutlined className="ml-1" /> : <DownOutlined className="ml-1" />}
          </h1>
        </div>
      ),
      dataIndex: "ko",
      key: "ko",
      width: 107,
      render: (text: string) => (
        <div className="text-body-sm font-bold text-[#5B5B5B] custom-cell">
          {text}
        </div>
      ),
    },
  ]; */

  return (
    <>
    
    <div className="px-[15px]">
    <h3 className="font-bold text-lg pb-[0px] mt-[-6px] ">Ofertas abiertas</h3>
    <div style={{}}>

      <TableComponentDessign
        customDesign={true}
        columns={columns}
        data={dataInscritos}
        meta={  {total:1} }
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={sizePage}
        getData={(current, order, column) => {
          handleSortChange(column, order);
          setCurrentPage(current);
        }}
      />

      <Button
        onClick={() => {
          // console.log('offers:', offers)
          navigate("/offer/createOffer")
        }}
        style={{
          position: 'absolute',
           bottom: '40px'
        }}
        icon={<PlusOutlined />}
        className="principal-nav-notify-button2 w-[136px] h-[36px] mt-[0px] ml-0 bg-blue3 text-white">
        Nueva oferta
      </Button>
    </div>
  </div>
    {/* <div className="px-[15px]">
      <h3 className="font-bold text-lg pb-[24px]">Últimos inscritos</h3>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered={false}
          rowClassName={(record, index) =>
            `custom-row ${index % 2 === 0 ? "bg-[#F2F2F2]" : "bg-[#E6E6E6]"}`
          }
          scroll={{ y: 200 }}
          className="custom-table"
        />
      </div>
    </div> */}
    </>
  );
};

export default LatestRegistrants;
