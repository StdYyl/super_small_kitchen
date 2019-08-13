import Vue from 'vue'
import Vuex from  'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // strict:true,  //严格模式，确保state中的数据只能mutations 修改
  state:{
    registerForm:{
      //表单1
      mobile: '',
      password:  '',
      password2: '',
      //表单2
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
      ownerName:'',
      ownerCardNo:'',
      ownerCardCopyA:'',
      ownerCardCopyB:'',
      ownerMobile:'',
      //表单4
      licenseNo:'',
      licenseCopy:'',
      hygieneLicenseNo:'',
      hygieneLicenseCopy:'',
      alipayNo:'',
      bankCardName:'',
      bankCardNo:'',
      bankOfDeposit:'',
      remark:''

    }

  }
})

export default store
