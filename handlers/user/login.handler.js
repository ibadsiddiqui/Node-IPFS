
const Boom = require('@hapi/boom')

module.exports = async function (request, h, model, logger) {
    const Log = logger.bind('Password Update')
    const collectionName = model.collectionDisplayName || model.modelName


    Log.note('Generating Password Update endpoint for ' + collectionName)
    try {
        let token = "";
        let response = {};

        let user = await model.findByCredentials(
            request.payload.email,
            request.payload.password,
            Log
        );

        if (!user)
            throw Boom.unauthorized("Invalid Email or Password.");

        delete user.password;
        delete user.peerID.privKey;

        token = await model.createToken(user);

        response = { user, token };

        return h.response(response).code(200)
    } catch (err) {
        Log.error(err)
        throw Boom.badImplementation(err)
    }
}