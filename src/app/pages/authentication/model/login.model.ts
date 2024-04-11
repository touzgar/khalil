import { Image } from "../../apps/user/image.model";

export class User {
    username!: string;
    password!: string;
    email!: string;
    enabled!: boolean;
    roles!: string[]; // Ensure this matches what you're sending from the frontend
    roleName!: string;
    image:Image;
    imageStr:string;
    
  }
  