import { IErrors, IUser } from "@/types";

function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateName(name: string) {
  const regex = /^[A-Z][a-zA-Z\s-]*$/;
  return regex.test(name);
}

function validatePhone(phone: string) {
  const regex = /^[0-9\-\(\)\s]+$/;
  return regex.test(phone);
}

function validatePassword(password: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

function confirmPassword(password: string) {
  const isConfirmPassword = [
    "123456",
    "password",
    "123456789",
    "12345678",
    "12345",
    "1234567",
    "qwerty",
  ];
  return isConfirmPassword.includes(password);
}

export const validateRegister = (userData: IUser) => {
  const errors: IErrors = {};

  if (
    userData.name.length < 2 ||
    userData.name.length > 50 ||
    !validateName(userData.name)
  ) {
    errors.name =
      "The name must be between 2 and 50 characters long and can only contain letters, hyphens, and spaces. It must start with a capital letter.";
  }

  if (
    !validatePhone(userData.phone) ||
    userData.phone.replace(/[^0-9]/g, "").length < 9
  ) {
    errors.phone =
      "The phone number must be in a valid format and contain at least 9 digits.";
  }

  if (!validateEmail(userData.email)) {
    errors.email = "The email address is not valid.";
  }

  if (
    !validatePassword(userData.password) ||
    confirmPassword(userData.password)
  ) {
    errors.password =
      "The password must be at least 8 characters long, include uppercase and lowercase letters, numbers, and symbols.";
  }

  if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export const validateNewAppointment = (formData: any) => {
  const { date, time, description } = formData;
  const errors = {};

  return errors;
};

export { validateName, validatePhone, validatePassword, confirmPassword };
