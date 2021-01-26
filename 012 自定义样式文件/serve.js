const Koa = require('koa')
const next = require('next')

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.response = false
    })

    server.listen(3000, () => {
        console.log('server is running 3000 😤😤😤')
    })
})
