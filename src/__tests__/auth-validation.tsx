import { loginFormIsValid, registerFormIsValid, nameIsValid, emailIsValid, passwordIsValid, passwordNoMatch, formIsValid } from '../utils/auth-validation';

it('Checks that login form is NOT empty', () => {
  expect(loginFormIsValid('fo@ok.com', 'asdasd', () => { })).toBeTruthy();
});
it('Checks that login form IS empty', () => {
  expect(loginFormIsValid('', '', () => { })).toBeFalsy();
});
/////
it('Checks that register form is NOT empty', () => {
  expect(registerFormIsValid('as', 'fo@ok.com', 'asdasd', 'asdasd', () => { })).toBeTruthy();
});
it('Checks that register form IS empty', () => {
  expect(registerFormIsValid('', '', '', '', () => { })).toBeFalsy();
});
/////
it('Checks that name is valid', () => {
  expect(nameIsValid('foo', () => { })).toBeTruthy();
});
it('Checks that name is NOT valid', () => {
  expect(nameIsValid('', () => { })).toBeFalsy();
});
/////
it('Checks that email is valid', () => {
  expect(emailIsValid('foo@ok.com', () => { })).toBeTruthy();
});
it('Checks that email is Not valid 1', () => {
  expect(emailIsValid('foook.com', () => { })).toBeFalsy();
});
it('Checks that email is Not valid 2', () => {
  expect(emailIsValid('foo@okcom', () => { })).toBeFalsy();
});
it('Checks that email is Not valid 3', () => {
  expect(emailIsValid('foo@ok.', () => { })).toBeFalsy();
});
it('Checks that email is Not valid 4', () => {
  expect(emailIsValid('@ok.com', () => { })).toBeFalsy();
});
/////
it('Checks that password is valid', () => {
  expect(passwordIsValid('asdasd', () => { })).toBeTruthy();
});
it('Checks that password is NOT valid', () => {
  expect(passwordIsValid('asda', () => { })).toBeFalsy();
});
it('Checks that password is NOT valid 1', () => {
  expect(passwordIsValid('asdaasdaasdaasda', () => { })).toBeFalsy();
});
/////
it('Checks that passwords match', () => {
  expect(passwordNoMatch('asdasd', 'asdasd', () => { })).toBeTruthy();
});
it('Checks that passwords do NOT match', () => {
  expect(passwordNoMatch('asdasdd', 'asdasd', () => { })).toBeFalsy();
});
///// (setErrors: Function, login: boolean, name: string, email: string, password: string, confirmPassword: string)
it('Checks that all validation tests pass', () => {
  expect(loginFormIsValid('fo@ok.com', 'asdasd', () => { })).toBeTruthy();
  expect(nameIsValid('foo', () => { })).toBeTruthy();
  expect(registerFormIsValid('as', 'fo@ok.com', 'asdasd', 'asdasd', () => { })).toBeTruthy();
  //... needless to check again all the functions!
  expect(formIsValid(() => { }, true, 'foo', 'foo@ok.com', 'asdasd', 'asdasd',)).toBeTruthy();
});

it('Checks that all validation tests do NOT pass', () => {
  // This test is truthy if you ommit the name, because
  // it is allowed to work in login (not register)
  // where the name is not needed.
  // But it's falsy if you ommit the email or the password.
  expect(formIsValid(() => { }, true, 'foo', '', 'asdasd', 'asdasd',)).toBeFalsy();
});

it('Checks that all validation tests do NOT pass 2', () => {
  // This test is truthy if you ommit the name, because
  // it is allowed to work in login (not register)
  // where the name is not needed.
  // But it's falsy if you ommit the email.
  expect(formIsValid(() => { }, true, 'foo', 'foo@ok.com', '', 'asdasd',)).toBeFalsy();
});