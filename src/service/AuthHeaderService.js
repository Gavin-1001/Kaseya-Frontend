import store from './../redux/store'

export const authHeaderService = () => {
    const currentUser = store.getState().user;
  
    return {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + currentUser?.token,
    };
  };