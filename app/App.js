import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { Loader } from "./components/Loader.js";
import { Router } from "./components/Router.js";
import { PageSectionTitle } from "./components/PageSectionTitle.js";
import { infiniteScroll } from "./helpers/infinite_scroll.js";


export async function App() {

    const $root = document.getElementById("root");
    $root.innerHTML = "";
    $root.appendChild(Header());
    $root.appendChild(PageSectionTitle());
    $root.appendChild(Main());
    $root.appendChild(Loader());

    await Router();  
   
    document.querySelector(".loader").style.display = "none";

    infiniteScroll();
 
}

