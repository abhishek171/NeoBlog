import { User } from "./user";


export class Blog {
    constructor(
    public _id: string= '',
    public title: string='',
    public body: string='',
    public tags: string[] = [],
    public user:User,
    public createdAt?: Date ,
    public updatedAt?: Date,
    ){
        
    }
}

