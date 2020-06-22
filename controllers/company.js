const { mysql } = require('../qcloud')
const { changedate } = require('../tools/util');

// 查看公司列表
async function getCompanyList(ctx, next) {
    await mysql('company').
        select('*').
        then(res => {
            ctx.state.code = 0
            ctx.state.data = res
        }).catch(err => {
            ctx.state.code = -1
            throw new Error(err)
        })
}

// 按区域查看公司列表
async function getAreaStoreList(ctx, next) {
    try {
        const { cityCode, pageIndex = 0, pageSize = 10 } = ctx.query;
        const res = await mysql('company').
            select('*').
            where({ cityCode }).
            limit(pageSize).
            offset(pageIndex * pageSize);
        const total = await mysql('company').
            select(mysql.raw('count(*) as total')).
            where({ cityCode });
        ctx.state = {
            code: 0,
            data: Object.assign({}, total[0], {
                data: res,
                pageIndex,
                pageSize
            })
        };
    } catch (e) {
        ctx.state.code = -1
        throw new Error(e)
    }
}

// 查看单个公司详情
async function getCompanyDetail(ctx, next) {
    await mysql('company').
        select('*').
        where({
            id: ctx.query.id
        }).
        then(res => {
            ctx.state.code = 0
            ctx.state.data = res[0]
        }).catch(err => {
            ctx.state.code = -1
            throw new Error(err)
        })
}

// 新增公司
async function addCompany(ctx, next) {
    let item = ctx.request.body
    let createTime = changedate(new Date(), 'yyyy-MM-dd HH:mm:ss')
    await mysql('company').insert({
        name: item.name,
        createTime,
        desc: item.desc,
        logo: item.logo,
        tel: item.tel,
        phone: item.phone,
    }).then(res => {
        ctx.state.code = 0
        let data = {
            id: res[0],
            createTime
        }
        ctx.state.data = data
    }).catch(err => {
        ctx.state.code = -1
        throw new Error(err)
    })
}

// 更新单个公司
async function updateCompany(ctx, next) {
    let item = ctx.request.body
    await mysql('company').where({ id: item.id }).
        update({
            name: item.name,
            desc: item.desc,
            logo: item.logo,
            address: item.address,
            tel: item.tel,
            phone: item.phone,
        }).then(res => {
            ctx.state.code = 0
            ctx.state.data = res
        }).catch(err => {
            ctx.state.code = -1
            throw new Error(err)
        })
}

// 删除单个公司
async function removeCompany(ctx, next) {
    await mysql('company').where({
        id: ctx.request.body.id
    }).del().then(res => {
        ctx.state.code = 0
        ctx.state.data = res
    }).catch(err => {
        ctx.state.code = -1
        throw new Error(err)
    })
}

module.exports = {
    getCompanyList,
    getCompanyDetail,
    addCompany,
    updateCompany,
    removeCompany,
    getAreaStoreList
}
