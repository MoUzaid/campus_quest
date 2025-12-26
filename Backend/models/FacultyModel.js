const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const facultySchema = new mongoose.Schema(
  {
    facultyId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Invalid mobile number"]
    },

    department: {
      type: String,
      required: true,
      trim: true,
      index:true
    },


    designation: {
      type: String,
      required: true,
      trim: true
    },

    /* 🔐 PASSWORD */
    password: {
      type: String,
      required: true
    },

    /* 🔐 ROLE */
    role: {
      type: Number,
      default: 0 // 0 = Faculty
    },

    /* 🔁 TEMP PASSWORD FLAG */
    isTempPasswordUsed: {
      type: Boolean,
      default: false
    },

    /* 🔁 FORGOT / RESET PASSWORD */
    resetToken: {
      type: String,
      default: null
    },

    resetTokenExpiry: {
      type: Date,
      default: null
    },

    createdQuizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
      }
    ]
  },
  {
    timestamps: true
  }
);

/* 🔐 HASH PASSWORD BEFORE SAVE */
facultySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports =
  mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);
