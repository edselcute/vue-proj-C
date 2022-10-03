import $api from '../../api'
const state = {
    data: {
        list: [],
        links: [],
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 4
    },
    arenas: [],
    user_bet: {
        meron: {
            bet_amount: 0,
            result_amount: 0
        },
        wala: {
            bet_amount: 0,
            result_amount: 0
        },
        draw: {
            bet_amount: 0,
            result_amount: 0
        },
        data: []
    },
    live_bettors: []
}

const actions = {
    getList({ commit, rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/bet/list${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        commit('setData', res.data.data)
                        resolve(true)
                    }
                })
                .catch(function(err) {
                    console.error(err)
                    resolve(true)
                })
        })
    },
    scanBarcode({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/bet/scan`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    resolve(res.data)
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },
    claimBet({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: true,
                message: '',
            }
            $api.post(`/bet/claim`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        resolve(temp)
                    } else {
                        temp.success = false
                        temp.message = res.data.message
                        resolve(temp)
                    }

                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },
    userBet({ commit, rootGetters }, pl) {
        return new Promise(function() {
            $api.post(`/bet/user-bet`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        commit('setUserBet', res.data)
                            // resolve(res.data.data)
                    }
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },
    getOne({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/bet/get`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        resolve(res.data.data)
                    }
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },
    liveBettors({ commit, rootGetters }, pl) {
        return new Promise(function() {
            $api.post(`/bet/live`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        // resolve(res.data.data)
                        commit('setLiveBettors', res.data.live_bettors)
                    }
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },

    create({ dispatch, rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
                barcode: ''
            }
            $api.post('/bet/create', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        console.log(rootGetters['fight/current_fight_id'])
                        dispatch('fight/updateBet', { id: rootGetters['fight/current_fight_id'] }, { root: true })
                        temp.success = true
                        temp.message = 'Success'
                        temp.barcode = res.data.barcode


                        resolve(temp)
                    } else {
                        // var msg = res.data.messaage
                        // if (msg.name) {
                        //     temp.message = msg.name[0]
                        // }
                        resolve(temp)
                    }
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
    update({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/bet/update', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = 'Success'
                        resolve(temp)
                    } else {
                        var msg = res.data.messaage
                        if (msg.name) {
                            temp.message = msg.name[0]
                        }
                        resolve(temp)
                    }
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
    update_status({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/bet/update-status', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = `Success Change Status`
                        resolve(temp)
                    } else {
                        temp.message = `Failed to change status`
                        resolve(temp)
                    }
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
    delete({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/bet/delete', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = 'Success'
                        resolve(temp)
                    }
                    resolve(temp)
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
}

const mutations = {
    setData(state, d) {
        state.data.list = d.data
        state.data.links = d.links
        state.data.current_page = d.current_page
        state.data.last_page = d.last_page
        state.data.per_page = d.per_page
        state.data.total = d.total
    },
    setUserBet(state, d) {
        var s = state.user_bet
        s.meron.bet_amount = d.meron.bet_amount
        s.meron.result_amount = d.meron.result_amount
        s.wala.bet_amount = d.wala.bet_amount
        s.wala.result_amount = d.wala.result_amount
        s.draw.bet_amount = d.draw.bet_amount
        s.draw.result_amount = d.draw.result_amount

        s.data = d.data
    },
    clearUserBet(state) {
        var s = state.user_bets
        s.meron.bet_amount = 0
        s.meron.result_amount = 0
        s.wala.bet_amount = 0
        s.wala.result_amount = 0
        s.draw.bet_amount = 0
        s.draw.result_amount = 0
        s.data = []
    },
    setLiveBettors(state, d) {
        state.live_bettors = d
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}