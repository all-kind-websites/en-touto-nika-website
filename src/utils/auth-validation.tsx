
let errors = {
  login: '',
  register: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const loginFormIsValid = (email: string, password: string, setErrors: Function) => {
  if (!email.trim().length || !password.trim().length) {
    errors = { ...errors, login: "Συμπληρώστε όλα τα πεδία!" };
    setErrors(errors);
    return false;
  } else {
    errors = { ...errors, login: "" };
    setErrors(errors);
  }
  return true;
}

export const registerFormIsValid = (name: string, email: string, password: string, confirmPassword: string, setErrors: Function) => {
  if (!name.trim().length || !email.trim().length || !password.trim().length || !confirmPassword.trim().length) {
    errors = { ...errors, register: "Συμπληρώστε όλα τα πεδία!" };
    setErrors(errors);
    return false;
  } else {
    errors = { ...errors, register: "" };
    setErrors(errors);
  }
  return true;
};

export const nameIsValid = (name: string, setErrors: Function) => {
  if (name.trim().length <= 1) {
    errors = { ...errors, name: "Τουλάχιστον 2 γράμματα!" };
    setErrors(errors);
    return false;
  } else {
    errors = { ...errors, name: "" };
    setErrors(errors);
  }
  return true;

}

export const emailIsValid = (email: string, setErrors: Function) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log('emailIsValid');

  if (!emailRegex.test(email.trim().toLowerCase())) {
    errors = { ...errors, email: "...δεν είναι έγκυρη!" };
    setErrors(errors);
    return false;
  } else {
    errors = { ...errors, email: "" };
    setErrors(errors);
  }
  return true;
}

export const passwordIsValid = (password: string, setErrors: Function) => {
  if (password.trim().length < 6 || password.trim().length > 12) {
    errors = { ...errors, password: "Απο 6 μέχρι 12 γράμματα!" };
    setErrors(errors);
    return false;
  } else {
    errors = { ...errors, password: "" };
    setErrors(errors);
  }
  return true;
};

export const passwordNoMatch = (password: string, confirmPassword: string, setErrors: Function) => {
  if (password.trim() !== confirmPassword.trim()) {
    errors = { ...errors, password: "Κωδικοί πρόσβασης δεν ταιριάζουν!" };
    setErrors(errors);
    return false;
  } else {
    errors = { ...errors, password: "" };
    setErrors(errors);
  }
  return true;
}

export const formIsValid = (setErrors: Function, login: boolean, name: string, email: string, password: string, confirmPassword: string) => {
  if (login) {
    if (!loginFormIsValid(email, password, setErrors)) {
      return false;
    }
    if (!emailIsValid(email, setErrors)) {
      return false;
    }

    if (!passwordIsValid(password, setErrors)) {
      return false;
    }
  } else {
    if (!registerFormIsValid(name, email, password, confirmPassword, setErrors)) {
      return false;
    }
    if (!nameIsValid(name, setErrors)) {
      return false;
    }

    if (!emailIsValid(email, setErrors)) {
      return false;
    }

    if (!passwordIsValid(password, setErrors)) {
      return false;
    }

    if (!passwordNoMatch(password, confirmPassword, setErrors)) {
      return false;
    }
  }
  return true;
};