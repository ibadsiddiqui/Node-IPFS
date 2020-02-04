const IPFS = require("ipfs");


module.exports = function (mongoose) {
    const modelName = 'files'
    const Types = mongoose.Schema.Types

    const Schema = new mongoose.Schema({
        path: { type: Types.String },
        mode: { type: Types.String },
        mtime: { type: Types.Date, default: Date.now },
        content: {
            type: Types.String,
            required: true,
        },
        userID: {
            type: Types.String,
            ref: 'user',
            required: true,
            field: 'userID',
        }
    })
    Schema.statics = {
        collectionName: modelName,
        routeOptions: {
            associations: {
                users: {
                    type: 'MANY_MANY',
                    model: 'user'
                }
            },
        },
        //   extraEndpoints: [
        //     UserLogin,
        //     UpdatePassword,
        //   ],
        create: {
            pre: async function (payload, logger) {
                // const data = 'Hello, Ibad siddiqui'
                const node = await IPFS.create([])
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

                return files
            },
        },
        // generatePasswordHash: function (password) {
        // },

        // findByCredentials: async function (email, password) {
        // },
        // };
    }
    return Schema;



}
