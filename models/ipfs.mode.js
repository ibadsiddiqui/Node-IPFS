const IPFS = require("ipfs");
const UserUploadFile = require('../api/upload_file')

module.exports = function (mongoose) {
    const modelName = 'ipfs'
    const Types = mongoose.Schema.Types

    const Schema = new mongoose.Schema({
        _id: {
            type: Types.ObjectId
        }
    })
    Schema.statics = {
        collectionName: modelName,
        routeOptions: {
            associations: {}
        },
        extraEndpoints: [
            UserUploadFile,
            //     UpdatePassword,
        ],
        create: {
            pre: async function (payload, logger) {
                const data = 'Hello, Ibad siddiqui'
                //         const node = await IPFS.create([])
                //         const files = await node.add(payload)
                //         await node.stop();
                //   const id = await PeerId.create({ bits: 1024, keyType: 'rsa' })
                //   const detailsOfId = await id.toJSON();
                //   const hashedPassword = mongoose.model('user').generatePasswordHash(payload.password);

                //   payload.password = hashedPassword;

                //   payload.peerID = Object({
                //     id: detailsOfId.id,
                //     privKey: detailsOfId.privKey,
                //     pubKey: detailsOfId.pubKey
                //   });

                return payload
            },
        }
    }
    return Schema;
}
