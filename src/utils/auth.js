export const getAuth = () => JSON.parse(localStorage.getItem('_ut_'))
export const setAuth = (data) => localStorage.setItem('_ut_', data) 