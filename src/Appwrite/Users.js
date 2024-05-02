import conf from "../conf/conf";
import { Client, Databases } from "appwrite";

export class UserService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async CreateUserDetails({ name, $id }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.userCollection,
        $id,
        { name }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getUserDetails($id){
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.userCollection,
        $id
        //fix this
      )
    } catch (error) {
      throw error
    }
  }

  //will make a option to delte if i have account center in website
}

const userService = new UserService();

export default userService;
