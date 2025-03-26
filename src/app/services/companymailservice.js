import companysmail from "../models/companysmail";
export const emailRecords = async (query, page, limit) => {
  const regexQuery = new RegExp(query, "i");
  const data = await companysmail
    .find({ email: regexQuery })
    .skip((page - 1) * limit)
    .limit(limit);
    const emails = data.map((email) => ({
      ...email._doc,
      dateDifference: Math.floor(
        (new Date().setHours(0, 0, 0, 0) - new Date(email.date).setHours(0, 0, 0, 0)) / 86400000
      ),
    }));    
  console.log(emails);
  
  const totalemail = await companysmail.countDocuments({ email: regexQuery });
  const totalpages = Math.ceil(totalemail / limit);
  return { emails, totalemail, totalpages };
};
