import mongoose, { Document, Schema } from "mongoose";

interface IUserToSubscribes extends Document {
  userId: number;
  subscribes: number[];
}

interface ISubscribeToUsers extends Document {
  subscribeId: number;
  users: number[];
}

const userToSubscribesSchema: Schema = new Schema({
  userId: { type: Number, required: true, unique: true },
  subscribes: { type: [Number], required: true },
});

const subscribeToUsersSchema: Schema = new Schema({
  subscribeId: { type: Number, required: true, unique: true },
  users: { type: [Number], required: true },
});

const UserToSubscribes = mongoose.model<IUserToSubscribes>(
  "UserToSubscribes",
  userToSubscribesSchema
);
const SubscribeToUsers = mongoose.model<ISubscribeToUsers>(
  "SubscribeToUsers",
  subscribeToUsersSchema
);

export {
  UserToSubscribes,
  SubscribeToUsers,
  IUserToSubscribes,
  ISubscribeToUsers,
};
