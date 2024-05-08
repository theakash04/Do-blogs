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
    tag,
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
          tag,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(
    slug,
    { title, description, content, featuredImage, userId, tag }
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
          tag,
        }
      );
    } catch (error) {
      throw error
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
      throw error
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error
    }
  }

  async getAllPost() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      throw error
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
      throw error;
    }
  }

  async deleteImage(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteStorageID, fileId);
      return true;
    } catch (error) {
      throw error
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(
      conf.appwriteStorageID, 
      fileId,
      'jpeg'
    );
  }
}

const postServices = new PostServices();
export default postServices;
