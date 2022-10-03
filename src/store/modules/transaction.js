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
    arenas: []
}

const actions = {
    getList({ commit, rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/transaction/list${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
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
            $api.post(`/transaction/get`, pl, {
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
    create({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }

            $api.post('/transaction/create', pl, {
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
    deposit({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }

            pl.user_id = rootGetters['auth/user_id']
            $api.post('/transaction/deposit', pl, {
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
    withdraw({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }

            pl.user_id = rootGetters['auth/user_id']
            $api.post('/transaction/withdraw', pl, {
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

            $api.post('/transaction/update', pl, {
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
    uploadImage({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }

            $api.post('/transaction/upload-image', pl, {
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
    delete({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/transaction/delete', pl, {
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
    clearData(state) {
        state.data.list = []
        state.data.links = []
        state.data.current_page = 0
        state.data.last_page = 0
        state.data.per_page = 0
        state.data.total = 0
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