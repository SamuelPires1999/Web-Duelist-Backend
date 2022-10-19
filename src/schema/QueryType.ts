import {
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { nodesField, nodeField } from '../modules/node/typeRegister';
import UserType from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import CharacterType, { CharacterConnection } from '../modules/character/CharacterType';
import * as CharacterLoader from '../modules/character/CharacterLoader'
import { connectionArgs } from 'graphql-relay';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    me: {
      type: UserType,
      resolve: (root, args, context) =>
        UserLoader.load(context, context.user?._id),
    },
    characters: {
      type:  new GraphQLNonNull(CharacterConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (root, args, context) =>
        await CharacterLoader.loadAll(context, args)
    },
  }),
});

export default QueryType;