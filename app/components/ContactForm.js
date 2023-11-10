export function ContactForm() {
    const $form = document.createElement("form"),
        $styles = document.getElementById("dynamic-styles");

    $form.classList.add("contact-form");

    $form.innerHTML = `
        <fieldset>
                <legend>SEND US YOUR COMMENTS</legend>
                <input type="text" name="name" placeholder="Type your name" data-error="Only letters and spaces allowed" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" required>
                <input type="email" name="email" placeholder="Type your email" data-error="Invalid email" pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
                <input type="text" name="subject" placeholder="Type the subject" data-error="Subject required" required>
                <textarea name="comment" placeholder="Type your comment" data-error="You exceeded maximum characters 255" data-pattern="^.{1,255}$" required></textarea>
                <input type="hidden" name="_next" value="https://www.youtube.com/@jiren9675">

                <input type="submit" name="send" value="SEND">
                
        </fieldset>

        <div class="contact-form-loader none">
            <img class="form-loader-img" src="app/assets/img/loader.gif" alt="Loading">
        </div>

        <div class="contact-form-response none">
            <p>Data were sent</p>
        </div>
    `;

    $styles.innerHTML = `
    .contact-form{
        width: 60%;
        margin: auto;
        background-color: #000;
        padding: 20px;
    }

    .contact-form fieldset{
        width: 100%;
        padding: 20px;
        border: none;
        text-align: center;
        
    }

    .contact-form fieldset > *{
        display: block;
     
        min-width: 100%;
        max-width: 856px;
       
        margin-bottom: 1rem;
        padding: 10px;
        text-align: center;
        border-radius: 20px;
        border: none;
      
    }

    .contact-form textarea{
        min-height: 100px;
        max-height: 500px;
        resize: none;
    }

    .contact-form legend{
        color: #fff;
        font-size: 2rem;
    }

    .contact-form [type="submit"]{
        background-color: #00ff6a;
        color: #fff;
        font-weight: 900;
        font-size: 2rem;
        transition: .5s all;
    }

    .contact-form [type="submit"]:hover{
        background-color: #00b74c;
        transform: scaleY(1.1);
        cursor: pointer;
    }

    .contact-form input:not([type="submit"]), textarea{
        outline: 1px dashed #fff;
        outline-offset: -5px;
        transition: .5s all;
    }

    .contact-form :is(input:not([type="submit"]),textarea):focus{
        outline: 1px dashed #fff;
        outline-offset: 5px;
    }

    .contact-form :is(input,textarea)::placeholder{
        color: #000000;
        font-weight: 900;
        font-size: 1.2rem;
    }

    .contact-form [required]:valid{
        outline: 2px dashed var(--form-ok-color);
        outline-offset: 3px;
    }

    .contact-form [required]:invalid{
        outline: 2px dashed var(--form-error-color);
        outline-offset: 3px;
    }
    
    .contact-form .contact-form-response{
        background-color: rgb(13, 141, 13);
        color: #fff;
        width: 95%;
        border-radius: 10px;
        padding: 20px;
        margin-inline: auto;
        font-size: 2rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    .contact-form .contact-form-error{
        margin-top: -1rem;
        font-size: 1rem;
        background-color: var(--form-error-color);
        color: #fff;
        /* border-radius: 0; */
        z-index: 1;
        position: relative;
        transition: all .8s ease;
        display: none;
    }

    .contact-form-error.active{
        display: block;
        animation: show-message 1s 1 normal 0s ease-out both;
    }

    @keyframes show-message {
        0%{
            visibility: hidden;
            opacity: 0;
        }
        100%{
            visibility: visible;
            opacity: 1;
        }
    }

    .none{
        display: none;
    }

    .form-loader-img{
        width: 30%;
        display: block;
        margin-inline: auto;
    }
    `;

    setTimeout(() => 
        
    (() => {
    
        const $inputs = $form.querySelectorAll(".contact-form :is(input,textarea)[required]");
        const $response = document.querySelector(".contact-form-response");
        console.log($form);

        $inputs.forEach(input => {
            const $span = document.createElement("span");
            $span.id = input.name;
            $span.textContent = input.dataset.error;
            $span.classList.add("contact-form-error")
            input.insertAdjacentElement("afterend", $span);
        });
  

        document.addEventListener("keyup", (e) => {
            if (e.target.matches(".contact-form [required]")) {
                const $input = e.target,
                    pattern = $input.pattern || $input.dataset.pattern;

                if (pattern && $input.value !== "") 
                {
                   
                    let regex = new RegExp(pattern);
                    if(!regex.exec($input.value))
                         {
                            document.getElementById($input.name).classList.add("active");
                            console.log(document.getElementById($input.name), "active")
                         }
                         else
                         {
                        
                             document.getElementById($input.name).classList.remove("active");
                             console.log(document.getElementById($input.name), "no active")
                         }
                        
                       
                }

            }
        });


        let canSubmit = true;
        $form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (canSubmit) 
            {
                // alert("Data will be sent");
                canSubmit = false;
                const $loader = document.querySelector(".contact-form-loader");
                $loader.classList.remove("none");

                fetch("https://formsubmit.co/ajax/fpg72396@gmail.com", {
                    method: "POST",
                    body: new FormData(e.target)
                })
                .then(response => response.ok ? response.json() : Promise.reject(response))
                .then(json => {
                    console.log(json);
                    $loader.classList.add("none");
                    $response.classList.remove("none");
                    $form.reset();

                    $response.innerHTML = `<p>${json.message}</p>`;
                })
                .catch(error => {
                    console.error(error);
                    let message = error.statusText || "An error occurred";

                    $response.style.backgroundColor = "rgb(255, 0, 0)";
                    $response.innerHTML = `Error ${error.status} : ${message}`;

                })
                .finally(() => setTimeout(() => {
                    $response.classList.add("none");
                    canSubmit = true;

                }, 5000)
                );
            }

        });
    })()
    ,
    100);

    return $form;
}
