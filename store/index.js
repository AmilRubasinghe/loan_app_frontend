import jwtDecode from 'jwt-decode'
// import axios from 'axios'

export const state = () => ({
    loading: false,
    userName: null,
    role:null
})

export const getters = {
    getUserName(state) {
        return state.userName
    },
    getRoles(state) {
        return state.role
    },

}

export const mutations = {

    setLoader(state, bool) {
        state.loading = bool;
    },
    SET_USERID(state, name) {
        state.userName = name;
        console.log( state.userName);
      },
    
      SET_ALLOWED_ROLE(state, role) {
          state.role = role
          console.log( state.role);
      },
}

// export const actions = {
//     nuxtServerInit({commit}, {app}) {
//         if (app.$auth.loggedIn) {
//             const userToken = app.$auth.strategies.local.token.get();
//             const {role: role} = jwtDecode(userToken);
//             const {name: userName} = jwtDecode(userToken);

//             // commit("SET_USERID", userName);
//             // commit('SET_ALLOWED_PERMISSIONS', userRoles)
//         }
//     },
// }