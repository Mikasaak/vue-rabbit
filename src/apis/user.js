import instance from "@/utils/http.js";
export const loginAPI = ({account,password}) => {
    return instance.post('/login', {account,password});
}
