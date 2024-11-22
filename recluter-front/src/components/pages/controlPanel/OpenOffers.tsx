import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponentDessign from "../../table/TableDessign";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { GetOffersReducer } from "../../../redux/actions/pages/company/Offers";
import { useNavigate } from "react-router-dom";

interface Offer {
  key: string;
  name: string;
  inscritos: number;
}

const OpenOffers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    rex_offers: offersData,
    rex_loading: loading,
    rex_error: error,
    rex_meta,
  } = useSelector(({ offers }: any) => offers);

  const [nameSortOrder, setNameSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [inscritosSortOrder, setInscritosSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [sortColumn, setSortColumn] = useState<string>('cargo');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const meta = { total: 4 };
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [offers, setOffers] = useState<Offer[]>([]);

  console.log('rex_meta:', rex_meta)


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(GetOffersReducer(currentPage, pageSize,));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (offersData) {
      const transformedOffers = offersData.map((offer: any) => ({
        key: offer.id.toString(),
        name: offer.cargo,
        inscritos: offer._count.postulaciones || 0,
      }));
      setOffers(transformedOffers);
    }
  }, [offersData]);

  const handleSortChange = (column: string, order: string) => {
    setSortColumn(column);
    setSortOrder(order as 'asc' | 'desc');
  };

  const columns = [
    {
      title: "Nombre",
      key: "name",
      dataIndex: "name",
      sorter: true,
      sortOrder: nameSortOrder,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "N° inscritos",
      key: "inscritos",
      dataIndex: "inscritos",
      sorter: true,
      sortOrder: inscritosSortOrder,
      render: (text: string) => <span>{text}</span>,
    },
  ];

  return (
    <div className="px-[15px]">
      <h3 className="font-bold text-lg pb-[0px] mt-[-6px] ">Ofertas abiertas</h3>
      <div style={{}}>

        <TableComponentDessign
          customDesign={true}
          columns={columns}
          data={offers}
          meta={rex_meta}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          pageSize={pageSize}
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
  );
};

export default OpenOffers;
