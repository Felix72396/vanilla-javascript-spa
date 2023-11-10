export async function ajax(props)
{
    try 
    {
        let {url, cbSuccess} = props;
        let response = await fetch(url);

        if(!response.ok)
            throw {status: response.status, statusText: response.statusText};

        let json = await response.json();
        
        cbSuccess(json);
    } 
    catch (error) 
    {
        let message = error.statusText || "An error has occurred";
        document.getElementById("main").innerHTML = `
            <div class="error">
             <p>Error ${error.status} : ${message}</p>
            </div>
        `;
    }

}