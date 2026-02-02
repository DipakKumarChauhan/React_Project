import conf from "../config/config.js";
import { Client, Account,ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;


    constructor() {       
         this.client
            .setEndpoint(conf.APPWRITE_URL) // Your Appwrite Endpoint
            .setProject(conf.APPWRITE_PROJECT_ID); // Your project ID

        this.account = new Account(this.client);
    }


    async CreateAccount({ email, password, name }) {
        
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (userAccount) {

                // Call Another Method After Signup
                return  this.login({ email, password });

            } else {
                return userAccount;
            }


        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailSession(email, password);
            // const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw error;
        }
}

    async getcurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout() {
        try {
            const res = await this.account.deleteSessions("current");
            return res;
        } catch (error) {
            throw error;
        }
    }


}

const authService = new AuthService();

export default authService;