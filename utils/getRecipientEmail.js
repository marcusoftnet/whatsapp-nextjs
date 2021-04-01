const getRecipientEmail = (users, loggedInUser) =>
  users.find((u) => u !== loggedInUser?.email);

export default getRecipientEmail;
