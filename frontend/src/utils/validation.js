// utils/validation.js

export const validateEmail = (email) => {
  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "ymail.com",
    "icloud.com",
    "apple.com",
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format.";

  const domain = email.split("@")[1];
  if (!allowedDomains.includes(domain))
    return "Email must be gmail, yahoo, outlook, ymail, icloud, or apple.";

  return null;
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!passwordRegex.test(password))
    return "Password must be at least 8 characters, include uppercase, lowercase, number & special character.";

  return null;
};

export const validatePhone = (phone) => {
  const bdRegex = /^\+8801\d{9}$/;     // Strict BD format
  const anyRegex = /^\+\d{8,15}$/;     // Any valid international number

  if (!bdRegex.test(phone) && !anyRegex.test(phone))
    return "Phone must be +8801XXXXXXXXX or a valid international +country code.";

  return null;
};
