/**
 * ajax 服务路由集合
 */
const router = require('koa-router')()

const controllers = require('../controllers')

// 上传文件
router.post('/putObject', controllers.upload.putObject)

// --- 歌曲 --- //
router.get('/album', controllers.album)
router.get('/getSongList', controllers.song.getSongList)

// 歌曲收藏
router.get('/collectFindByOpenId', controllers.collect.collectFindByOpenId)
router.get('/collectFindBySongId', controllers.collect.collectFindBySongId)
router.post('/addCollect', controllers.collect.addCollect)
router.delete('/removeCollect', controllers.collect.removeCollect)
router.post('/addTimes', controllers.present.addTimes)
router.get('/findAllTimes', controllers.present.findAllTimes)
router.get('/timesDetail', controllers.present.timesDetail)
router.get('/getRateList', controllers.present.getRateList)
router.post('/addTimesRate', controllers.present.addTimesRate)
router.delete('/removeRate', controllers.present.removeRate)
router.get('/findTimesByOpenid', controllers.present.findTimesByOpenid)
router.get('/findTimesNumByOpenid', controllers.present.findTimesNumByOpenid)
router.delete('/removeTimes', controllers.present.removeTimes)
router.get('/getWallList', controllers.wall.getWallList)
router.get('/articleDetail', controllers.wall.articleDetail)
router.get('/getArticleRateList', controllers.wall.getArticleRateList)
router.post('/addArticleRate', controllers.wall.addArticleRate)
router.delete('/removeArticleRate', controllers.wall.removeArticleRate)
router.get('/getFoodList', controllers.food.getFoodList)
router.get('/getFoodDetail', controllers.food.getFoodDetail)
router.get('/getFoodRate', controllers.food.getFoodRate)
router.post('/addFoodRate', controllers.food.addFoodRate)
router.delete('/removeFoodRate', controllers.food.removeFoodRate)
router.get('/getFoodImg', controllers.food.getFoodImg)
router.get('/collectFoodByOpenId', controllers.collect.collectFoodByOpenId)
router.get('/collectFoodByFoodId', controllers.collect.collectFoodByFoodId)
router.post('/addFoodCollect', controllers.collect.addFoodCollect)
router.delete('/removeFoodCollect', controllers.collect.removeFoodCollect)
router.get('/getReadNum', controllers.msg.getReadNum)
router.get('/getMsgList', controllers.msg.getMsgList)
router.put('/alterMsg', controllers.msg.alterMsg)
router.get('/getPlantList', controllers.plant.getPlantList)
router.get('/plantDetail', controllers.plant.plantDetail)
router.get('/getPlantRateList', controllers.plant.getPlantRateList)
router.post('/addPlantRate', controllers.plant.addPlantRate)
router.delete('/removePlantRate', controllers.plant.removePlantRate)
//美食
router.post('/addFood', controllers.food.addFood)
router.put('/updateFood', controllers.food.updateFood)
router.delete('/removeFood', controllers.food.removeFood)
router.post('/addFoodImg', controllers.food.addFoodImg)
router.delete('/removeFoodImg', controllers.food.removeFoodImg)
// 植物
router.get('/getPlantImg', controllers.plant.getPlantImg)
router.post('/addPlant', controllers.plant.addPlant)
router.put('/updatePlant', controllers.plant.updatePlant)
router.delete('/removePlant', controllers.plant.removePlant)
router.post('/addPlantImg', controllers.plant.addPlantImg)
router.delete('/removePlantImg', controllers.plant.removePlantImg)
// 菜单种类
router.get('/getTypeList', controllers.food.getTypeList)
router.get('/getTypeDetail', controllers.food.getTypeDetail)
router.post('/addType', controllers.food.addType)
router.put('/updateType', controllers.food.updateType)
router.delete('/removeType', controllers.food.removeType)

// iplat平台
// 公司
router.get('/getCompanyList', controllers.company.getCompanyList) // 查看公司列表
router.get('/getCompanyDetail', controllers.company.getCompanyDetail) // 查看单个公司列表
router.post('/addCompany', controllers.company.addCompany) // 新增公司
router.put('/updateCompany', controllers.company.updateCompany) // 更新单个公司
router.delete('/removeCompany', controllers.company.removeCompany) // 删除单个公司

