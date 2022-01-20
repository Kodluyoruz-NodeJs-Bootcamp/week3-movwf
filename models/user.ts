import mongoose, {
  ErrorHandlingMiddlewareFunction,
  PostMiddlewareFunction,
  Schema,
} from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "0" },
  },
  { emitIndexErrors: true }
);

type ErrorHandler = (err: any, res: any, next: (err?: any) => void) => void;

const handleE11000: ErrorHandler = (err, res, next) => {
  if (err.code === 11000) {
    const errorFields = Object.keys(err.keyPattern);

    next(`Duplicate key error: ${errorFields}`);
  } else {
    next();
  }
};

userSchema.post("save", handleE11000);
userSchema.post("create", handleE11000);
userSchema.post("update", handleE11000);
userSchema.post("insertOne", handleE11000);

const User = mongoose.model("User", userSchema);
export default User;
