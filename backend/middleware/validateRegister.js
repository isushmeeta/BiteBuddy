export const validateRegister = (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone)
    return res.status(400).json({ msg: "All fields are required." });

  // Email validation
  const allowed = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "ymail.com",
    "icloud.com",
    "apple.com",
  ];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email))
    return res.status(400).json({ msg: "Invalid email format." });

  const domain = email.split("@")[1];
  if (!allowed.includes(domain))
    return res.status(400).json({ msg: "Email domain not allowed." });

  // Password validation
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passRegex.test(password))
    return res.status(400).json({ msg: "Weak password." });

  // Phone validation
  const bd = /^\+8801\d{9}$/;
  const any = /^\+\d{8,15}$/;

  if (!bd.test(phone) && !any.test(phone))
    return res.status(400).json({ msg: "Invalid phone number." });

  next();
};
