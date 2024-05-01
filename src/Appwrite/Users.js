import conf from "../conf/conf";
import { Client, Databases, Storage } from "appwrite";

export class UserService {
  client = new Client();
  databases;
  avtarStorage;

  constructor(){
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.avtarStorage = new Storage(this.client);
  }

  //a function to create data for user where get Name from and make a avtarId-> this is used to get avtar image form storage

  //a function to uploadImage in storage with an uniqueId which will given to above function while making it to get avtar
  
  //function to delete image

  //function to get image preview
}

const userService = new UserService();

export default userService;

//more current userdata we can get from previous authservice.js getCurrentUser fnc this is to get specific user data that can be visible by anyone their avtar and their name