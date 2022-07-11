import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    await publicRequest.post("/auth/login", user).then((res) => {        
        dispatch(loginSuccess(res.data));        
    }).catch(() => {
        dispatch(loginFailure());
    })
}
