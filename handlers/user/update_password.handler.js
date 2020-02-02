
const Boom = require('@hapi/boom')

module.exports = async function (request, h, model, logger) {
    const Log = logger.bind('Password Update')
    const collectionName = model.collectionDisplayName || model.modelName

    Log.note('Generating Password Update endpoint for ' + collectionName)
    try {
        const hashedPassword = model.generatePasswordHash(
            request.payload.password
        )

        await model.findByIdAndUpdate(request.params._id, {
            password: hashedPassword
        })

        return h.response('Password updated.').code(200)
    } catch (err) {
        Log.error(err)
        throw Boom.badImplementation(err)
    }
}