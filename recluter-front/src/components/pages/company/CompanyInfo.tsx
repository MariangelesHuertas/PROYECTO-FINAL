import React, { useState } from 'react';
import { Button } from 'antd';
import IconCheck from '../../../assets/img/company/CheckW.svg'; // Importa el icono de check
import IconAlerts from '../../../assets/icons/alerts.svg'; // Importa el icono de alertas
import LogoCompany from '../../../assets/img/company/logo_example.png';
import ValuationModal from '../modals/ModalValoraPerfil'; // Importa el modal
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { FollowEnterpriseReducer } from '../../../redux/actions/enterprise/FollowEnterprise';

interface CompanyInfoProps {
  id_empresa: number;
  enterprise: {
    empresa_seguida: [],
    usuarios: {
      link_valoracion: string
    }
  };
  title: string;
  location: string;
  industry: string;
  workers: string;
  avatarUrl?: string; // Prop para la imagen del avatar
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  id_empresa, enterprise, title, location, industry, workers, avatarUrl
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [followCompany, setFollowCompany] = useState(
    enterprise.empresa_seguida.length > 0 ?true :false
  );

  const {
    rex_loading_follow,
    rex_request_follow
  } = useSelector(({ followEnterprise }: any) => followEnterprise);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-none">
      <div className="flex items-center">
        <div
          className={`w-24 h-24 ${avatarUrl ? '' : 'bg-white'} border-none rounded mr-4`}
          style={{ backgroundImage: avatarUrl ? `url(${avatarUrl})` : `url(${LogoCompany})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
        <div>
          <h1 className="font-semibold text-2xl" style={{ fontSize: '30px' }}>{title}</h1>
          <div className="flex space-x-2 mt-2">
            <span className="bg-white text-gray-800 border border-gray2 py-1 px-2 rounded-full text-xs">{industry}</span>
            <span className="bg-white text-gray-800 border border-gray2 py-1 px-2 rounded-full text-xs">{location}</span>
            <span className="bg-white text-gray-800 border border-gray2 py-1 px-2 rounded-full text-xs">{workers}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button
          type="primary"
          icon={<img src={IconCheck} alt="Check Icon" className="h-5 w-5" />}
          className="bg-blue3 text-white w-[211px] h-[36px] ml-[18px] principal-nav-notify-button2 rounded-[4px]"
          onClick={showModal} // Muestra el modal al hacer clic
        >
          Valorar empresa
        </Button>
        <Button
          className="principal-nav-notify-button ml-[18px] md:w-[211px] h-[36px] rounded-[4px] flex items-center"
          onClick={() => {
            dispatch(FollowEnterpriseReducer(id_empresa));
            setFollowCompany(!followCompany);
          }}
          loading={rex_loading_follow}
        >
          {!rex_loading_follow && (
            <img src={IconAlerts} alt="Alerts Icon" className="h-5 w-5 " />
          )}
          {followCompany ? "Dejar de seguir" : "Seguir a esta empresa"}
        </Button>
      </div>
      {/* Modal */}
      <ValuationModal
        visible={isModalVisible}
        onClose={handleModalClose}
        entityName={title}
        entityType="company"
        linkVal={enterprise?.usuarios?.link_valoracion}
      />
    </div>
  );
};

export default CompanyInfo;
