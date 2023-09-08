import {Resolvers} from "../generated/generatedTypes";

export const roomResolvers: Resolvers = {
    Query: {
        rooms: async (_, args, {dataSources}) => {
            const response = await dataSources.roomAPI.fetchAllRooms();
            return response
        }
    },
    Room: {
        __resolveReference: async ({_id}, {dataSources}) => {
            return await dataSources.roomAPI.fetchRoom(_id);
        }
    },
    Mutation: {
        addRoom: async (_, args, {dataSources}) => {
            const response = await dataSources.roomAPI.addRoom(args);
            return response;
        },

        deleteRoom: async (_, args, {dataSources}) => {
            const response = await dataSources.roomAPI.deleteRoom(args);
            return response;
        },
    }
}