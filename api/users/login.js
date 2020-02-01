const Joi = require('@hapi/joi')
// const RestHapi = require('rest-hapi')

const LoginHandler = require('../../handlers/user/login.handler');

module.exports = function (server, model, options, logger) {
    server.route({
        method: 'POST',
        path: '/user/login',
        config: {
            handler: (req, h) => LoginHandler(req, h, model, logger),
            auth: null,
            description: "Authorize User to Login in to the APp.",
            tags: ['api', 'User', 'Login'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().email(),
                    password: Joi.string()  
                }),
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: [
                        { code: 200, message: 'Success' },
                        { code: 400, message: 'Bad Request' },
                        { code: 404, message: 'Not Found' },
                        { code: 500, message: 'Internal Server Error' }
                    ]
                }
            }
        }
    })
}