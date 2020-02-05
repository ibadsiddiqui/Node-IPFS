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
    const { payload } = request;
    // Log.note('Generating Password Update endpoint for ' + collectionName)

    const node = await IPFS.create()

    let fileData = {
        path: '/',
        content: payload.file
    }


    try {
        const files = await node.add(fileData)
        await node.stop();
        let data = {
            file: files[0],
            path: '/',
            userID: payload.userID,
            isShared: false,
            sharedTo: [],
        }
        let response
        await model.models.ipfs.create(data, (err,res) => {
            if(err) throw err;
            response = res;
        })
        return h.response(response).code(200)
    } catch (err) {
        await node.stop()
        Log.error(err)
        throw Boom.badImplementation(err)
    }
}