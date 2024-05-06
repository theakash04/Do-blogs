//for User account update and delete

import conf from "../conf/conf";
import { Account, Client } from "appwrite";

class AccountService{
  client = new Client();
  account;

  constructor(){
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //do this if it have backend because some function not work in frontend

  // async UpdateName(name){
  //   try {
  //     return await this.account.updateName(name);
  //   } catch (error) {
  //     throw error
  //   }
  // }

  //not possible through client side [frontend]
  // async deleteUser(userId){
  //   try {
  //     return await this.account.dele
  //   } catch (error) {
  //   }
  // }


}

const accountService = new AccountService();
export default accountService;