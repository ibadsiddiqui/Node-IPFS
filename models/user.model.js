let bcrypt = require('bcryptjs')
// const UpdatePassword = require('./../api/users/update_password')
const UserLogin = require('./../api/users/login')
// const IPFS = require("ipfs");
const PeerId = require('peer-id');

module.exports = function (mongoose) {
  const modelName = 'user'
  const Types = mongoose.Schema.Types
  const Schema = new mongoose.Schema({
    email: {
      type: Types.String,
      unique: true
    },
    password: {
      type: Types.String,
      required: true,
      exclude: true,
      allowOnUpdate: false
    },
    firstName: { type: Types.String },
    lastName: { type: Types.String },
    cnic: { type: Types.String },
    contactNumber: { type: Types.String },
    profileImage: { type: Types.String },
    country: { type: Types.String },
    _role: {
      type: Types.String,
      ref: 'role',
      required: true,
      field: '_role',
    }
  }, { strict: false })
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        role: {
          type: 'MANY_ONE',
          model: 'role'
        },
      },
      extraEndpoints: [
        UserLogin,
        UpdatePassword,
      ],
      create: {
        pre: async function (payload, logger) {

          const id = await PeerId.create({ bits: 1024, keyType: 'rsa' })
          const detailsOfId = await id.toJSON();
          const hashedPassword = mongoose
            .model('user').generatePasswordHash(payload.password);

          payload.password = hashedPassword;

          payload.peerID = Object({
            id: detailsOfId.id,
            privKey: detailsOfId.privKey,
            pubKey: detailsOfId.pubKey
          });

          return payload
        },
      },
    },

    generatePasswordHash: function (password) {
      let salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      return hash
    },

    findByCredentials: async function (email, password) {
      const self = this;

      const query = { email: email.toLowerCase() };

      let mongooseQuery = self.findOne(query);

      let user = await mongooseQuery.lean();

      if (!user) {
        return false;
      }

      const source = user.password;

      let passwordMatch = await bcrypt.compare(password, source);
      if (passwordMatch) {
        return user;
      } else {
        return false;
      }
    }
  };


  return Schema
}
