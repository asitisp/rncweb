import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    sender: string;
    recipient: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const messageSchema = new Schema<Message>({
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const MessageModel = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default MessageModel;
export { messageSchema, MessageModel };