const IPFS = require("ipfs");
const Boom = require('@hapi/boom')
const BufferList = require('bl/BufferList')


module.exports = function (server, model, options, logger) {
    server.route({
        method: 'GET',
        path: '/ipfs/getFile',
        config: {
            handler: async (req, h) => await HandleGETFile(req, h, model, logger),
            auth: null,
            description: "Authorize User to Login in to the APp.",
            tags: ['api', 'ipfs', 'get', "file"],
            // validate:{
            //     params: Joi.object({
            //         hash: Joi.string().required()
            //     }),
            // },
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



async function HandleGETFile(request, h, model, logger) {
    // const Log = logger.bind('Upload File')
    const { payload } = request;
    // Log.note('Generating Password Update endpoint for ' + collectionName)

    // const node = await IPFS.create()
    let response;
    try {
        // const data = await node.get(`/ipfs/${request.query.hash}`)
        // for await (const file of node.get(`/ipfs/${request.query.hash}`)) {
        // console.log(file.path)
        // const content = new BufferList()
        // for await (const chunk of data[0].content) {
        //     content.append(chunk)
        // }

        // response = content.toString()


        // const data = await node.get(`/ipfs/${request.query.hash}`);
        // await node.stop();
        return h.response(`https://gateway.ipfs.io/ipfs/${request.query.hash}`).code(200)
        // const files = await node.add(fileData)
        // let data = {
        //     file: files[0],
        //     path: '/',
        //     userID: payload.userID,
        //     isShared: false,
        //     sharedTo: [],
        // }
        // let response
        // await model.models.ipfs.create(data, (err, res) => {
        //     if (err) throw err;
        //     response = res;
        // })
        // return h.response(response).code(200)
    } catch (err) {
        await node.stop()
        Log.error(err)
        throw Boom.badImplementation(err)
    }
}