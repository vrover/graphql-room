import {typeDefs} from "./room.schema";
import {roomResolvers} from "./room.resolvers";

export const roomModule = {typeDefs, resolvers: roomResolvers};