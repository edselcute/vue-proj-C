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
    current_fight: {
        arena: {
            name: ''
        },
        schedule_id: 0,
        schedule: {
            event_name: '',
            datetime: ''
        },
        id: 0,
        fight_no: 0,
        status: 0,
        result: 0,
        meron_bet: 0,
        wala_bet: 0,
        draw_bet: 0,
        meron_payout: 0,
        wala_payout: 0,
        total_amount: 0,
        meron_count: 0,
        wala_count: 0,
        draw_count: 0,
        announcement: ''
    },
}

const actions = {
    getList({ commit, rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/fight/list${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
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
    getOne({ commit, rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/fight/get`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        commit('setCurrentFight', res.data.data)
                        resolve(res.data.data)
                    }
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },
    getCurrent({ commit, rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/fight/get-current`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        commit('setCurrentFight', res.data.data)
                        resolve(res.data.data)
                    }
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },
    updateStatus({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/fight/update-status', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = `Success Game Status`
                        resolve(temp)
                    } else {
                        temp.message = `Failed to change game status`
                        resolve(temp)
                    }
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
    updateResult({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/fight/update-result', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = `Result Success`
                        resolve(temp)
                    } else {
                        temp.message = `Result Failed`
                        resolve(temp)
                    }
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
    updateBet({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/fight/update-bet', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = `Result Success`
                        resolve(temp)
                    } else {
                        temp.message = `Result Failed`
                        resolve(temp)
                    }
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
    updateAnnouncement({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }


            $api.post('/fight/update-announcement', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        resolve(temp)
                    }
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
    updateClaimStatus({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }


            $api.post('/fight/update-claim-status', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        resolve(temp)
                    }
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
    regrade({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }

            $api.post('/fight/regrade', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        resolve(temp)
                    }
                })
                .catch(function() {
                    temp.message = 'Error Occured'
                    resolve(temp)
                })
        })
    },
    distributePlayerWin({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }

            $api.post('/fight/distribute-player-win-bet', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        resolve(temp)
                    }
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
    setCurrentFight(state, d) {
        // console.log(d)
        var s = state.current_fight
        s.schedule_id = d.schedule_id
        s.id = d.id
        s.fight_no = d.fight_no
        s.status = d.status
        s.result = d.result
        s.meron_bet = d.meron_bet
        s.wala_bet = d.wala_bet
        s.draw_bet = d.draw_bet
        s.meron_payout = d.meron_payout
        s.wala_payout = d.wala_payout
        s.total_amount = d.total_amount
        s.meron_count = d.meron_count
        s.wala_count = d.wala_count
        s.draw_count = d.draw_count
    },
    setCurrentFightTotal(state, d) {
        var s = state.current_fight
        s.meron_bet = d.meron_bet
        s.wala_bet = d.wala_bet
        s.draw_bet = d.draw_bet
        s.meron_payout = d.meron_payout
        s.wala_payout = d.wala_payout
        s.total_amount = d.total_amount
    },
    setCurrentFightStatus(state, status) {
        state.current_fight.status = status
    },
    setCurrentFightAnnouncement(state, announcement) {
        state.current_fight.announcement = announcement
    },
}

const getters = {
    current_fight_id(state) {
        return state.current_fight.id
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}