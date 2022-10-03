import $api from '../../api'
const state = {
    // data: {
    //     list: [],
    //     links: [],
    //     current_page: 1,
    //     last_page: 1,
    //     per_page: 20,
    //     total: 4
    // },
    report: [],
    revenue_series: [
        { name: 'Profit', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        // { name: 'Expenses', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
    ]
}

const actions = {
    getList({ commit, rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/report/monthly${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
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
    getOne({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/report/monthly`, pl, {
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
    revenueSeries({ commit, rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/report/revenue`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    commit('setRevenue', res.data.data)
                    resolve(res.data.data)
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },
    userTransactionHistory({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/report/user-transaction-history${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    resolve(res.data.data)
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },
    userBetHistory({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/report/user-bet-history${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    resolve(res.data.data)
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    },
    generalReport({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/report/general`, pl, {
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
    scheduleReport({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/report/schedule`, pl, {
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
    transactionReport({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/report/transaction`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    resolve(res.data.data)
                })
                .catch(function(err) {
                    console.error(err)
                })
        })
    }
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
    setRevenue(state, d) {

        state.revenue_series[0].data = []
        state.revenue_series[0].data[0] = d[0]
        state.revenue_series[0].data[1] = d[1]
        state.revenue_series[0].data[2] = d[2]
        state.revenue_series[0].data[3] = d[3]
        state.revenue_series[0].data[4] = d[4]
        state.revenue_series[0].data[5] = d[5]
        state.revenue_series[0].data[6] = d[6]
        state.revenue_series[0].data[7] = d[7]
        state.revenue_series[0].data[8] = d[8]
        state.revenue_series[0].data[9] = d[9]
        state.revenue_series[0].data[10] = d[10]
        state.revenue_series[0].data[11] = d[11]

    }
}

const getters = {
    totalProfit(state) {
        var yp = 0
        state.revenue_series[0].data.forEach(mp => {
            yp += mp
        });

        return yp
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}