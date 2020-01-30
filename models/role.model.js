module.exports = function(mongoose) {
  const modelName = 'role'
  const Types = mongoose.Schema.Types
  const Schema = new mongoose.Schema(
    {
      name: {
        type: Types.String,
        enum: ['Seller', 'Buyer'],
        required: true
      },
      description: {
        type: Types.String
      }
    },
    { collection: modelName }
  )

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        users: {
          type: 'ONE_MANY',
          alias: 'user',
          foreignField: 'role',
          model: 'user'
        },
        permissions: {
          type: 'MANY_MANY',
          alias: 'permission',
          model: 'permission',
          linkingModel: 'role_permission'
        }
      }
    }
  }

  return Schema
}
