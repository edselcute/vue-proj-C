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
    groups: []
}

const actions = {
    getList({ commit, rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/group/list${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
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
            $api.post(`/group/get`, pl, {
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
    getGroups({ commit, rootGetters }) {
        return new Promise(function(resolve) {

            var pl = {
                sort_column: 'name',
                sort_order: 'asc',
                limit: 1000
            }

            $api.post(`/group/list`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {

                        commit('setGroup', res.data.data.data)

                        resolve(true)
                    }
                })
                .catch(function(err) {
                    console.error(err)
                    resolve(true)
                })
        })
    },
    create({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/group/create', pl, {
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
    update({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/group/update', pl, {
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
            $api.post('/group/update-status', pl, {
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
            $api.post('/group/delete', pl, {
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
    setGroup(state, d) {
        state.groups = d
    },
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