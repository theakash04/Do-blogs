const 
conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteStorageID: String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
  tinymceApi: String(import.meta.env.VITE_TINYMCE_API),
  userCollection: String(import.meta.env.VITE_APPWRITE_USERCOLLECTION),
}


export default conf