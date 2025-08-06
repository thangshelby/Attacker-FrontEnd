import api from "./api";

export const loan={
    create:(data)=>{
        return api.post("/loan", data,{
            withCredentials: true
        });
    },
    getLoans:()=>{
        return api.get("/loan", {
            withCredentials: true
        });
    }
}