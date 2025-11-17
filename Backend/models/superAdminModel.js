const mongoose = require('mongoose');
const { Schema } = mongoose;

const SuperAdminSchema = new Schema(
  {
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
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    // E.g. CA, Computer Science, etc.
    department: {
      type: String,
      required: true,
      trim: true
    },

    // For future: in case multiple universities or colleges support
    
    // instituteName: {
    //   type: String,
    //   default: null,
    //   trim: true
    // },

    role: {
      type: String,
      default: "superadmin", // always superadmin
      enum: ["superadmin"]
    },

    // If you need to disable a HOD in future (soft delete)
    // isActive: {
    //   type: Boolean,
    //   default: true
    // }
  },
  { timestamps: true }
);

// Index to prevent duplicates like SAME dept + SAME email
SuperAdminSchema.index({ email: 1, department: 1 }, { unique: true });

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);

