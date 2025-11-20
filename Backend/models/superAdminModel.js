const mongoose = require('mongoose');
const { Schema } = mongoose;

const SuperAdminSchema = new Schema(
  {
    // Auto-generated ID (not filled from form)
    superAdminId: {
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
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      default: "superadmin",
      enum: ["superadmin"]
    }

// If you need to disable a HOD in future (soft delete)
    // isActive: {
    //   type: Boolean,
    //   default: true
    // }


// For future: in case multiple universities or colleges support
    
    // instituteName: {
    //   type: String,
    //   default: null,
    //   trim: true
    // },


  },
  { timestamps: true }
);

SuperAdminSchema.index({ email: 1, department: 1 }, { unique: true });

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);
