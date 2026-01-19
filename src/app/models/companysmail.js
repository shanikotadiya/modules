import mongoose from "mongoose";

const companyEmailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.appliedcompanyemails ||
  mongoose.model("appliedcompanyemailssenior", companyEmailSchema);
