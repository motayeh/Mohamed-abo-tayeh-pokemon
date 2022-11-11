import "../shared/card/Card.css";
import { Outlet } from "react-router-dom";
export default function Layout(){
    return(
    <>
    <header className="logo" >
        <img className="imagelogo" src={process.env.PUBLIC_URL+"/image 4.png"}></img>
      </header>
      <Outlet/>
    </>
    )
}