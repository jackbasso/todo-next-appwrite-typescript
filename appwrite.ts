import { Client, Account, ID, Databases, Storage } from 'appwrite';

//Init your SDK https://cloud.appwrite.io/console/project-64aa312c05762a47b1c9/overview/platforms
const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID}