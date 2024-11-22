import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Auth from './auth/Auth'
import Company from './pages/company/Company'
import CreateOffers from './offers/CreateOffers'
import keywordsReducer from './common/keywords/Keywords'
import GetOffers from './offers/GetOffers'
import GetOfferSave from './offers/GetOfferSave'
import Skills from './common/skills/Skills'
import SoftSkills from './common/softSkills/SoftSkills'
import CompanyC from './common/company/CompanyC'
import sectorsReducer from './common/sectors/Sectors'
import Education from './common/education/Education'
import GetWorkExperience from './pages/myPortal/workExperience/GetWorkExperience'
import GetEducation from './pages/myPortal/education/GetEducation'
import UpDateEducation from './pages/myPortal/education/UpdateEducation';
import searchOffersEmplReducer from './offers/SearchOffers';
import OffersReducer from './pages/company/Offers';
import searchOffersReducer from './pages/company/SearchOffers';
import searchCompanyReducer from './pages/company/SearchCompany';
import GetApplicationsReducer from './applications/GetApplications';
import FollowedCompaniesReducer from './pages/company/FollowedCompanies';
import CompanyDetailReducer from './pages/company/CompanyDetail';
import GetEducationOffers from './pages/offers/candidate/education/GetEducation';
import GetLanguagesOffers from './pages/offers/candidate/languages/GetLanguages';
import UpdateSobreMiReducer from './pages/myPortal/aboutMe/AboutMe';
import getSoftSkillsReducer from './pages/myPortal/softSkills/GetSoftSkills';
import PostSoftSkillsReducer from './pages/myPortal/softSkills/PostSoftSkills';
import GetLenguages from './pages/myPortal/languages/GetLanguagesUser';
import GetAllLanguages from './pages/myPortal/languages/GetAllLanguages';
import GetWorkOffer from './pages/offers/candidate/workExperience/GetWorkExperience';
import GetOffersProfile from './pages/offers/offersProfile/GetOffersProfile';
import GetSearchCV from './pages/searchCV/GetSearchCV';
import GetSearchIDCV from './pages/searchCV/GetSearchCV_ID';
import FollowEnterprise from './enterprise/FollowEnterprise';
import deleteOfferReducer from './pages/company/DeleteOffers';
import closedOffersReducer from './pages/company/ClosedOffers';
import savedOffersReducer from './pages/company/SavedOffers';
import GetSoftSkillsID from './pages/offers/candidate/softSkills/GetSoftSkillsID'
import typeUsersReducer from './common/type-users/TypeUsers'
import permissionsReducer from './common/permissions/Permissions'
import finalizeOfferReducer from './pages/company/FinalizeOfferReducer';
import draftOfferReducer from './pages/company/DraftOffer';
import GetOfferID from './pages/offers/offer/GetOffer';
import PostLanguagesUser from './pages/myPortal/languages/PostLanguagesUser';
import GetRatings from './pages/searchCV/GetRatings';
import GetRatingsPortal from './pages/myPortal/ratings/GetRatingPortal';
import GetRatingCompany from './pages/company/rating/GetRatingCompany'
import Profile from './pages/myPortal/profile/Profile'
import ValueCompany from './enterprise/rating/ValueCompany'

import CarreraReducer from './common/carrera/Carrera'
import GetTiposEducacionTableReducer from './common/education/Education'
import GetCentrosEducativosTableReducer from './common/centroEducativo/CentroEducativo'
import GetSoftSkillsTableReducer from './common/softSkills/SoftSkills'
import GetIdiomasTableReducer from './common/Idiomas/Idiomas'
import GetIdiomasNivelTableReducer from './common/IdiomasNivel/IdiomasNivel'
import UsuariosReducer from './common/usuario/Users'
import TipoUsuarioReducer from './common/TipoUsuario/TipoUsuario'
import searchCountry from './pages/emplotment/searchCountry'

