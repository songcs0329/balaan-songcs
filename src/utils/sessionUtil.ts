const sessionUtil = {
  getSeesion: (name: string) => {
    return JSON.parse(sessionStorage.getItem(name) as string);
  },
  setSession: (name: string, payload: TypeSignup.SignupSession) => {
    sessionStorage.setItem(name, JSON.stringify(payload));
  },
  removeSession: (name: string) => {
    sessionStorage.removeItem(name);
  },
};

export default sessionUtil;
