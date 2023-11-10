export function Loader()
{
    const $loader = document.createElement("img");
    $loader.src = "app/assets/img/tail-spin.svg";
    $loader.atl = "Loading...";
    $loader.classList.add("loader");

    return $loader;
}