import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
      .setLocale('en');
    this.account = new Account(this.client);
  }


  async CreateAccount({ email, name, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //calling another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //learn and add It
  // async verifyUser(email){
  //   try {
  //     return await this.account.createVerification(email)
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    // return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
