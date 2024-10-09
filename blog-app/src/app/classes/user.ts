export class User {
    constructor( 
       public _id: string = '',
       public Username: string='',
       public Email: string='',
       public Contact: string='',
       public Password: string='',
       public ProfileImage: File | null,
       public contentType: string=''){

    }
}
