const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

const cors = require('koa-cors')

app.use(cors())

const loadRouter = require('./src/routes')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(jwt({ secret: publicKey }).unless({ path: [/^\/api\/employee\/login/] }))

loadRouter(app)


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  // console.log(ctx,'ctx')
  await next()
  const ms = new Date() - start

  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
