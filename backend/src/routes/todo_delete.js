const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    method: 'DELETE',
    path: '/todo',
    options: {
        auth : 'jwt',
        validate: {
          payload: {
            index: Joi.number().min(0).required().notes('Index to delete'),
          },
        },
        description: 'Delete item',
        notes: 'Delete an item from the todo list',
        tags: ['api'],
    },
    handler: async (request, h) => {
      let redispath  = request.auth.credentials.sub;
      let redisindex = request.payload.index;
      let {redis} = request.server.app;

      try {

        await redis.lsetAsync(redispath, redisindex,'__DELETE__');
        await redis.lremAsync(redispath, 1,         '__DELETE__');

        return h.response({}).code(200);

      } catch (e) {
        return Boom.badImplementation(e);
      }

    }
}
