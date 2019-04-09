const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    path: {
        type:String,
        require: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("File", File);

