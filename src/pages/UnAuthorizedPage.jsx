import { useEffect } from "react"
import { useNavigate } from "react-router-dom";



export function UnAuthorized() {

    const navigate = useNavigate();

    useEffect(()=> {
        const id = setTimeout(()=> {
            navigate("/login");
        }, 1000);

        return ()=>{
            clearInterval(id)
        }
    },[])

    return <div>
                <h1>UnAuthorized</h1>
                <p>You do not have access to this page. Please log in.</p>
           </div>
    
}