const IPFS = require("ipfs");
const Boom = require('@hapi/boom')

module.exports = function (server, model, options, logger) {
    server.route({
        method: 'POST',
        path: '/ipfs/upload',
        config: {
            handler: async (req, h) => await HandleUploadFile(req, h, model, logger),
            auth: null,
            description: "Authorize User to Login in to the APp.",
            tags: ['api', 'ipfs', 'upload', "file"],
            // validate: {
            // payload: {
            // file: Array([]),
            // content: "",
            // userID: ""
            // },
            // }
            // ,
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



async function HandleUploadFile(request, h, model, logger) {
    // const Log = logger.bind('Upload File')
    const collectionName = model.collectionDisplayName || model.modelName
    const { payload } = request;
    // Log.note('Generating Password Update endpoint for ' + collectionName)

    const node = await IPFS.create()

    try {
        const files = await node.add(payload)
        await node.stop();
        //   const id = await PeerId.create({ bits: 1024, keyType: 'rsa' })
        //   const detailsOfId = await id.toJSON();
        //   const hashedPassword = mongoose.model('user').generatePasswordHash(payload.password);

        //   payload.password = hashedPassword;

        //   payload.peerID = Object({
        //     id: detailsOfId.id,
        //     privKey: detailsOfId.privKey,
        //     pubKey: detailsOfId.pubKey
        //   });

        // return files
        return h.response(files).code(200)
    } catch (err) {
        node.stop
        Log.error(err)
        throw Boom.badImplementation(err)
    }
}