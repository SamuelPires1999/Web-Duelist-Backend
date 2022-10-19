import { GraphQLID, GraphQLInputObjectType } from 'graphql';

import { FILTER_CONDITION_TYPE , getObjectId } from '@entria/graphql-mongo-helpers';


export const characterFilterMapping = {
  user: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const CharacterFilterInputType = new GraphQLInputObjectType({
  name: 'CharacterFilter',
  description: 'Used to filter characters',
  fields: () => ({
    user: {
      type: GraphQLID,
    },
  }),
});

export default CharacterFilterInputType;