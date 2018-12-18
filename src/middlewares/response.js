module.exports = async(ctx, next) => {
  ctx.error = ({ data, msg }) => {
    ctx.body = { code: -200, msg, data };
  }
  
  ctx.success = ({ data, msg }) => {
    ctx.body = { code: 200, msg, data };
  }
  await next()
}