// the user interface from backend ( not the schema but what recieves after logging in)



export interface IUserPayload {
    id: string;
    username:string;
    email:string;
    first_name:string;
    last_name:string;
    profile_picture_url :string;
}