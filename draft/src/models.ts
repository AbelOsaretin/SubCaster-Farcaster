import mongoose, { Document, Schema } from "mongoose";

interface IUserToSubscribes extends Document {
  subscribes: number[];
}

interface ISubscribeToUsers extends Document {
  users: number[];
}

const userToSubscribesSchema: Schema = new Schema({
  _id: { type: Number, required: true },
  subscribes: { type: [Number], required: true },
});

const subscribeToUsersSchema: Schema = new Schema({
  _id: { type: Number, required: true },
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
