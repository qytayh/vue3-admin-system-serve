// const getToken = require('jsonwebtoken')
const jsonwebtoken = require('jsonwebtoken')
const sign = require('../../config/secret')

module.exports = (app) => {
    app.use((ctx, next) => {
        if (ctx.header && ctx.header.authorization) {
            const parts = ctx.header.authorization.split(' ');
            if (parts.length === 2) {
                //取出token
                const scheme = parts[0];
                const token = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    try {
                        //jwt.verify方法验证token是否有效
                        const user = jsonwebtoken.verify(token, sign, { complete: true });
                        ctx.state.user = user;
                        // jwt.verify(token, sign, {
                        //     complete: true
                        // });
                    } catch (err) {
                        //token过期 生成新的token
                        // const newToken = getToken(user);
                        //将新token放入Authorization中返回给前端
                        // ctx.res.setHeader('Authorization', newToken);
                        // ctx.throw(401, err.message); 
                        ctx.status = 401;
                        ctx.body = {
                            code: 0,
                            msg: '登陆失效',
                        }
                    }
                }
            }
        }

        return next().catch(err => {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    code: 0,
                    msg: '登陆失效',
                }
            } else {
                throw err;
            }
        });
    });
}