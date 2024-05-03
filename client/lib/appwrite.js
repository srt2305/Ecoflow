import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint(process.env.ENDPOINT)
  .setProject(process.env.PROJECTID)
  .setPlatform(process.env.PLATFORM);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      process.env.DATABASEID,
      process.env.USERCOLLECTIONID,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      process.env.DATABASEID,
      process.env.USERCOLLECTIONID,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      process.env.DATABASEID,
      process.env.POSTCOLLECTIONID,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getWasteRenewablePosts = async () => {
  try {
    const posts = await databases.listDocuments(
      process.env.DATABASEID,
      process.env.POSTCOLLECTIONID,
      [
        Query.search("category", "waste"),
        Query.search("final_category", "renewable"),
        Query.orderDesc("$createdAt"),
      ]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getWasteNonrenewablePosts = async () => {
  try {
    const posts = await databases.listDocuments(
      process.env.DATABASEID,
      process.env.POSTCOLLECTIONID,
      [
        Query.search("category", "waste"),
        Query.search("final_category", "non-renewable"),
        Query.orderDesc("$createdAt"),
      ]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRoadPotPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      process.env.DATABASEID,
      process.env.POSTCOLLECTIONID,
      [
        Query.search("category", "road"),
        Query.search("final_category", "pot-hole"),
        Query.orderDesc("$createdAt"),
      ]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRoadManPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      process.env.DATABASEID,
      process.env.POSTCOLLECTIONID,
      [
        Query.search("category", "road"),
        Query.search("final_category", "man-hole"),
        Query.orderDesc("$createdAt"),
      ]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      process.env.DATABASEID,
      process.env.POSTCOLLECTIONID,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        process.env.STORAGEID,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log("filepreview error");
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  const asset = {
    name: file.name,
    type: file.mimeType,
    size: file.size,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      process.env.STORAGEID,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createImage = async (form) => {
  try {
    const [imageUrl] = await Promise.all([uploadFile(form.image, "image")]);

    const newPost = await databases.createDocument(
      process.env.DATABASEID,
      process.env.POSTCOLLECTIONID,
      ID.unique(),
      {
        title: form.title,
        image: imageUrl,
        description: form.description,
        status: form.status,
        creator: form.userId,
        category: form.category,
        location: form.location,
        final_category: form.final_category,
        remark: form.remark,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPost = async (postId) => {
  try {
    const posts = await databases.listDocuments(
      process.env.DATABASEID,
      process.env.POSTCOLLECTIONID,
      [Query.equal("$id", postId)]
    );

    return posts.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};