// import GetRatingCompany from './pages/company/rating/GetRatingCompany';
// import Profile from './pages/myPortal/profile/Profile';
import GetCvUser from './pages/myPortal/cv/GetCVUser';
import GetCvSearch from './pages/searchCV/cv/GetCVSearch';
import GetPortfolio from './pages/myPortal/portfolio/GetPortfolio';
import GetPortfolioUser from './pages/searchCV/portfolio/GetPortfolioUser';
import PostCvUser from './pages/myPortal/cv/PostCVUser';
import PostPortfolio from './pages/myPortal/cv/PostCVUser';
import DeleteCvUser from './pages/myPortal/cv/DeleteCVUser';
import PatchCvUser from './pages/myPortal/cv/PatchCVUser';
import DeletePortfolio from './pages/myPortal/portfolio/DeletePortfolio';
import EditValuationLink from './pages/myPortal/QR/EditValuationLink';
import GetKillerQuestions from './offers/GetKillerQuestions';
import GetAptitud from './pages/myPortal/aptitudes/GetAptitud';
import DeleteAptitud from './pages/myPortal/aptitudes/DeleteAptitud';
import GetApplicationPhases from './common/fase/GetApplicationPhases';
import PatchApplicationPhases from './common/fase/PatchApplicationPhases'
import CreateSoftPortfolio from './common/softPortfolio/CreateSoftPortfolio';
import UploadPortfolio from './common/filesPortfolio/UploadPortfolio';
import inscritosofferReducer from './pages/company/InscritosOffers'
import inscritosByDia from './pages/controlPanel/RegisteredCandidates'
import getCompanyRatingsReducer from './pages/company/rating/GetRatingCompany'
import CandidateSummaryReducer from './pages/controlPanel/CandidateSummary'
import latestInscritos from './pages/controlPanel/LatestRegistrations'

const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  auth: Auth,
  company: Company,
  createOffers: CreateOffers,
  keywords: keywordsReducer,
  getOffers: GetOffers,
  getOfferSave: GetOfferSave,
  inscritosOffer: inscritosofferReducer,
  skills: Skills,
  typeUsers: typeUsersReducer,
  permissions: permissionsReducer,
  offers: OffersReducer,
  searchOffers: searchOffersReducer,
  searchOffersEmpl: searchOffersEmplReducer,
  softSkills: SoftSkills,
  companyC: CompanyC,
  sectors: sectorsReducer,
  education: Education,
  getWorkExperience: GetWorkExperience,
  getEducation: GetEducation,
  updateEducation: UpDateEducation,
  searchCompany: searchCompanyReducer,
  applications: GetApplicationsReducer,
  followedCompanies: FollowedCompaniesReducer,
  companyDetail: CompanyDetailReducer,
  deleteOffer: deleteOfferReducer,
  followEnterprise: FollowEnterprise,
  // getWorkExperienceOffers: GetWorkExperienceOffers,
  getEducationOffers: GetEducationOffers,
  updateSobreMi: UpdateSobreMiReducer,
  getSoftSkills: getSoftSkillsReducer,
  postSoftSkills: PostSoftSkillsReducer,
  getLenguages: GetLenguages,
  getLanguagesOffers: GetLanguagesOffers,
  getWorkOffer: GetWorkOffer,
  getOffersProfile: GetOffersProfile,
  getSearchCV: GetSearchCV,
  closedOffers: closedOffersReducer,
  savedOffers: savedOffersReducer,
  getSearchIDCV: GetSearchIDCV,
  getSoftSkillsID: GetSoftSkillsID,
  finalizeOffer: finalizeOfferReducer,
  draftOffer: draftOfferReducer,
  getOfferID: GetOfferID,
  getAllLanguages: GetAllLanguages,
  postLanguagesUser: PostLanguagesUser,
  getRatings: GetRatings,
  getRatingsPortal: GetRatingsPortal,
  getRatingCompany: GetRatingCompany,
  profile: Profile,
  valueCompany: ValueCompany,
  valoraciones: getCompanyRatingsReducer,

  carreras: CarreraReducer,
  tiposEducacion: GetTiposEducacionTableReducer,
  centrosEducativos: GetCentrosEducativosTableReducer,
  softskills: GetSoftSkillsTableReducer,
  idiomas: GetIdiomasTableReducer,
  nivel_idiomas: GetIdiomasNivelTableReducer,
  usuarios: UsuariosReducer,
  tipoUsuarios: TipoUsuarioReducer,

  getCvUser: GetCvUser,
  getCvSearch: GetCvSearch,
  getPortfolio: GetPortfolio,
  getPortfolioUser: GetPortfolioUser,
  postCvUser: PostCvUser,
  postPortfolio: PostPortfolio,
  deleteCvUser: DeleteCvUser,
  patchCvUser: PatchCvUser,
  createSoftPortfolio: CreateSoftPortfolio,
  uploadPortfolio: UploadPortfolio,

  getKillerQuestions: GetKillerQuestions,
  deletePortfolio: DeletePortfolio,
  editValuationLink: EditValuationLink,
  getAptitud: GetAptitud,
  deleteAptitud: DeleteAptitud,
  getApplicationPhases: GetApplicationPhases,
  patchApplicationPhases: PatchApplicationPhases,
  paises: searchCountry,
  inscritosByDia: inscritosByDia,
  candidateSummaryReducer: CandidateSummaryReducer,
  latestInscritos: latestInscritos,
});

export default createRootReducer;