import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { GraphQLContext } from '../../graphql/types';
import { ICharacter } from './CharacterModel';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader'
import { load } from './CharacterLoader';

const CharacterType = new GraphQLObjectType<ICharacter, GraphQLContext>({
  name: 'Character',
  description: 'Character data',
  //@ts-ignore
  fields: () => ({
    id: globalIdField('Character'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    user: {
        type: UserType,
        resolve: (character, _, context) => UserLoader.load(context, character.user)
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default CharacterType;

registerTypeLoader(CharacterType, load);

export const CharacterConnection = connectionDefinitions({
  name: 'Character',
  nodeType: CharacterType,
});