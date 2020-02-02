const Joi = require('@hapi/joi')
const RestHapi = require('rest-hapi')

const updatePasswordHandler = require('./../../handlers/user/update_password.handler');

module.exports = function (server, model, options, logger) {
    server.route({
        method: 'PUT',
        path: '/user/{_id}/password',
        config: {
            handler: (req, h) => { },
            // updatePasswordHandler(req, h, model, logger),
            auth: null,
            description: "Update a user's password.",
            tags: ['api', 'User', 'Password'],
            validate: {
                params: {
                    _id: RestHapi.joiHelper.joiObjectId().required()
                },
                // payload: Joi.object({
                //     password: Joi.string().required()
                //         .description("The user's new password")
                // })
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