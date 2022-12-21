import request from '../utils/requests'

export const pullTableData = (type) => {
    return request({
        method: 'GET',
        url: '/v1/infos',
        params:{type},
    })
}

export const pullTableDataVac = (type) => {
    return request({
        method: 'GET',
        url: '/v1/infos/vaccine',
        params:{type},
    })
}

export const pullBadgeData = () => {
    return request({
        method: 'GET',
        url: '/v1/infos/badge',
    })
}

export const queryData = (usertype, usergroup, target) => {
    return request({
        method: 'GET',
        url: '/v1/query',
        params:{usertype, usergroup, target},
    })
}

export const queryDataVac = (usertype, usergroup, target) => {
    return request({
        method: 'GET',
        url: '/v1/query/vaccine',
        params:{usertype, usergroup, target},
    })
}

export const searchData = (query) => {
    return request({
        method: 'GET',
        url: '/v1/search',
        params:{query},
    })
}

export const qrcodeData = () => {

    return request({
        method: 'GET',
        url: '/v1/infos/qrcode',
    })
}