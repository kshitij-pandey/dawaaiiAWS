const url =
window.location.host === "localhost:3000"
    ? "http://localhost:8000"
    : "";
  
  export const isAuthorized=()=>{
    const token = localStorage.getItem("Auth-token");
    if (token) {
       return verifyToken(token);
    } else {
       return null;
    }
  }
 
    const verifyToken = async (token) => {
        const res = await fetch(`${url}/auth/verifyToken`, {
            method: "POST",
            headers: new Headers({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }),
        });
        if (res.status === 200) {
            const id = await res.json();
            return id;
        } else {
            return null;
        }
    };

    export const setToken=(token)=>{
        localStorage.setItem("Auth-token", token);
    }










   