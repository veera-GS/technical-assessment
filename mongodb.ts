import { Db, MongoClient } from "mongodb";
let db: Db;
const uri =
  "mongodb+srv://rajR:raj123456@cluster0.snol8dy.mongodb.net/?appName=Cluster0";
export const connectDb = async () => {
  const client = new MongoClient(uri
);
  await client.connect();
  db = await client.db("task-assessment");
  // console.log("mongo connection", db);

  return db;
};

export const getDb = async () => {
  if (!db) {
    const db = await connectDb();
    return db
  } else {
    return db as Db;
  }
};
