export function PostCard(props)
{
    let {id, title, date, slug, _embedded} = props;
    title = title.rendered || title;
    date = date || _embedded.self[0].date;
    slug = slug || _embedded.self[0].slug;
    let formattedDate = new Date(date).toLocaleString();

    let urlPoster = _embedded["wp:featuredmedia"] 
    ? _embedded["wp:featuredmedia"][0].source_url 
    : _embedded.self[0].featured_media_src_url 
    ? _embedded.self[0].featured_media_src_url
    : "app/assets/img/no-img.png";


    document.body.onclick = (e) => {
        if(e.target.matches("a[data-id]"))
        {
            localStorage.setItem("id", e.target.dataset.id);
        }
    }

    return `
    <article class="post-card">
     <img class="card-img" src="${urlPoster}" alt="${title}">
     <h2>${title}</h2>
     <p>
        <time datetime="${formattedDate}">${formattedDate}</time>
        <a href="#/${slug}" data-id="${id}">See Post</a>
     </p>
    </article>
    `;

}
