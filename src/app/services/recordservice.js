import User from "../models/registeruser";
export const getRecords = async (query, page, limit) => {
  const regexQuery = new RegExp(query, "i");
  const users = await User.find({ username: regexQuery })
    .skip((page - 1) * (limit))
    .limit(limit);

  const totalcount = await User.countDocuments({ username: regexQuery });
  const totalPages = Math.ceil(totalcount / limit);
  return { users, totalPages, totalcount };
};

export const updateRecord = async (id, username, email) => {
  const updateRecord = await User.findByIdAndUpdate(
    id,
    { username, email },
    { new: true }
  );
  return updateRecord;
};

export const deleteRecord = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
