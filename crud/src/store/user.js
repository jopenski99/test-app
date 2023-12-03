import auth from "../api/auth";
import user from "../api/user";
const initialState = () => {
    return {
        user: {},
        isLoggedIn:false,
        tasks:[]
    }
}
const state = initialState()
const getters = {
    getLoggedStatus(state){
        return state.isLoggedIn
    },
    getTasks(state){
        return state.tasks
    }
}

const mutations = {
    SET_USER(state, payload) {
        state.user = payload
        state.isLoggedIn = true
    },
    SET_USER_TASKS(state, payload) {
        state.tasks = payload
    },
}

const actions = {
    async handleLogin({ commit }, payload) {
        let response = await auth.login(payload)
        console.log(response)
        if(response){
            commit('SET_USER', response)
            localStorage.setItem('user',JSON.stringify(response))
            return true
        }else{
            return false
        }
       
    },
    async removeDetails({ commit }, payload) {
        commit('SET_USER', {})
    },
    async getTasks({commit}, payload){
        let response = await user.getTasks()
        console.log(response)
        if(response){
            commit('SET_USER_TASKS', response)
            return true
        }else{
            return false
        }
    }
}

export default {
    namespaced: true,
    actions,
    state,
    getters,
    mutations
}