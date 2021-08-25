
let errors = {
  login: '',
  register: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const loginFormIsValid = (email: string, password: string) => {
  if (email.trim().length && password.trim().length) return true
  else return false;
};

const registerFormIsValid = (name: string, email: string, password: string, confirmPassword: string) => {
  if (name.trim().length && email.trim().length && password.trim().length && confirmPassword.trim().length) return true
  else return false;
};

const nameIsValid = (name: string, setErrors: Function) => {
  if (name.trim().length <= 1) {
    errors = { ...errors, name: "Τουλάχιστον 2 γράμματα!" };
    setErrors(errors);
    return false;
  }
  return true;

}

const emailIsValid = (email: string, setErrors: Function) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log('emailIsValid');

  if (!emailRegex.test(email.trim().toLowerCase())) {
    errors = { ...errors, email: "Δεν είναι έγκυρη!" };
    setErrors(errors);
    return false;
  }
  return true;
}

const passwordisValid = (password: string, setErrors: Function) => {
  if (password.trim().length < 6 || password.trim().length > 12) {
    errors = { ...errors, password: "Απο 6 μέχρι 12 γράμματα!" };
    setErrors(errors);
    return false;
  }
  return true;
};

const passwordNoMatch = (password: string, confirmPassword: string, setErrors: Function) => {
  if (password.trim() !== confirmPassword.trim()) {
    errors = { ...errors, password: "Κωδικοί πρόσβασης δεν ταιριάζουν!" };
    setErrors(errors);
    return false;
  }
  return true;
}



export const formIsValid = (setErrors: Function, login: boolean, name: string, email: string, password: string, confirmPassword: string) => {

  if (login) {
    if (!loginFormIsValid(email, password)) {
      return false;
    }
  } else {
    if (!registerFormIsValid(name, email, password, confirmPassword)) {
      return false;
    }
  }

  if (!nameIsValid(name, setErrors)) {
    return false;
  }
  if (!emailIsValid(email, setErrors)) {
    return false;
  }

  if (!passwordNoMatch(password, confirmPassword, setErrors)) {
    return false;
  }
  if (!passwordisValid(password, setErrors)) {
    return false;
  }
  return true;
};