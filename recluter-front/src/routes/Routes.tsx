import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import SecurityPolicies from '../pages/auth/securityPolicies/SecurityPolicies';
import HomeCompany from '../pages/homeCompany/HomeCompany';
import Gratitude from '../examples/gratitude/Gratitude';
import EmpleoRecomendaciones from '../pages/employment/Employment';
import Company from '../pages/company/company/Company';
import FollowedCompanies from '../pages/company/followedCompanies/FollowedCompanies';
import CompanyDetail from '../pages/company/companyDetail/CompanyDetail';
import MyPortal from '../pages/myPortal/MyPortal';
import SearchCV from '../pages/searchCV/SearchCV';
import OffersProfile from '../pages/offers/offersProfile/OffersProfile';
import CandidateInformation from '../pages/offers/offersProfile/CandidateInformation';
import KillerQuestions from '../pages/offers/KillerQuestions/KillerQuestion';
import ExampleChipPage from '../examples/chip/Chip';
import CardEmpresaExample from '../examples/cards/CardCompany';
//import CardCompanyExample from './examples/cards/CardCompanyButtons';
import ChartDonutExample from '../examples/chartDonut/ChartDonut';
import LegendGroupExample from '../examples/legendGroup/LegendGroup';
import AppExample from '../examples/dropdownInput/DropdownInput';
import RatingExample from '../examples/rating/Rating';
import ModalsExample from '../examples/modals/Modals';
import SidebarExample from '../examples/sidebarProfile/SidebarProfile';
import Sidebar from '../layout/Sidebar';
import Candidaturas from '../pages/myApplications/MyApplications';
import ControlPanel from '../pages/controlPanel/ControlPanel';
import Offers from '../pages/offers/Offers';
//import OpenOffers from '../pages/offers/openOffers/OpenOffers';
//import SavedOffers from '../pages/offers/savedOffers/SavedOffers';
//import FinishedOffers from '../pages/offers/finishedOffers/FinishedOffers';
import CreateOffers from '../pages/offers/CreateOffer/CreateOffer';
import ExampleCheckbox from '../examples/checkbox/Checkbox';
import RegisterCandidate from '../pages/auth/registerCandidate/RegisterCandidate';
import RegisterEmployment from '../pages/auth/registerEmployment/RegisterEmployment';
import ExampleBadge from '../examples/badge/Badge';
import CardUserExample from '../examples/cards/CardUser';
import CardEmpleoExample from '../examples/cards/CardEmployment';
import AppExampleAvatar from '../examples/avatarLabel/AvatarLabel';
import ExampleAvatar from '../examples/avatar/Avatar';
import ExampleTabs from '../examples/tabs/Tabs';
import Button from '../examples/button/Button';
import ButtonIcon from '../examples/button/ButtonIcon';
import ButtonText from '../examples/button/ButtonText';
import ToggleSwitch from '../examples/toggleSwitch/ToggleSwitch';
import Notifications from '../pages/notifications/NotificationsRoute';
import OfferRegistration from '../pages/employment/recommendations/OfferRegistration';
import ProtectedRoute from './ProtectedRoute';
import '../App.css';
import GoogleCallback from '../pages/auth/GoogleCallack';
import AuthRoute from './AuthRoute';
import LoginEnterprise from '../pages/auth/loginEnterprise/LoginEnterprise';
import Skills from '../pages/administrator/skills/Skills';
import Sectors from '../pages/administrator/sectors/Sectors';
import Keywords from '../pages/administrator/keywords/Keywords';
import Memberships from '../pages/controlPanel/memberships/Memberships';
import TypeUsers from '../pages/administrator/types-users/TypeUsers';
import PermisosPage from '../pages/administrator/types-users/PermissionsTypeUsers';

