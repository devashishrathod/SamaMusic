const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ROLES, LOGIN_TYPES } = require("../constants");
const { isValidPhoneNumber } = require("../validator/common");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    dob: { type: String },
    role: {
      type: String,
      enum: [...Object.values(ROLES)],
      default: ROLES.USER,
    },
    loginType: {
      type: String,
      enum: [...Object.values(LOGIN_TYPES)],
      default: LOGIN_TYPES.PASSWORD,
    },
    password: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    mobile: {
      type: Number,
      validate: {
        validator: isValidPhoneNumber,
        message: (props) => `${props.value} is not a valid mobile number`,
      },
    },
    // referCode: { type: String, unique: true },
    // appliedReferalCode: { type: String },
    lastActivity: { type: Date, default: Date.now },
    lastLocation: { lat: Number, lng: Number },
    currentLocation: { lat: Number, lng: Number },
    fcmToken: { type: String },
    image: { type: String },
    // uniqueId: { type: String, unique: true },
    otp: { code: String, expiresAt: Date },
    currentScreen: { type: String, default: "LANDING_SCREEN" },
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    isSignUpCompleted: { type: Boolean, default: false },
    isOnBoardingCompleted: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    isOnline: { type: Boolean },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

userSchema.methods.getSignedJwtToken = function (options = {}) {
  const expiresIn = options.expiresIn || "7d";
  const secret = options.secret || process.env.JWT_SECRET;
  return jwt.sign(
    { id: this._id, role: this.role, name: this.name, email: this.email },
    secret,
    { expiresIn }
  );
};

// userSchema.pre("save", function (next) {
//   if (this.isNew) {
//     this.uniqId = generateUniqId();
//   }
//   next();
// });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
