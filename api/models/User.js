const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
      type:String,
      require: true,
      min: 3,
      max: 20,
    },
    email:{
      type:String,
      required:true,
      max:50,
      unique:true,
    },
    password:{
      type:String,
      required: true,
      min:6
    },
    token:{
      type:String,
    },
    profilePicture:{
      type:String,
      default:""
    },
    desc:{
      type:String,
      max:50
    },
    city:{
      type:String,
      max:50,
    },
    from:{
      type:String,
      max: 50,
    }, 
  },
  {timestamps:true},
);

module.exports = mongoose.model("User", UserSchema);