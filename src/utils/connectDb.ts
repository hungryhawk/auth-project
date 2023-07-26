// It imports the 'mongoose' module from the 'mongoose' package.
import mongoose from 'mongoose';

// It checks if the environment variable called 'DATABASE_URL' is defined. If it is not defined, it will throw an error.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// It assigns the value of the 'DATABASE_URL' environment variable to a constant called 'DATABASE_URL'.
const DATABASE_URL: string = process.env.DATABASE_URL;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(DATABASE_URL, opts)
      .then((mongoose) => {
        console.log('Connection has been established successfully');
        return mongoose;
      })
      .catch((err) => {
        console.log(err as Error);
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDb;
