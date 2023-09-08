import gql from "graphql-tag";

export const typeDefs = gql`
extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.0",
        import: ["@key"])

type Query {
    rooms: [Room]
}
type Room @key(fields: "_id"){
    _id: String
    name: String
    seating_capacity: Int
}
type Mutation {
    addRoom(name: String, seatingCapacity: Int): RoomResponse
    deleteRoom(roomId: String): RoomResponse
}
type RoomResponse {
    room: Room
    message: String
}
`