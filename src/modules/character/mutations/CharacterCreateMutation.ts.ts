import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { GraphQLContext } from "../../../graphql/types";
import CharacterModel from "../CharacterModel";
import { CharacterConnection } from "../CharacterType";
import * as CharacterLoader from '../CharacterLoader'
import { errorField, successField } from "@entria/graphql-mongo-helpers";

type Args = {
  name: string;
};

const mutation = mutationWithClientMutationId({
    name: 'CharacterCreateMutation',
    inputFields: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
        const {name} = args
        if(!context.user) {
            return {
                error: "User not logged in"
            }
        }
        const character = await new CharacterModel({
            name,
            user: context.user._id
        }).save()

        return {
            id: character.id,
            error: null
        }
    },
    outputFields: {
        characterEdge: {
            type: CharacterConnection.edgeType,
            resolve: async ({id}, _, context) => {
                const character = await CharacterLoader.load(context, id)

                if (!character) {
                    return null
                }

                return  {
                    cursor: toGlobalId('Character', character._id),
                    node: character
                }
            }
        },
        ...errorField,
        ...successField
    }
})

export default mutation