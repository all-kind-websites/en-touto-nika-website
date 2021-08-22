const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

interface State {
  inputValues: {
    email: string,
    password: string,
    userName: string,
  },
  inputValidities: {
    email: boolean,
    password: boolean,
    userName: boolean,
  },
  formIsValid: boolean,
}

interface Action {
  type: string,
  value: string,
  isValid: boolean,
  input: string,
}

const formReducer = (state: any, action: Action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
export default formReducer