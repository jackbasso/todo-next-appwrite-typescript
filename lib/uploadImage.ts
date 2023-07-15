import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    "64aa418d612f1121a57a", // Appwrite storage images bucket
    ID.unique(),
    file
  );
  return fileUploaded;
};

export default uploadImage;