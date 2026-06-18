import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    }, 
    password :{
        type : String,
        required : true
    }, 
    avatar : {
        type : String,
        default : 'https://thumbs.dreamstime.com/b/profile-face-young-woman-isolated-white-background-128443438.jpg?w=992'
    },
    
},  
{
        timestamps : true
    },
    );
const User = mongoose.model('User', userSchema);
export default User;        