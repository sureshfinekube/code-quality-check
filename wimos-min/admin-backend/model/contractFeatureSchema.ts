import mongoose from "mongoose";

var Schema = mongoose.Schema;

/* ADMIN SCHEMA */

const contractFeatureSchema = new Schema({
    name: { type: String, required: [true, 'name is required'] },
    type: { type: String, required: false, enum: ['ERC1155', 'ERC721'] },
    description: { type: String, required: false },
    amount: { type: String, required: [true, 'amount is required']},
    status: { type: Boolean },
    isFreePeriod: { type: Boolean }
});


export default contractFeatureSchema;