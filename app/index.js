import api from "./helpers/wp_api.js";
import {App} from "./App.js";

document.addEventListener("DOMContentLoaded", App);
window.addEventListener("hashchange", () => {
    App();
    api.page = 1;
});

