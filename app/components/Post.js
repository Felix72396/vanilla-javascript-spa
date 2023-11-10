export function Post(props)
{
    let {title, date, content, _embedded} = props;

    let formattedDate = new Date(date).toLocaleString();
    let urlPoster = _embedded["wp:featuredmedia"] ? _embedded["wp:featuredmedia"][0].source_url : "app/assets/img/no-img.png";
    
    return `
    <section class="post-page">
        <aside>
            <h2>${title.rendered}</h2>
            
            <time datetime="${formattedDate}">${formattedDate}</time>
        </aside>
        <hr>
        <img src="${urlPoster}" alt="${title.rendered}">
        <article>${content.rendered}</article>
    </section>
    `;
}