const Joi = require("@hapi/joi");
const RestHapi = require("rest-hapi");

module.exports = function (server, mongoose, logger) {
    const Log = logger.bind("Login");
    const User = mongoose.model("user");

    const Boom = require("@hapi/boom");

    Log.note("Generating Login endpoint");

    const loginHandler = async function (request, h) {
        // let token = "";
        // let response = {};

        // let user = await User.findByCredentials(
        //     request.payload.email,
        //     request.payload.password,
        //     Log
        // );
console.log('====================================');
console.log(request.payload);
console.log('====================================');
        // if (!user) {
        //     throw Boom.unauthorized("Invalid Email or Password.");
        // }

        // delete user.password;

        // token = server.methods.createToken(user);

        // response = {
        //     user,
        //     token
        // };

        // return response;
    };

    server.route({
        method: "POST",
        path: "/user/login",
        config: {
            handler: loginHandler,
            auth: false,
            validate: {
                // payload: {
                    // email: Joi.string()
                    //     .email()
                    //     .lowercase()
                    //     .required(),
                    // password: Joi.string().required()
                // }
            },
            tags: ["api", "user","login"],
            plugins: {
                "hapi-swagger": {}
            }
        }
    });
};