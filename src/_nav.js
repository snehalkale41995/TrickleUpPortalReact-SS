export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-home"
    },
    {
      name: "Beneficiary",
      url: "/beneficiary",
      icon: "fa fa-user",
      children: [
        {
          name: "Add Beneficiary",
          url: "/beneficiary/beneficiaryList",
          icon: "fa fa-users"
        },
        {
          name: "Bulk upload beneficiary",
          url: "/beneficiary/bulkUploadBeneficiary",
          icon: "fa fa-upload"
        },
        {
          name: "Inactive Beneficiary List",
          url: "/beneficiary/inactiveUser",
          icon: "fa fa-users"
        }
      ]
    },
    {
      name: "Media Content",
      url: "/mediaContent",
      icon: "fa fa-folder-open",
      children: [
        {
          name: "Audio",
          url: "/mediaContent/audioContent",
          icon: "fa fa-volume-up"
        },
        {
          name: "Video",
          url: "/mediaContent/videoContent",
          icon: "fa fa-video-camera"
        },
        {
          name: "Image",
          url: "/mediaContent/imageContent",
          icon: "fa fa-picture-o"
        }
      ]
    },
    {
      name: "Master Data",
      url: "/master",
      icon: "fa fa-asterisk",
      children: [
        {
          name: "Address",
          url: "/master/address",
          icon: "icon-star"
        },
        {
          name: "Roles",
          url: "/master/roles",
          icon: "icon-star"
        },
        {
          name: "Gender",
          url: "/master/genders",
          icon: "icon-star"
        },
        {
          name: "Languages",
          url: "/master/languages",
          icon: "icon-star"
        }
      ]
    },
    {
      name: "Crops Cultivation",
      url: "/cropCultivations",
      icon: "fa fa-leaf",
      children: [
        {
          name: "Crops",
          url: "/cropCultivations/crops",
          icon: "fa fa-leaf"
        },
        {
          name: "Crop Steps",
          url: "/cropCultivations/CropSteps",
          icon: "fa fa-align-left"
        },
        {
          name: "Crop Materials",
          url: "/cropCultivations/CropsMaterial",
          icon: "fa fa-tint"
        }
      ]
    },
    {
      name: "Settings",
      url: "/settings",
      icon: "fa fa-cog",
      children: [
        {
          name: "My Profile",
          url: "/settings/Myprofile",
          icon: "fa fa-user"
        },
        {
          name: "Change Password",
          url: "/settings/ChangePassword",
          icon: "fa fa-cog"
        }
      ]
    },
     {
      name: "Operational User",
      url: "/operationalUser",
      icon: "fa fa-users"
    }
  ]
};

