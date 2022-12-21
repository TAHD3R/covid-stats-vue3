import { createStore } from 'vuex'
import { pullBadgeData } from '../api/tabledata'


// Vuex状态管理，效果不是很好，不喜欢用这个
const store = createStore({
    state() {
        return {
            details: {},
            badge: {},
            search: {},
        }
    },
    mutations: {
        SET_QUERY(state, usertype, name, query) {
            state.details.usertype = usertype
            state.details.name = name
            state.query = query
        },
        SET_BADGE(state, data) {
            state.badge.total = data.total
            state.badge.ungrad = data.ungrad
            state.badge.grad = data.grad
            state.badge.faculty_academy = data.faculty_academy
            state.badge.faculty_dept = data.faculty_dept
        },
        SET_SEARCH(state, query_info) {
            state.search.query = query_info
        },
    },
    actions: {
        setBadgeInfo({ commit }) {
            return new Promise((resolve, reject) => {
                pullBadgeData().then(res => {
                    commit("SET_BADGE",
                        res.data.data)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
    }
})

export default store