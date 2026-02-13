import conf from "../config/config.js";
import { Client,ID,Storage} from "appwrite";

export class UploadService {

    client = new Client();
   
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL) // Your Appwrite Endpoint
            .setProject(conf.APPWRITE_PROJECT_ID); // Your project ID
        
        this.bucket = new Storage(this.client);


    }

     // File Upload Services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
            
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.APPWRITE_BUCKET_ID,
                
                fileId
            )

        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.APPWRITE_BUCKET_ID,
            fileId
        );
    }

}

const uploadService = new UploadService();

export default uploadService;