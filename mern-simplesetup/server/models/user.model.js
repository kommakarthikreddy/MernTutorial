import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema ({
    name: {
      type: String,
      trim: true,
      required: 'Name is required'
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: 'Email is required'
    },
    hashed_password: {
      type: String,
      required: "Password is required"
    },
    salt: String,
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
  });

  UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
    console.log ("In UserSchema", this);
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  console.log ("In validate", this.isNew, this._password)
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
    makeSalt : function () {
        return Math.round (new Date().valueOf()*Math.random ()) + ''
    }, 
    encryptPassword: function (password) {
        if (!password) return '';

        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (err) {
            console.log ("Encrypt Error Occured", err)
            return ''
        }
    },
    authenticate:function(text){
        return this.encryptPassword(text) === this.hashed_password
    }
}

export default mongoose.model ('User', UserSchema)