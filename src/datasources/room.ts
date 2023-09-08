import {RESTDataSource} from 'apollo-datasource-rest';
import {getDocument, addDocument, deleteDocument} from '../database/util';
import {roomSchema} from '../database/schemas';
import {ROOM} from '../database/constants';
export class RoomAPI extends RESTDataSource {
    constructor() {
        super();
    }

    async addRoom(body: any) {
        console.log('add room called');

        const data = await getDocument({collection: ROOM, schema: roomSchema, query: {name: body.name}});
        if (data.length) {

            return {message: "Room already exists."}

        }
        let query = {
            name: body.name,
            seating_capacity: body.seatingCapacity
        };
        const result = await addDocument({collection: ROOM, schema: roomSchema, query});
        return {room: result, message: "success"}
    }
    async deleteRoom({roomId}: any) {
        console.log('delete room called');

        const result = await deleteDocument({collection: ROOM, schema: roomSchema, query: {_id: roomId}});

        if (result)
            return {room: result, message: "success"};
        return {room: null, message: 'failes'};
    }
    async fetchAllRooms() {
        console.log('fetch all rooms called');

        let query = {};
        const result = await getDocument({collection: ROOM, schema: roomSchema, query});

        return result;
    }

    async fetchRoom(roomId: string) {
        console.log('fetch room called');
        const data = await getDocument({collection: ROOM, schema: roomSchema, query: {_id: roomId}});
        return data[0];
    }


}