export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66d47cee0030406b535f',
    databaseId: '66d47f81001ea0accced',
    userCollectionId: '66d47fbe0016fd974c0c',
    videoCollectionId: '66d47fdd0039bbc67a8c',
    storageId: '66d4812e003551f51513'
}


import { Client, Account, ID, Avatars, Databases, Query, Storage} from 'react-native-appwrite';
import { isCatchClause } from 'typescript';
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.
;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
// Register User
try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password);

    const newUser = await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
    )

    return newUser;

} catch(error) {
    console.log(error);
    throw new Error(error);
}
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession( email, password )
    } catch (error){
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0];


    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId
        )
        return posts.documents;

    } catch (error){
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents;

    } catch (error){
        throw new Error(error);
    }
}


export const searchPosts = async(query) => {
    try {
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.search("title", query)]
        )
        return posts.documents;

    } catch (error){
        throw new Error(error)
    }
}

export const getUserPosts = async(userId) => {
    try {
        const posts = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.videoCollectionId,
            [Query.equal("creator", userId)]
        )
        return posts.documents;

    } catch (error){
        throw new Error(error)
    }
}

export const signOut = async () => {
    try{
        const session = await account.deleteSession('current');
        return session;
    }catch(error){
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(appWriteConfig.storageId, fileId)
        }
        if(type === 'image'){
            fileUrl = storage.getFilePreview(appWriteConfig.storageId, fileId, 2000, 2000, 'top', 100)

        }
        else {
            throw new Error('Invalid file type')
        }
        if (!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        
    }
}

export const uploadFile = async (file, type) => {
    if (!file) return;
    
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    };

    console.log('FILE', file)
    try {
        const uploadedFile = await storage.createFile(
            appWriteConfig.storageId,
            ID.unique(),
            asset
        );

        console.log('Uploaded' , uploadedFile)

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
        
    } catch (error) {
        throw new Error(error)
        
    }
}

export const createVideo = async() => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            appWriteConfig.databaseId, appWriteConfig.videoCollectionId, ID.unique(), {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )
        return newPost

    } catch(error) {
        throw new Error(error);
    }
}