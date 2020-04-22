const { mysql } = require('../qcloud')
const axios = require('axios');
const { changedate } = require('../tools/util');

// 小程序微信授权登录换取openid
async function getOpenId(ctx, next) {
    try {
        const { code } = ctx.query;
        const { data } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: 'wxa951826c9c76290b',
                secret: '67957573d25420da690f4c6798e0e8a8',
                js_code: code,
                grant_type: 'authorization_code'
            }
        });
        ctx.state.code = 0
        ctx.state.data = data
    } catch (err) {
        ctx.state.code = -1
        throw new Error(err)
    }
}

// 查看用户列表
async function getUserList(ctx, next) {
    let item = ctx.query
    let filter = {},
        filterNot = []
    if (item.company_id) {
        filter = {
            company_id: item.company_id
        }
        filterNot = ['root']
    }
    await mysql('user').
        join('company', 'user.company_id', '=', 'company.id').
        join('role', 'user.role_id', '=', 'role.id').
        select(
            'user.id',
            'user.name',
            'user.phone',
            'user.password',
            'user.age',
            'user.sign',
            'user.avatar',
            'user.sex',
            'company.id as company_id',
            'company.name as companyName',
            'role.id as role_id',
            'role.name as role_name',
            'role.fullName as role_fullName'
        ).
        where(filter).
        whereNotIn('role.name', filterNot).
        orderBy('role_id', 'ASC').
        then(res => {
            ctx.state.code = 0
            ctx.state.data = res
        }).catch(err => {
            ctx.state.code = -1
            throw new Error(err)
        })
}

// 查看单个用户详情
async function getUserDetail(ctx, next) {
    await mysql('user').join('company', 'user.company_id', '=', 'company.id').join('role', 'user.role_id', '=', 'role.id').
        select(
            'user.id',
            'user.name',
            'user.phone',
            'user.password',
            'user.age',
            'user.sign',
            'user.sex',
            'user.avatar',
            'company.id as company_id',
            'company.name as companyName',
            'role.id as role_id',
            'role.name as role_name'
        ).
        where({
            'user.id': ctx.query.id
        }).then(res => {
            ctx.state.code = 0
            ctx.state.data = res[0]
        }).catch(err => {
            ctx.state.code = -1
            throw new Error(err)
        })
}

// 用户登录
async function userLogin(ctx, next) {
    let item = ctx.request.body
    await mysql('user').join('company', 'user.company_id', '=', 'company.id').join('role', 'user.role_id', '=', 'role.id').
        select(
            'user.id',
            'user.name',
            'user.phone',
            'user.password',
            'user.age',
            'user.sign',
            'user.sex',
            'user.avatar',
            'company.id as company_id',
            'company.name as companyName',
            'role.id as role_id',
            'role.name as role_name'
        ).where({
            'user.name': item.name,
            'user.password': item.password
        }).then(res => {
            ctx.state.code = 0
            if (res.length === 0) {
                ctx.state.code = -1
                ctx.state.data = '用户名或密码不正确'
                return
            }
            ctx.state.data = res[0]
        }).catch(err => {
            ctx.state.code = -1
            throw new Error(err)
        })
}

// 小程序用户登录
async function loginByWx(ctx, next) {
    try {
        const item = ctx.request.body;
        const res = await mysql('user').join('company', 'user.company_id', '=', 'company.id').join('role', 'user.role_id', '=', 'role.id').
            select(
                'user.id',
                'user.name',
                'user.sex',
                'user.phone',
                'user.password',
                'user.age',
                'user.sign',
                'user.avatar',
                'company.id as company_id',
                'company.address as company_address',
                'company.logo as company_logo',
                'company.name as companyName',
                'role.id as role_id',
                'role.name as role_name'
            ).where({
                'user.phone': item.phone,
                'user.password': item.password
            });
        ctx.state.code = 0
        if (res.length === 0) {
            ctx.state.code = -1
            ctx.state.data = '用户名或密码不正确'
            return
        }
        const token = Math.random().toString().slice(-8) + Date.now();
        const time = changedate(new Date(), 'yyyy-MM-dd HH:mm:ss');
        const total = await mysql('token').select(1).where({ phone: item.phone });
        if (!total || total.length === 0) { // 不存在，新增
            await mysql('token').insert({
                phone: item.phone,
                token,
                time
            });
        } else { // 存在，更新
            await mysql('token').update({ token, time }).where({ phone: item.phone });
        }
        res.forEach(item => {
            item.token = token;
        })
        ctx.state.data = res
    } catch (e) {
        ctx.state.code = -1
        throw new Error(e)
    }
}

// 新增用户
async function addUser(ctx, next) {
    const item = ctx.request.body
    const info = {
        name: item.name,
        phone: item.phone,
        password: item.password,
        age: item.age,
        sign: item.sign,
        avatar: item.avatar,
        role_id: item.role_id,
        company_id: item.company_id
    };
    if (item.sex) {
        info.sex = item.sex;
    }
    const total = await mysql('user').select(1).where({ phone: item.phone, company_id: item.company_id }).orWhere({ name: item.name, company_id: item.company_id });
    if (total && total.length > 0) { // 存在,不能新增
        ctx.state.code = -1
        throw new Error('用户名或手机号已注册，请更换');
    }
    await mysql('user').insert(info).then(res => {
        ctx.state.code = 0
        const data = {
            id: res[0]
        }
        ctx.state.data = data
    }).catch(err => {
        ctx.state.code = -1
        throw new Error(err)
    })
}

// 更新单个用户信息
async function updateUser(ctx, next) {
    const item = ctx.request.body;
    const info = {
        name: item.name,
        phone: item.phone,
        password: item.password,
        age: item.age,
        sign: item.sign,
        avatar: item.avatar,
        role_id: item.role_id,
        company_id: item.company_id
    };
    if (item.sex) {
        info.sex = item.sex;
    }
    await mysql('user').where({ id: item.id }).
        update(info).then(res => {
            ctx.state.code = 0
            ctx.state.data = res
        }).catch(err => {
            ctx.state.code = -1
            throw new Error(err)
        })
}

// 删除单个用户
async function removeUser(ctx, next) {
    await mysql('user').where({
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
    getUserList,
    getUserDetail,
    userLogin,
    loginByWx,
    addUser,
    updateUser,
    removeUser,
    getOpenId
}
