const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');

const Schema = mongoose.Schema;

const SALT_FACTOR = 10;

// Define user schema
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  address: { type: String },
  profile: {
    name: { type: String, default: '' },
    picture: { type: String, default: '' },
  },
  history: [{
    date: Date,
    paid: { type: Number, default: 0 },
    // item: { type: Schema.Types.ObjectId, ref: '' }
  }]
});

// Hash password before saving to database
UserSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(SALT_FACTOR)
      .then(salt => {
        bcrypt.hash(this.password, salt)
          .then(hash => {
            this.password = hash;
            next();
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  } else {
    next();
  }
});

// Compare user entered password with stored hash
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password)
    .then(isMatch => done(null, isMatch))
    .catch(err => done(err));
};

// Custom method to get gravatar
UserSchema.methods.gravatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) return `https://gravatar.com/avatar/?s${size}&d=retro`;

  const md5 = crypto.createHash('md5').update(this.email).digest('hex');

  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

module.exports = mongoose.model('User', UserSchema);
