export class Reservation{

    constructor(
        public _id: string,
        public checkIn: Date,
        public checkOut: Date,
        public user: [],
        public room: [],
        public serviceBefore: []
    ){}  
}
