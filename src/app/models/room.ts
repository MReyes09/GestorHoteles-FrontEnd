export class Room{
    constructor(
        public _id: string,
        public nameRoom: string,
        public price: number,
        public description: string,
        public status: string,
        public hotel: []
    ){}
}