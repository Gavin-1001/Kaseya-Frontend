import store from '../redux/store'
      
export const authHeaders = () => {
    const currentUser = store.getState().user;
  
    return {
        'Content-Type': 'application/json',
        'authorization':  currentUser?.token,
    };
  };