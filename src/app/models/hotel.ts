export class Hotel{

    constructor(
        public _id: string,
        public nameHotel: String,
        public country: String,
        public state: String,
        public city: String,
        public zipCode: String,
        public address: String,
        public phoneHotel: Number,
        public description: String,
        public imageHotel: String,
        public user: [],
        public services:[]
    ){}
}