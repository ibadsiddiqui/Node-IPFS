const IPFS = require("ipfs");
const UserUploadFile = require('../api/upload_file')
const UserGetFile = require('../api/get_files');

module.exports = function (mongoose) {
    const modelName = 'ipfs'
    const Types = mongoose.Schema.Types

    const Schema = new mongoose.Schema({
        file: { type: Types.Mixed },
        userID: {
            type: Types.String
        },
        isShared: {
            type: Types.Boolean
        },
        name: {
            type: Types.String
        },
        content: String,
        sharedTo: [{
            type: Types.String,
        }],
    })
    Schema.statics = {
        collectionName: modelName,
        routeOptions: {
            associations: {},
            extraEndpoints: (server, model, options, logger) => [
                UserUploadFile(server, model, options, logger),
                UserGetFile(server, model, options, logger),
                //     UpdatePassword,
            ],
        },
    }
    return Schema;
}
