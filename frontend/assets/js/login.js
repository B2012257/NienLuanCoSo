
let loginBtn = document.querySelector("#loginSubmit")
let usernameInput = document.querySelector("#username")

let passwordInput = document.querySelector("#password")

loginBtn.addEventListener("click", (e) => {
    // axios.post('http://localhost:8080/api/auth/login', {
    //     userName: usernameInput.value,
    //     password: passwordInput.value
    // }, { withCredentials: true })
    //     .then(function (response) {
    //         //Thành công
    //        
    //     })
    //     .catch(function (error) {
    //         console.log(error.response.data);
    //     });

    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                userName: usernameInput.value,
                password: passwordInput.value
            }
        )
    })
        .then(res => {
            return res.json()
        })
        .then((response) => {
            let data = response;

            //save data
            localStorage.setItem("info", JSON.stringify(data))
            location.href = "http://localhost:5500/src/index.html"
            console.log(response)
        });
})
