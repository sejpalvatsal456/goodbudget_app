export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string) => {
  // password should be non empty string and follows the following style -
  // 1. Atleast 8 character long        ==> .{8,}
  // 2. Atleast one uppercase letter    ==> (?=.*[A-Z])
  // 3. Atleast one numeric letter      ==> (?=.*\d)
  // 4. Atleast one special character   ==> (?=.*[\W_])
  // regex - ^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$

  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};
