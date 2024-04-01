import { createRoutine } from 'redux-saga-routines';

export const userLoginRoutine = createRoutine('auth/userLogin');

// export const userInfo = createRoutine('auth/getUserInfo');

// export const userList = createRoutine('auth/getUserListByOrg');

export const userLogoutRoutine = createRoutine('auth/userLogout');

export const userRegisterRoutine = createRoutine('auth/userRegister');

// -------- OTP Routine -------------
export const sendOtpEmailRoutine = createRoutine('auth/sendOtpEmail');

export const verifyOtpEmailRoutine = createRoutine('auth/verifyOtpEmail');
