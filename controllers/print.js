const { mysql } = require('../qcloud')
const { changedate, AmtFormat } = require('../tools/util');

// 打印配置
const yly = require('yly-nodejs-sdk');
const config = new yly.Config({
  'cid': '1087420892',         //应用id
  'secret': 'fbd1936498aa2bae20e2b7d5332d67c2'       //应用秘钥
});
const oauthClient = new yly.OauthClinet(config);

// 打印订单
async function printOrderById(ctx, next) {
  try {
    const item = ctx.request.body;
    const { id } = item;
    const res = await mysql('order_list').select('*').where({ id });
    const company = await mysql('company').select('*').where({ id: res[0].company_id });
    const data = await mysql('order_detail').
      select('*').
      where('order_id', id);
    res[0].goodList = data;
    res[0].company = company[0];

    const { createTime, customerName, customerPhone, customerSite, total } = res[0];
    // 获取调用凭证（仅调用一次后关闭此方法）
    // const result = await oauthClient.getToken();
    // if (
    //   result.error != 0 &&
    //   result.error_description != 'success'
    // ) {
    //   throw new Error('failed:' + result.error_description);
    // }
    // const tokenData = {
    //   'accessToken': result.body.access_token,
    //   'refreshToken': result.body.refresh_token,
    // };
    // if (result.body.machine_code) {
    //   tokenData.machineCode = result.body.machine_code;
    // }
    const tokenData = {
      accessToken: 'e4b1ffb0f05a4fe885798922d4823c00',
      refreshToken: '4d3cde29cf00459a922aca0efe423187'
    }
    const RpcClient = new yly.RpcClient(tokenData.accessToken, config);
    const Print = new yly.Print(RpcClient);
    let content = `<FS2><center>${company[0].name}</center></FS2>\n`;
    content += `订单创建时间：${createTime.slice(0, -3)}\n`;
    content += `订单打印时间：${changedate(new Date(), 'yyyy-MM-dd HH:mm')}\n`;
    content += `订单编号：${id}\n`;
    if (customerName) {
      content += `客户姓名：${customerName}\n`;
    }
    if (customerPhone) {
      content += `客户手机：${customerPhone}\n`;
    }
    if (customerSite) {
      content += `客户地址：${customerSite}\n`;
    }
    content += `${'.'.repeat(48)}\n\n`;
    content += `<table>`;
    content += `<tr><td>商品名</td><td>数量</td><td>  单价</td><td>合计(元)</td></tr>`;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      content += `<tr><td>${item.name}</td><td>${item.num}${item.unitType == 1 ? item.unitSingle : item.unitAll}</td><td>${item.unitType == 1 ? item.sale : (item.unitDecimal + item.unitSingle + 'x' + AmtFormat(item.sale / item.unitDecimal))}</td><td>${item.total}</td></tr>`;
    }
    content += `</table>`;
    content += `\n${'.'.repeat(48)}\n\n`;
    content += `<FS>订单总价: ¥ ${total} 元</FS>\n\n`;
    if (company[0].tel) {
      content += `<FS>联系电话：${company[0].tel}</FS>\n`;
    }
    if (company[0].phone) {
      content += `<FS>..........${company[0].phone}</FS>\n\n`;
    }
    content += `<FS>联系地址：${company[0].address}</FS>`;
    content += `\n${'.'.repeat(48)}\n\n`;
    content += `<QR>https://open.weixin.qq.com/sns/getexpappinfo?appid=wxf2cab88a1e083fa9&path=pages%2Forder-detail%2Findex.html?id=${id}#wechat-redirect</QR>`;

    // return console.log('content', content);

    // 打印
    await Print.index('4004632435', 'orderNo1', content);

    ctx.state.code = 0;
    ctx.state.data = res[0];
  } catch (err) {
    ctx.state.code = -1
    throw new Error(err)
  }
}


module.exports = {
  printOrderById
}