import auth from "../api/auth";

const initialState = () => {
    return {
        user: {},
        isLoggedIn:false
    }
}
const state = initialState()
const getters = {

    getUserDetails(state){
        return state.playFabDetails
    }
}

const mutations = {
    SET_USER(state, payload) {
        state.user = payload
        state.isLoggedIn = true
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
}

export default {
    namespaced: true,
    actions,
    state,
    getters,
    mutations
}