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
const MediaContent = Loadable({
  loader: () => import("./views/MediaLibrary/Media.js"),
  loading: Loading
});
const AddressMaster = Loadable({
  loader: () => import("./views/MasterData/Address/Address.js"),
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

const Feedback = Loadable({
  loader: () => import("./views/Feedback/Feedback.js"),
  loading: Loading
});
;
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

const InactiveUser = Loadable({
  loader: () => import("./views/Registration/InactiveUser.js"),
  loading: Loading
});

const OperationalUser = Loadable({
  loader: () => import("./views/OperationalUser/OperationalUser.js"),
  loading: Loading
});
// const AudioAllocationForm = Loadable({
//   loader: () => import("./views/CropsCultivation/AudioAllocationForm.js"),
//   loading: Loading
// });

const routes = [
  { path: "/", exact: true, name: "Dashboard", component: Main },
  { path: "/dashboard", component: Dashboard },
  {
    path: "/beneficiary",
    exact: true,
    name: "Beneficiary",
    component: Registration
  },
  {
    path: "/beneficiary/beneficiaryList",
    name: "Registration",
    component: Registration
  },
  {
    path: "/beneficiary/bulkUploadBeneficiary",
    name: "",
    component: BulkRegistration
  },
  { path: "/mediaContent", name: "Media Content", component: MediaContent },
  { path: "/master", exact: true, component: AddressMaster },
  { path: "/master/roles", name: "Roles", component: RolesMaster },
  { path: "/master/address", name: "Address", component: AddressMaster },
  { path: "/master/languages", name: "Languages", component: LanguageMaster },
  { path: "/master/genders", name: "Genders", component: GenderMaster },
  {
    path: "/cropCultivations",
    name: "CropsCultivations",
    component: CropsCultivations
  },
  // {
  //   path: "/cropCultivations/audioAllocation",
  //   component: AudioAllocationForm
  // },
  {
    path: "/master/contacts",
    name: "Contacts",
    component: ApplicationContacts
  },
  { path: "/master/crops", name: "Crops Data", component: CropsData },
  { path: "/settings/Myprofile", name: "Settings", component: Settings },
  {
    path: "/settings/ChangePassword",
    name: "ChangePassword",
    component: ChangePassword
  },
  {
    path: "/beneficiary/inactiveUser",
    name: "InactiveUser",
    component: InactiveUser
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: Feedback
  },
  {
    path: "/operationalUser",
    name: "OperationalUser",
    component: OperationalUser
  },
  {
    path: "/operationalUser/operationalUserList",
    name: "OperationalUserList",
    component: OperationalUser
  }
];

export default routes;
