export class Event{

    constructor(
        public nameEvent: String,
        public typeEvent: String,
        public description: String,
        public date: Date,
        public imageEvent: String,
        public hotel: []
    ){}
}