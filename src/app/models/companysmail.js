import mongoose from "mongoose";

const companyEmailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const appliedCompanyEmails =
  mongoose.models.appliedcompanyemailssenior || 
  mongoose.model("appliedcompanyemailssenior", companyEmailSchema);

export default appliedCompanyEmails
