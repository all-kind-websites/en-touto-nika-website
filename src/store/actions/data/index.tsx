import * as mixedData from "./mixedData";
import * as alfaOneData from "./alfaOneData";

const fetchAllUsersData = mixedData.fetchAllUsersData;
const saveDataToAllUsersData = mixedData.saveDataToAllUsersData;

export { fetchAllUsersData };
export { saveDataToAllUsersData };

const saveData = alfaOneData.saveData;

export { saveData };

// We need to do the above work around untill React-Native -v 0.61
// https://github.com/facebook/react-native/issues/22592

// export * from './mixedData'
// export * from './alfaData'
// export * from './betaData'
// export * from './gammaData'
// export * from './deltaData'
// export * from './alfaOneData'
// export * from './twoData'
// export * from './threeData'
// export * from './fourData'
// export * from './fiveData'
// export * from './sixData'
// export * from './sevenData'
// export * from './eightData'
// export * from './nineData'
// export * from './tenData'
