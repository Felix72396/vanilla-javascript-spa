import api from "./wp_api.js";
import { ajax } from "./ajax.js";
import { PostCard } from "../components/PostCard.js";


export function infiniteScroll()
{
    const $main = document.querySelector("main");
    let query = localStorage.getItem("search"),
    apiURL,
    Component;

    window.addEventListener("scroll", async e => {

        let {scrollTop, clientHeight, scrollHeight} = document.documentElement,
        {hash} = location;

        console.log(scrollTop, clientHeight, scrollHeight, hash);

        if((scrollTop + clientHeight + 100) >= scrollHeight)
        {
            api.page++;

            if(!hash || hash === "#/")
            {
                apiURL = `${api.POSTS_URL}&page=${api.page}`;
                Component = PostCard;
            }
            else if(hash.includes("#/search"))
            {
                apiURL = `${api.SEARCH_URL}${query}&page=${api.page}`;
                Component = PostCard;
            }
            else{
                return false;
            }

            document.querySelector(".loader").style.display = "block";
            await ajax({
                url: apiURL,
                cbSuccess: (posts) => {
                    console.log(posts);
                    let html = "";
        
                    posts.forEach(post => html += Component(post));
    
                    $main.insertAdjacentHTML("beforeend", html);
                }
            });
        }
    });
}