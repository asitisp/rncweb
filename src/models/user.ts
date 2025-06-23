import mongoose, {Schema,Document} from "mongoose";
import { Message, messageSchema } from "./message";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    messages: Message[];
}

const userSchema = new Schema<User>({
    username: { type: String, required: true,
        unique: true,required: true, minlength: 3, maxlength: 20 },
    email: { type: String, required: true, unique: true ,
        match: [/.+\@.+\..+/, "please use a valid email address"]},
    password: { type: String, required: true },
    verifyCode: { type: String },
    verifyCodeExpiry: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    messages: [messageSchema]
});

const UserModel = mongoose.models.User as mongoose.Model<User>
  || mongoose.model("User", userSchema);

export default UserModel;