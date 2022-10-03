import $api from '../../api'
import $cookies from 'vue-cookies'
const state = {
    token: $cookies.get('token'),
    profile: {
        id: 0,
        username: '',
        user_type_id: '',
        money: 0
    },
}

const actions = {
    loginUser({ commit }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
                submsg: '',
            }
            $api.post('/login', pl, {})
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        commit('setToken', res.data.token)
                    } else {
                        temp.message = 'wrong username or password'
                    }
                    resolve(temp);
                })
                .catch(function(err) {
                    console.log('error occured', err)
                    resolve(temp);
                })

        })
    },
    logoutUser({ commit, getters }) {
        return new Promise(function(resolve) {
            $api.post('/logout', {}, {
                headers: { 'Authorization': getters.token_bearer }
            }).then(function() {
                commit('desToken')
                commit('desUser')
                    // window.location.reload()
                resolve(true)
            }).catch(function() {
                commit('desToken')
                commit('desUser')
                    // window.location.reload()
                resolve(true)
            })
        })
    },
    getProfile({ commit, getters, dispatch }) {
        return new Promise(function(resolve) {
            if (getters.authenticated) {
                $api.post('/profile', {}, {
                        headers: { 'Authorization': getters.token_bearer }
                    })
                    .then(function(res) {
                        commit('setUser', res.data.data)
                        if (res.data.status == 1) {
                            commit('setUser', res.data.data)
                            resolve(true)
                        } else {
                            dispatch('logoutUser')
                        }
                    })
                    .catch(function(err) {
                        console.log('error occured', err)
                        dispatch('logoutUser')
                        resolve(true)
                    })
            } else {
                resolve(true)
            }
        })
    },
}

const mutations = {
    setToken(state, t) {
        $cookies.set('token', t)
        state.token = t;

    },
    desToken(state) {
        $cookies.remove('token')
        state.token = null
    },
    setUser(state, d) {
        var s = state
        s.profile.id = d.id
        s.profile.username = d.username
        s.profile.user_type_id = d.user_type_id
        s.profile.money = d.money
    },
    desUser(state) {
        var s = state
        s.profile.id = ''
        s.profile.username = ''
        s.profile.user_type_id = ''
        s.profile.money = 0
    },
    setMoney(state, amt) {
        state.profile.money += amt
    },
}


const getters = {
    token_bearer(state) {
        return 'Bearer ' + state.token
    },
    authenticated(state) {
        return state.token ? true : false
    },
    user_id(state) {
        return state.profile.id
    },
    user_type(state) {
        return state.profile.user_type_id
    },
    profile(state) {
        return state.profile
    },
    has_money(state) {
        return state.profile.money > 0
    }

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}