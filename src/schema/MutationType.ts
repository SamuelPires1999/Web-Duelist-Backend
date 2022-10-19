
import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';

import CharacterMutations from '../modules/character/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...CharacterMutations
  }),
});

export default MutationType;