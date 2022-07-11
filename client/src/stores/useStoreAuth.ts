import { defineStore } from 'pinia'
import type { IUserInfo } from './ServerInterface'
import { Tooltip } from '~/utils/Tooltip'
import { apiService } from '~/services/ApiService'

export const useStoreAuth = defineStore('auth', {
  state: () => ({
    isAuth: false,
    isAdmin: false,
    userInfo: {} as IUserInfo,
  }),
  getters: {
    getUserInfo: state => state.userInfo,
    getUserRole: state => state.userInfo.role,
    getUserGender: state => state.userInfo.gender,
    getUserId: state => state.userInfo._id,
    getUserName: state => state.userInfo.name,
    getUserEmail: state => state.userInfo.email,
    getIsAdmin: state => state.isAdmin,
    getIsAuth: state => state.isAuth,
  },
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      const { data, error } = await apiService.login({ body: { email, password } })

      if (!error) {
        this.$state.userInfo = data.data
        this.setIsAuth(true)
        this.setIsAdmin(this.$state.userInfo.role === 'ADMIN')
      }
      Tooltip.run({
        error: !!error,
        messageSuccess: data?.message,
        messageFail: error,
      })

      return !error
    },
    // async signup() {},
    // async logout() {},
    setIsAuth(flag: boolean) {
      this.$state.isAuth = flag
    },
    setIsAdmin(flag: boolean) {
      this.$state.isAdmin = flag
    },
  },
})
