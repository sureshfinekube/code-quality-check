export const isAuthenticated = (state) => {
  //console.log("state: ", state.auth?.auth?.name);
  if (state.auth.auth.name) return true;
  return false;
};
