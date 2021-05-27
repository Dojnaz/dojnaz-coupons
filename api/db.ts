import { Document, Model, model, Types, Schema, Query } from "mongoose"

const UserSchema = new Schema<UserDocument, UserModel>({
    name: {
        type: String,
        required: true
    },
    phoneNumber: String,
    password: String,
    email: String,
    balance: Number
})

export interface User {
    name: string,
    phoneNumber: string,
    password: string,
    email: string,
    balance: number
}

interface UserBaseDocument extends User, Document {
    phoneNumber: string,
    email: string
}

export interface UserDocument extends UserBaseDocument {

}

export interface UserPopulatedDocument extends UserBaseDocument {

}
