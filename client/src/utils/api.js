import api from 'axios';
 
api.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const setHeader = (token) => {    
    if(token){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export const GetData = async(endPoint,options, token) => {
    try {
        setHeader(token);
        const response = await api.get(endPoint);
        return response
    } catch (err) {
        throw err;
    }        
}

export const PostData = async(endPoint,options, token) => {
    try {
        setHeader(token);
        const response = await api.post(endPoint, options);
        return response
    } catch (err) {
        throw err;
    }  
}

export const DeleteData = async(endPoint, token) => {
    try {
        setHeader(token);
        const response = await api.delete(endPoint);
        return response
    } catch (err) {
        throw err;
    }  
}
  