//角色
router.get('/getRoleList', controllers.role.getRoleList) // 查看角色列表
router.get('/getRoleDetail', controllers.role.getRoleDetail) // 查看单个角色列表
router.post('/addRole', controllers.role.addRole) // 新增角色
router.put('/updateRole', controllers.role.updateRole) // 更新单个角色
router.delete('/removeRole', controllers.role.removeRole) // 删除单个角色

// 商品类型
router.get('/getGoodsTypeList', controllers.type.getGoodsTypeList) // 查看商品类型列表
router.get('/getGoodsTypeDetail', controllers.type.getGoodsTypeDetail) // 查看单个商品类型列表
router.post('/addGoodsType', controllers.type.addGoodsType) // 新增商品类型
router.put('/updateGoodsType', controllers.type.updateGoodsType) // 更新单个商品类型
router.delete('/removeGoodsType', controllers.type.removeGoodsType) // 删除单个商品类型

// 获取openid
router.get('/getOpenId', controllers.users.getOpenId) // 查看用户列表
// 用户
router.get('/getUserList', controllers.users.getUserList) // 查看用户列表
router.get('/getUserDetail', controllers.users.getUserDetail) // 查看单个用户列表
router.post('/userLogin', controllers.users.userLogin) // 用户登录
router.post('/loginByWx', controllers.users.loginByWx) // 用户登录
router.post('/addUser', controllers.users.addUser) // 新增用户
router.put('/updateUser', controllers.users.updateUser) // 更新单个用户
router.delete('/removeUser', controllers.users.removeUser) // 删除单个用户

// 商品
router.get('/getGoodsList', controllers.goods.getGoodsList) // 查看商品列表
router.get('/getGoodsDetail', controllers.goods.getGoodsDetail) // 查看单个商品列表
router.get('/getGoodsDetailById', controllers.goods.getGoodsDetailById) // 查看单个商品列表
router.post('/addGoods', controllers.goods.addGoods) // 新增商品
router.put('/updateGoods', controllers.goods.updateGoods) // 更新单个商品
router.delete('/removeGoods', controllers.goods.removeGoods) // 删除单个商品
router.get('/getGoodsByCompany', controllers.goods.getGoodsByCompany) // 按公司查找所有商品类型+类型下的商品列表

// 单位
router.get('/getUnitList', controllers.unit.getUnitList) // 查看单位列表
router.get('/getUnitDetail', controllers.unit.getUnitDetail) // 查看单个单位列表
router.post('/addUnit', controllers.unit.addUnit) // 新增单位
router.put('/updateUnit', controllers.unit.updateUnit) // 更新单个单位
router.delete('/removeUnit', controllers.unit.removeUnit) // 删除单个单位

// 订单
router.get('/getOrderList', controllers.order.getOrderList) // 查看订单列表
router.get('/getOrderDetail', controllers.order.getOrderDetail) // 查看订单详情
router.post('/addOrder', controllers.order.addOrder) // 更新单个订单信息
router.post('/printOrderById', controllers.print.printOrderById) // 打印订单
router.put('/updateOrder', controllers.order.updateOrder) // 更新单个订单信息
router.put('/updateOrderGood', controllers.order.updateOrderGood) // 更新单个订单信息
router.delete('/removeOrder', controllers.order.removeOrder) // 删除单个订单
router.get('/getOrderDetailList', controllers.order.getOrderDetailList) // 单个订单包含的商品列表

// 购物车
router.get('/getShoplist', controllers.shop.getShoplist) // 获取购物车列表
router.get('/getShoplistInValid', controllers.shop.getShoplistInValid) // 获取购物车列表
router.get('/getShoplistEasy', controllers.shop.getShoplistEasy) // 获取购物车列表easy版
router.post('/addShop', controllers.shop.addShop) // 新增购物车
router.post('/addShopMultiple', controllers.shop.addShopMultiple) // 更新单个订单信息
router.put('/updateShop', controllers.shop.updateShop) // 更新单个购物车
router.delete('/removeShop', controllers.shop.removeShop) // 删除单个购物车
router.delete('/removeShopById', controllers.shop.removeShopById) // 删除单个购物车
router.delete('/removeShopByUser', controllers.shop.removeShopByUser) // 按用户删除购物车


module.exports = router
