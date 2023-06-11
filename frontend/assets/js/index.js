let cookieSubmit = document.querySelector("#cookie")
let logoutSubmit = document.querySelector("#logout")

cookieSubmit.addEventListener("click", () => {
    fetch("http://localhost:8080/api/auth/testCookie", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },

    })
        .then(res => {
            return res.json()
        })
        .then((response) => {
            let data = response;
            if (data.status === "OK") {
                console.log(data.message);
                return;
            }
            // Xóa info trong localStorage


            alert(data.message)
            return;


            console.log(data)
        });
})
logoutSubmit.addEventListener("click", () => {
    fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },

    })
        .then(res => {
            return res.json()
        })
        .then((response) => {
            let data = response;
            if (data.status === "OK") {
                localStorage.removeItem("info")
                location.href = "http://localhost:5500/src/login.html"
                console.log(data.message);

                return;
            }
            // Xóa info trong localStorage


            alert(data.message)
            return;
        });
})


//Chức năng thêm nhân viên
let add_employee_nav = document.querySelector(".add_employee")
let add_employee_content = document.querySelector(".main_content_add_employee")
let fullName = document.querySelector(".fullName")
let email = document.querySelector(".email")

let phone = document.querySelector(".phone")

let id = document.querySelector(".identification")

let role = document.querySelector(".roleName")

let bank = document.querySelector(".bank")

let birthday = document.querySelector(".birthday")

let add_btn = document.querySelector(".add")

add_employee_nav.addEventListener("click", (e) => {


    //Check
    if (!add_employee_content.classList.contains("show_block")) {
        add_employee_content.classList.add("show_block")
        //Lấy về danh sách role
        fetch("http://localhost:8080/api/manager/roles", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                return res.json()
            })
            .then((response) => {
                let data = response;

                data.forEach(element => {
                    let newOption = document.createElement("option");
                    newOption.value = element.name
                    newOption.text = element.name
                    role.appendChild(newOption);
                });
            }).catch(err => {
                alert("Có lỗi xảy ra! Không lấy được danh sách chức vụ");
            })
    }

    return;

})

//post api

add_btn.addEventListener("click", () => {
    let employee = {
        fullName: fullName.value,
        email: email.value,
        phone: phone.value,
        identification: id.value,
        roleName: role.selectedOptions[0].innerText,
        bank: bank.value,
        birthday: birthday.value,
    }
    console.log(employee);

    //PHẢI CÓ 1 DÒNG CHECK RỖNG NỮA NHE --------------
    fetch("http://localhost:8080/api/manager/employee/add", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
        .then(res => {
            return res.json()
        })
        .then((response) => {
            let data = response;

            if (data.status !== "OK") {
                alert(data.message)
                return;
            }
            //save data
            console.log(data)
        }).catch(err => {
            alert(err.message)
        })

})