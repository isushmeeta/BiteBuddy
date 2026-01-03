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
  // Define rules for each supported country code
  const countryRules = {
    "+880": { regex: /^1\d{9}$/, msg: "10 digits starting with 1 (e.g., 17XXXXXXXX)" },
    "+1": { regex: /^\d{10}$/, msg: "exactly 10 digits" },
    "+44": { regex: /^\d{10}$/, msg: "exactly 10 digits" },
    "+91": { regex: /^\d{10}$/, msg: "exactly 10 digits" },
    "+61": { regex: /^\d{9}$/, msg: "exactly 9 digits" },
    "+81": { regex: /^\d{10}$/, msg: "exactly 10 digits" },
    "+49": { regex: /^\d{10,11}$/, msg: "10 or 11 digits" },
  };

  // Find which prefix matches the phone number
  const prefix = Object.keys(countryRules).find(p => phone.startsWith(p));

  if (prefix) {
    const numberPart = phone.slice(prefix.length);
    const rule = countryRules[prefix];
    if (!rule.regex.test(numberPart)) {
      return `For ${prefix}, the number must be ${rule.msg}.`;
    }
  } else {
    // Generic fallback for any other country code
    const anyRegex = /^\+\d{11,15}$/;
    if (!anyRegex.test(phone)) {
      return "Phone must be a valid international number with at least 10 digits after the country code.";
    }
  }

  return null;
};


