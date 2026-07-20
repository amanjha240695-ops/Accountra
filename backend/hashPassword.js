import bcrypt from "bcrypt";

bcrypt.hash("Admin@123", 10)
  .then((hash) => {
    console.log("HASH:");
    console.log(hash);
  })
  .catch((error) => {
    console.log(error);
  });