import {SET_USER_INFO} from './mutations-type'
import {getStore} from './../config/global'
import {autoUploadUserInfo} from './../server/api/index'

export default{
  syncUserInfo({commit},userInfo){
    commit(SET_USER_INFO,userInfo)
  },
  async reqUserInfo({commit}){
    let userInfo  = JSON.parse(getStore('userInfo'))
    if (userInfo){
      commit(SET_USER_INFO,userInfo)
    }else{
      let result = await autoUploadUserInfo()
      console.log(result)
      if (result.success_code === 200){
        commit(SET_USER_INFO,{userInfo:result.data})
      }
    }
  }
}