export default{
  manager: null,
  DataList: [],
  addKitchenStepInfo: {
    first: {
      flag: true,
    },
    second: {
      flag: false,
    },
    third: {
      flag: false,
    },
    fourth: {
      flag: false,
    },
  },
  city: [0, 0, 0],
  registerForm: {
    // 表单1
    mobile: '',
    password: '',
    password2: '',
    // 表单2
    name: '',
    shortName: '',
    cover: '',
    type: 'partner',
    images: [],
    description: '',
    introduction: '',
    longitude: '',
    latitude: '',
    // 表单3
    ownerName: '',
    ownerCardNo: '',
    ownerCardCopyA: '',
    ownerCardCopyB: '',
    ownerMobile: '',
    // 表单4
    licenseNo: '',
    licenseCopy: '',
    hygieneLicenseNo: '',
    hygieneLicenseCopy: '',
    alipayNo: '',
    bankCardName: '',
    bankCardNo: '',
    bankOfDeposit: '',
    remark: '',
  },
};
