import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class PostServices {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({
    title,
    description,
    slug,
    content,
    featuredImage,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          description,
          content,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log(slug);
      console.log("Error :: CreatePost function ", error);
    }
  }

  async updatePost(
    slug,
    { title, description, content, featuredImage, userId }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          description,
          content,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("Error :: updatePost ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error :: deletPost ", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getPost(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error :: getPost", error);
    }
  }

  async getAllPost() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      console.log("Error :: GetAllPost function", error);
    }
  }

  //file storage services
  async uploadImage(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteStorageID,
        ID.unique(),
        file
      );
    } catch (error) {
      // throw error;
      console.log("ERROR :: uploadImage ::", error);
    }
  }

  async deleteImage(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteStorageID, fileId);
      return true;
    } catch (error) {
      console.log("error :: file delete function ", error);
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteStorageID, fileId);
  }
}

const postServices = new PostServices();
export default postServices;
