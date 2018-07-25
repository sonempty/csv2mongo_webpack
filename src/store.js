import Vue from 'vue'
import Vuex from 'vuex'
import {signIn, signUp, verifyToken} from './api/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken (state, newToken) {
      state.token = newToken
    },
    removeToken (state) {
      state.token = null
    }
  },
  actions: {
    async userLogIn ({commit, state}, userPayload) {
      try {
        let userLogInResult = await signIn(userPayload)
        let token = userLogInResult.data.token
        commit('setToken', token)
        window.localStorage.setItem('ACCESS_TOKEN', token)
      } catch (err) {
        console.log(err)
      }
    },
    async userSignUp ({commit, state}, userPayload) {
      try {
        let newUser = await signUp(userPayload)
      } catch (err) {
        console.log(err)
      }
    },
    userLogOut ({commit, state}) {
      try {
        commit('removeToken')
        window.localStorage.removeItem('ACCESS_TOKEN')
      } catch (err) {
        console.log(err)
      }
    },
    checkCurrentUser ({commit, state}) {
      let userToken = localStorage.getItem('ACCESS_TOKEN')
      if (state.token) {
        return Promise.resolve(true)
      } else if (userToken) {
        verifyToken(userToken)
          .then(res => {
            if (res.data) {
              commit('setToken', userToken)
              return Promise.resolve(true)
            } else {
              commit('removeToken')
              return Promise.resolve(false)
            }
          })
          .catch(() => Promise.resolve(false))
      } else {
        return Promise.resolve(false)
      }
    }
  }
})
