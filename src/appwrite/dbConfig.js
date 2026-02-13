import conf from "../config/config.js";
import { Client,ID, Databases,Storage,Query } from "appwrite";


export class DBService {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL) // Your Appwrite Endpoint
            .setProject(conf.APPWRITE_PROJECT_ID); // Your project ID
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);


    }

    async createPost({
        title, slug, content,featuredImage,status,userId
    }){

        try {
            return await this.databases.createDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            console.log("Appwrite DB Create Post Error ", error);
        }
    }

    async updatePost(slug,{
        title,  content,featuredImage,status
    }){
        try {
            
            return await this.databases.updateDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    
                }
            )

        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            
            await this.databases.deleteDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPosts(slug){
        try {
            return await this.databases.getDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            )
            
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts(queries = [Query.equal("status","active")]){
        try {
            
            return await this.databases.listDocuments(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                queries  
            )

        } catch (error) {
            throw error;
        }
    }

    // // File Upload Services
    // async uploadFile(file){
    //     try {
    //         return await this.bucket.createFile(
    //             conf.APPWRITE_BUCKET_ID,
    //             ID.unique(),
    //             file
    //         )
            
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async deleteFile(fileId){
    //     try {
    //         return await this.bucket.deleteFile(
    //             conf.APPWRITE_BUCKET_ID,
                
    //             fileId
    //         )

    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // getFilePreview(fileId){
    //     return this.bucket.getFilePreview(
    //         conf.APPWRITE_BUCKET_ID,
    //         fileId
    //     );
    // }

}

const dbservice = new DBService();

export default dbservice;


