import companysmail from "../models/companysmail";
export const emailRecords = async (query, page, limit) => {
  const regexQuery = new RegExp(query, "i");
  const data = await companysmail
    .find({ email: regexQuery })
    .skip((page - 1) * limit)
    .limit(limit);
  const emails = data.map((email) => ({
    ...email._doc, // Spread existing email data
    dateDifference: Math.floor((Date.now() - new Date(email.date)) / 86400000),
  }));
  const totalemail = await companysmail.countDocuments({ email: regexQuery });
  const totalpages = Math.ceil(totalemail / limit);
  return { emails, totalemail, totalpages };
};
