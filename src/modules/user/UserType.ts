import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs, globalIdField } from 'graphql-relay';

import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { GraphQLContext } from '../../graphql/types';

import { IUser } from './UserModel';
import { load } from './UserLoader';
import { CharacterConnection } from '../character/CharacterType';

import * as CharacterLoader from '../character/CharacterLoader'

const UserType = new GraphQLObjectType<IUser, GraphQLContext>({
  name: 'User',
  description: 'User data',
  //@ts-ignore
  fields: () => ({
    id: globalIdField('User'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    characters: {
      type: CharacterConnection.connectionType,
      args: {
        ...connectionArgs
      },
      resolve: async (user, args, context) => {
        await CharacterLoader.loadAll(context, withFilter(args, {user: user._id}))
      }
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;

registerTypeLoader(UserType, load);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});