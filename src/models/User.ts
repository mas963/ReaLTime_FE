import mongoose, {Document, Model, Schema} from 'mongoose';
import {hash, compare} from 'bcryptjs';
import { UserRole } from '@/types/UserRole';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(password: string): Promise<boolean>;
}

export interface UserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Geçerli bir e-posta adresi giriniz'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    emailVerified: {
      type: Date,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik yönet
  }
);

userSchema.statics.findByEmail = async function (email: string) {
  return this.findOne({email});
};

userSchema.methods.comparePassword = async function (password: string) {
  return await compare(password, this.password);
};

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
  next();
});

export const User = (mongoose.models.User as UserModel) || mongoose.model<IUser, UserModel>('User', userSchema);