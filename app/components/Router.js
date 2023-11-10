import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";
import { ContactForm } from "./ContactForm.js";




export async function Router()
{

    let {hash} = location;
    const $main = document.getElementById("main"),
    $pageSectionTitle = document.querySelector(".page-section-title");
    
    if(!hash) hash = "#/";

    if(hash === "#/")
    {
        $pageSectionTitle.innerHTML = "<h2>Home</h2>";
        await ajax({
            url: api.POSTS_URL,
            cbSuccess: (posts) => {
                console.log(posts);
                let html = "";
    
                posts.forEach(post => html += PostCard(post));

                $main.innerHTML += html;
            }
        });
    }
    else if(hash.includes("#/search"))
    {

        $pageSectionTitle.innerHTML = "<h2>Search section</h2>";

        let query = localStorage.getItem("search");
       
        if(!query) return;
  
        await ajax({
            url: `${api.SEARCH_URL}${query}`,
            cbSuccess: (posts) => {
                console.log(posts, "search");
                let html = "";
                if(posts.length > 0)
                    posts.forEach(post => html += PostCard(post));
                else html = "<h2>No results found</h2>";

                $main.innerHTML += html;
                
            }
        });
       
    }
    else if(hash.includes("#/contact"))
    {
        $pageSectionTitle.innerHTML = "<h2>Contact section</h2>";
        $main.appendChild(ContactForm());
    }
    else
    {
        $pageSectionTitle.innerHTML = "<h2>Post</h2>";
        let id = localStorage.getItem("id");

            await ajax({
                url: `${api.POST_URL}/${id}?_embed`,
                cbSuccess: (post) => {

                    let html = Post(post);

                    $main.innerHTML = html;
                }
            });
    }

  
   
}

 