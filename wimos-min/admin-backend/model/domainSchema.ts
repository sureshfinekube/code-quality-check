import mongoose from "mongoose";

var Schema = mongoose.Schema;

/* DOMAIN SCHEMA */

const domainSchema = new Schema({
    domain: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
    }
},{
    timestamps: true
});


export default domainSchema;