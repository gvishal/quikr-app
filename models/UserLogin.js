var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;

var UserLoginSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    signupcode: String,
    current_token: String, //used to check if someone is trying to login through expired token.
    email: { type: String },
    institution: { type: String },
    score: {type: Number, default: 0},
    correctCount: {type: Number, default: 0}
});

UserLoginSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next("err:", err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// cb is callback

UserLoginSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('UserLogin', UserLoginSchema);