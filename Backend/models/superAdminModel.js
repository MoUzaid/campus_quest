const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const superAdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    facultyId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    designation: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    departmentQuizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
      }
    ],

    /* 🔐 PASSWORD */
    password: {
      type: String,
      required: true
    },

     // TEMP PASSWORD 
    isTempPasswordUsed: {
      type: Boolean,
      default: false
    },

    /*  FORGOT / RESET PASSWORD */
    resetToken: {
      type: String,
      default: null
    },

    resetTokenExpiry: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

//  🔐 HASH PASSWORD BEFORE SAVE */
superAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
   next();
 });




module.exports = mongoose.model("SuperAdmin", superAdminSchema);



