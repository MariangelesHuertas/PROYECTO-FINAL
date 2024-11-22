import React, { useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import IconCalendar from '../../assets/icons/IconCalendar.svg';
import IconGraphic from '../../assets/icons/IconGraphic.svg';
import IconVal from '../../assets/icons/IconVal.svg';
import IconBag from '../../assets/icons/IconBag.svg';
import IconLeft from '../../assets/icons/arrowLeft.svg';
import Header from '../../components/pages/principalNav/PrincipalNav';

import NewJob from '../notifications/newJob/NewJob';
import NewValuation from '../notifications/newValuation/NewValuation';
import Visibility from '../notifications/profileVisibility/ProfileVisibility';
import Notifications from '../notifications/notifications/Notifications';
import ChangesCandidature from '../notifications/chagesCandidature/ChangesCandidature';

const NotificationsRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="ml-[32px] mt-[10px]">
        <div className="flex items-center mb-5">
          <img src={IconLeft} alt="Empleo" className="mr-2 cursor-pointer" onClick={() => navigate(-1)} />
          <span className="text-body-xl font-normal">Notificaciones</span>
        </div>

        <div className="flex space-x-[24px] px-4 mb-6">
          <button
            className={`tab-link-merere2 ${
              location.pathname === '/notifications/all' ? 'active-merere' : ''
            }`}
            onClick={() => navigate('/notifications/all')}
          >
            <span className="inline">Todas mis notificaciones</span>
          </button>
          <button
            className={`tab-link-merere2 ${
              location.pathname === '/notifications/job' ? 'active-merere' : ''
            }`}
            onClick={() => navigate('/notifications/job')}
          >
            <img src={IconBag} alt="Empleo" className="mr-2 inline" />
            <span className="inline">Un empleo nuevo para ti</span>
          </button>
          <button
            className={`tab-link-merere2 ${
              location.pathname === '/notifications/valuation' ? 'active-merere' : ''
            }`}
            onClick={() => navigate('/notifications/valuation')}
          >
            <img src={IconVal} alt="Valoración" className="mr-2 inline" />
            <span className="inline">Tienes una nueva valoración</span>
          </button>
          <button
            className={`tab-link-merere2 ${
              location.pathname === '/notifications/visibility' ? 'active-merere' : ''
            }`}
            onClick={() => navigate('/notifications/visibility')}
          >
            <img src={IconGraphic} alt="Visibilidad" className="mr-2 inline" />
            <span className="inline">Da más visibilidad de tu perfil</span>
          </button>
          <button
            className={`tab-link-merere2 ${
              location.pathname === '/notifications/applications' ? 'active-merere' : ''
            }`}
            onClick={() => navigate('/notifications/applications')}
          >
            <img src={IconCalendar} alt="Candidaturas" className="mr-2 inline" />
            <span className="inline">Cambios en la candidaturas</span>
          </button>
        </div>
        
        <div className="flex justify-between">
          <div className="w-1/4">
            <h3 className="text-body-md font-bold mb-2 mt-[42px]">Gestiona tus notificaciones</h3>
            <a href="/myPortal/generalSettings" className="text-blue3 text-body-sm font-semibold relative">
              Ajustes generales
              <span className="absolute left-0 right-0 bottom-[-2px] h-[1px] bg-blue3"></span>
            </a>
          </div>
          
          <div className="w-3/4">
            <Routes>
              <Route path="all" element={<Notifications />} />
              <Route path="job" element={<NewJob />} />
              <Route path="valuation" element={<NewValuation />} />
              <Route path="visibility" element={<Visibility />} />
              <Route path="applications" element={<ChangesCandidature />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsRoute;
