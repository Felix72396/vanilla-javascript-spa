import { Router } from "./Router.js";

export function SearchForm()
{
    const $form = document.createElement("form"),
    $input = document.createElement("input");
    $input.type = "search";
    $input.name = "search";
    $input.placeholder = "Search...";
    $input.autocomplete = "off";

    $form.classList.add("search-form");
    

    $form.appendChild($input);
    
    if(location.hash.includes("#/search"))
    {
        $input.value = localStorage.getItem("search");
    }

    $input.addEventListener("change", e => {
        if(!$input.value) 
            localStorage.removeItem("search");

        location.hash = `#/search?search=`;
    });

    $form.onsubmit = (e) => {
        e.preventDefault();
        if(!$form.search.value) return false;
        localStorage.setItem("search", $form.search.value);
        location.hash = `#/search?search=${$form.search.value}`
    }

    return $form;

}
