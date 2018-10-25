import React from "react";
import Loadable from "react-loadable";
import ScaleLoader from "./components/Loader/Loader";
import Main from "./containers/Main";

function Loading() {
  return (
    <div>
      <ScaleLoader />
    </div>
  );
}

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard/Dashboard"),
  loading: Loading
});

const Registration = Loadable({
  loader: () => import("./views/Registration/Registration.js"),
  loading: Loading
});
const BulkRegistration = Loadable({
  loader: () => import("./views/BulkRegistration/BulkRegistration.js"),
  loading: Loading
});
const MediaLibrary = Loadable({
  loader: () => import("./views/MediaLibrary/Media.js"),
  loading: Loading
});
const AddressMaster = Loadable({
  loader: () => import("./views/MasterData/Address/Address.js"),
  loading: Loading
});
const StatesMaster = Loadable({
  loader: () => import("./views/MasterData/StateMaster/States.js"),
  loading: Loading
});

const DistrictMaster = Loadable({
  loader: () => import("./views/MasterData/DistrictMaster/Districts.js"),
  loading: Loading
});
const Villages = Loadable({
  loader: () => import("./views/MasterData/VillageMaster/Villages.js"),
  loading: Loading
});
const RolesMaster = Loadable({
  loader: () => import("./views/MasterData/RoleMaster/Roles.js"),
  loading: Loading
});

const LanguageMaster = Loadable({
  loader: () => import("./views/MasterData/LanguageMaster/Languages.js"),
  loading: Loading
});

const GenderMaster = Loadable({
  loader: () => import("./views/MasterData/GenderMaster/Genders.js"),
  loading: Loading
});

// const Grampanchayat = Loadable({
//   loader: () => import("./views/MasterData/Grampanchayat.js"),
//   loading: Loading
// });
const CropsCultivations = Loadable({
  loader: () => import("./views/CropsCultivation/CropsCultivation.js"),
  loading: Loading
});
const ApplicationContacts = Loadable({
  loader: () => import("./views/MasterData/ApplicationContacts/Contacts"),
  loading: Loading
});
const CropsData = Loadable({
  loader: () => import("./views/MasterData/CropsMaster/Crops.js"),
  loading: Loading
});
const Settings = Loadable({
  loader: () => import("./views/Settings/Settings.js"),
  loading: Loading
});

const ChangePassword = Loadable({
  loader: () => import("./views/Settings/ChangePassword.js"),
  loading: Loading
});

const routes = [
  { path: "/", exact: true, name: "Dashboard", component: Main },
  { path: "/dashboard", component: Dashboard },
  {path: "/beneficiary", exact: true,name: "Beneficiary", component: Registration },
  { path: "/beneficiary/beneficiaryList", name: "Registration", component: Registration },
  { path: "/beneficiary/bulkUploadBeneficiary", name: "", component: BulkRegistration },
  { path: "/mediaLibrary", name: "Media List", component: MediaLibrary },
  { path: "/mediaLibrary/media", name: "Media" },
  { path: "/master", exact: true, component: AddressMaster },
  { path: "/master/roles", name: "Roles", component: RolesMaster },
  { path: "/master/address", name: "Address", component: AddressMaster },
   { path: "/master/languages", name: "Languages", component: LanguageMaster },
 { path: "/master/genders", name: "Genders", component: GenderMaster },
   
  // { path: "/master/states", name: "States List", component: StatesMaster },
  { path: "/cropCultivations", name: "States List", component: CropsCultivations },
  
  // { path: "/states/stateForm", name: "States Form" },
  // {
  //   path: "/master/districts",
  //   name: "District Data",
  //   component: DistrictMaster
  // },
  // { path: "/master/villages", name: "Village Data", component: Villages },
  // {
  //   path: "/master/grampanchayat",
  //   name: "Grampanchayat Data",
  //   component: Grampanchayat
  // },
  {
    path: "/master/contacts",
    name: "Contacts",
    component: ApplicationContacts
  },
  { path: "/master/crops", name: "Crops Data", component: CropsData },
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/ChangePassword", name: "ChangePassword", component: ChangePassword }
];

export default routes;