import Softskills from '../pages/administrator/softskills/Softskills';
import Carreras from '../pages/administrator/carreras/Carreras';
import TipoEducacion from '../pages/administrator/tipo_educacion/TipoEducacion';
import CentrosEducativos from '../pages/administrator/centros_educativos/CentrosEducativos';
import Idiomas from '../pages/administrator/idiomas/Idiomas';
import NivelesIdiomas from '../pages/administrator/niveles_idioma/NivelesIdiomas';
import CompanyC from '../pages/administrator/company/Company';
import Users from '../pages/administrator/usuario/Users';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/employment/*" element={<EmpleoRecomendaciones />} />
        <Route path="/company/*" element={<Company />} />
        <Route path="/followed-companies" element={<FollowedCompanies />} />
        <Route path="/companyDetail/:empresa_id" element={<CompanyDetail />} />
        <Route path="/notifications/*" element={<Notifications />} />
        <Route path="/employment/recommendations/offerRegistration/:offer_id" element={<OfferRegistration />} />

        <Route path="/sidebar" element={<Sidebar />} />
        {/* Agrupar todas las rutas de ejemplos bajo el Sidebar */}
        <Route path="/examples/*" element={<Sidebar />}>
          <Route path="chip" element={<ExampleChipPage />} />
          <Route path="checkbox" element={<ExampleCheckbox />} />
          <Route path="badge" element={<ExampleBadge />} />
          <Route path="tabs" element={<ExampleTabs />} />
          <Route path="card-user" element={<CardUserExample />} />
          <Route path="card-company" element={<CardEmpresaExample />} />
          <Route path="chart-donut-example" element={<ChartDonutExample />} />
          <Route path="card-employment-example" element={<CardEmpleoExample />} />
          <Route path="legendGroup" element={<LegendGroupExample />} />
          <Route path="buttons" element={<Button />} />
          <Route path="buttonsIcon" element={<ButtonIcon />} />
          <Route path="buttonsText" element={<ButtonText />} />
          <Route path="toggleSwitch" element={<ToggleSwitch />} />
          <Route path="appExample" element={<AppExample />} />
          <Route path="appExampleAvatar" element={<AppExampleAvatar />} />
          <Route path="exampleAvatar" element={<ExampleAvatar />} />
          <Route path="ratingExample" element={<RatingExample />} />
          <Route path="modals" element={<ModalsExample />} />
          <Route path="sidebarExample" element={<SidebarExample />} />
        </Route>

        <Route path="/administrator/*" element={<Sidebar />}>
          <Route path="aptitudes" element={<Skills />} />
          <Route path="sectores" element={<Sectors />} />
          <Route path="palabras-clave" element={<Keywords />} />
          <Route path='tipos-usuarios' element={<TypeUsers />} />
          <Route path="tipos-usuarios/:tipoUsuarioId/permisos" element={<PermisosPage />} />
          
          <Route path="softskills" element={<Softskills />} />
          <Route path="carreras" element={<Carreras />} />
          <Route path="tipo_educación" element={<TipoEducacion />} />
          <Route path="centros_educativos" element={<CentrosEducativos />} />
          <Route path="idiomas" element={<Idiomas />} />
          <Route path="niveles_idioma" element={<NivelesIdiomas />} />
          <Route path="company" element={<CompanyC />} />
          <Route path="usuarios" element={<Users />} />
        </Route>


        <Route element={<ProtectedRoute />}>
          <Route path="/myPortal/*" element={<MyPortal />} />
          <Route path="/myApplications/*" element={<Candidaturas />} />

          <Route path="/controlPanel/*" element={<ControlPanel />} />
          <Route path="memberships" element={<Memberships />} />

          <Route path="/searchCV/*">
            <Route index element={<SearchCV />} />
            <Route path="candidate/:candidateId" element={<CandidateInformation />} />
          </Route>

          <Route path="/offers/*" element={<Offers />} ></Route>

          <Route path="offer/:id/postulacion/:postulacionId/candidate/:candidateId" element={<CandidateInformation />} />
          <Route path="offer/createOffer" element={<CreateOffers />} />
          <Route path="offer-edit/:id" element={<CreateOffers />} />
          <Route path="offer/killerQuestions/:idOffer" element={<KillerQuestions />} />
          <Route path="offer/:id" element={<OffersProfile />} />
        </Route>
      </Route>

      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      
      <Route path="/" element={<Home />} />
      <Route path="/:link_valoracion" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-enterprise" element={<LoginEnterprise />} />
      <Route path="/register" element={<Register />} />
      <Route path="/securityPolicies" element={<SecurityPolicies />} />
      <Route path="/homeCompany" element={<HomeCompany />} />
      <Route path="/home" element={<Home />} />
      <Route path="/gratitude" element={<Gratitude />} />

      <Route path="/registerCandidate" element={<RegisterCandidate />} />
      <Route path="/registerEmployment" element={<RegisterEmployment />} />

    </Routes>
  );
};

export default AppRoutes;
