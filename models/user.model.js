let bcrypt = require('bcryptjs')
// const UpdatePassword = require('./../api/users/update_password')
const UserLogin = require('./../api/users/login')
// const IPFS = require("ipfs");
// const peerID = require('peer-id');

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
  const SchemaForPopulation = Schema;
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
        // UpdatePassword,
        // Password Update Endpoint
        // function (server, model, options, logger) {
        //   server.route({
        //     method: 'PUT',
        //     path: '/user/{_id}/password',
        //     config: {
        //       handler: (req, h) => updatePasswordHandler(req, h, model, logger),
        //       auth: null,
        //       description: "Update a user's password.",
        //       tags: ['api', 'User', 'Password'],
        //       validate: {
        //         params: {
        //           _id: RestHapi.joiHelper.joiObjectId().required()
        //         },
        //         payload: {
        //           password: Joi.string()
        //             .required()
        //             .description("The user's new password")
        //         }
        //       },
        //       plugins: {
        //         'hapi-swagger': {
        //           responseMessages: [
        //             { code: 200, message: 'Success' },
        //             { code: 400, message: 'Bad Request' },
        //             { code: 404, message: 'Not Found' },
        //             { code: 500, message: 'Internal Server Error' }
        //           ]
        //         }
        //       }
        //     }
        //   })
        // }
      ],
      create: {
        pre: async function (payload, logger) {

          const id = await PeerId.create({ bits: 1024, keyType: 'rsa' })

          const hashedPassword = mongoose
            .model('user').generatePasswordHash(payload.password);

          payload.password = hashedPassword;
          payload.peerID = id;

          return payload
        },
        // post: async function (data) {
        //   console.log(data);

        //   const User = mongoose.model("user", SchemaForPopulation);
        //   await User.findByID(data._id.toString(), async (err, user) => {
        //     console.log(err);

        //     var opts = [{ path: '_role' }];

        //     await User.populate(user, opts, function (err, user) {
        //       console.log(user);
        //       return;
        //     });

        //   });
        // const Users = await User.find({});
        // console.log(Users);
        // return;
        // .populate("role").exec();
        // }
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
