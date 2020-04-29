
var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false,        
    },
    passwordResetExpires:{
        type: Date,
        select: false
    },
    isDeleted:{
        type: Boolean,
        default:false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
});

//#region Encriptar senha
userSchema.pre('save', async function(next){
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
    next();
});
//#endregion

module.exports = mongoose.model('User', userSchema);