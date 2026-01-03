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
  // Bangladesh specific: +880 + 1 + 9 digits (total 10 digits after +880)
  // Standard BD format: +8801712345678
  const bdRegex = /^\+8801\d{9}$/;

  // Any other country: + code (1-3 digits) + at least 10 digits
  // This ensures that "without country code there are at least 10 numbers"
  // We use a general regex that requires a minimum total length.
  // Most international numbers are 10-15 digits. 
  // + (1-3 country code) + (10-12 number) = 11 to 15 digits total.
  const anyRegex = /^\+\d{11,15}$/;

  if (phone.startsWith("+880")) {
    if (!bdRegex.test(phone)) {
      return "Bangladesh phone must be 10 digits after +880 (e.g., +88017XXXXXXXX).";
    }
  } else {
    if (!anyRegex.test(phone)) {
      return "Phone must be a valid international number with at least 10 digits after the country code.";
    }
  }

  return null;
};

