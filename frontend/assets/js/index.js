let userInfo = JSON.parse(localStorage.getItem("info"));

let cookieSubmit = document.querySelector("#cookie")
let logoutSubmit = document.querySelector("#logout")
let addEmployeeBtn = document.querySelector(".main_content__body__update_employee .add_employee")
let avatar = document.querySelector(".right_item.avatar")
let avatarMenu = document.querySelector(".right_info_menu")
let overplay = document.querySelector(".right .overplay")
let shiftTypeListBody = document.querySelector(".shiftTypeListBody")
let saveChange = document.querySelector(".saveChange")
let saveChangeShiftType = document.querySelector(".saveChangeShiftType")
let creaftShiftType = document.querySelector(".create_shift_type")
let addShiftTypeTable = document.querySelector(".add__shift__list_employee__table")
//Thêm sự kiện ẩn hiên menu khi ấn vào avatar
avatar.addEventListener("click", (e) => {
    avatarMenu.classList.toggle("hide")
    console.log(overplay);
    overplay.classList.toggle("hide")
    overplay.addEventListener("click", () => {
        overplay.classList.add("hide")
        avatarMenu.classList.add("hide")
    })
})

//Thêm sự kiện hiện form tạo loại ca làm mới
creaftShiftType.addEventListener("click", (e) => {
    addShiftTypeTable.classList.remove("hide")
})
if (!userInfo) location.href = "http://localhost:5500/src/login.html";
setUpHeaderInfo()

//Đổ dữ liệu vào thông tin header
function setUpHeaderInfo() {
    let rightMenu = document.querySelector(".right_info_menu")
    let avatar = rightMenu.querySelector(".avatar_info")
    let email = rightMenu.querySelector(".email")
    let fullName = rightMenu.querySelector(".full_name")
    let roleName = rightMenu.querySelector(".role_name")

    fullName.innerHTML = userInfo.user.fullName
    email.innerHTML = userInfo.user.email
    roleName.innerHTML = userInfo.user.roleName

    // console.log(userInfo.user);
}

function setHeaderName(name) {
    let headerNameElement = document.querySelector("#header .left")
    headerNameElement.innerHTML = name;
}

//Đăng xuất
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

//Hiển thị các frame của các chức năng
//Lấy ra các element chức năng trong thanh nav bar

let nav_items = document.querySelectorAll(".side_bar__item .side_bar__item__list__item")
//Lặp qa các tên chức năng
nav_items.forEach(nav_item => {
    nav_item.addEventListener("click", (e) => {
        const itemClick = e.target; //Lấy chức năng đang được click
        //Lặp để tìm các chức năng được chọn trước đó
        nav_items.forEach(item => {
            if (item.classList.contains("active")) {
                //Nếu có item khác đang chọn thì clear nó và gán active cho chức năng đang click
                if (item !== itemClick) {
                    item.classList.remove("active")
                    itemClick.classList.add("active")


                    //Lấy ra class cần hiển thị
                    console.log(itemClick.classList[0]);
                    //Cắt lấy chuỗi trước cụm Open
                    let className = itemClick.classList[0]
                    let classNameToQuery = className.split("Open")[0]
                    console.log(classNameToQuery);
                    let guiElementToActive = document.getElementsByClassName(classNameToQuery)[0]
                    //Kiểm tra nếu giao diện đang hiển thị không phải của chức năng đang chọn thì ẩn đi rồi hiện giao diện cần lên
                    let mainContents = document.querySelectorAll(".main_content__body__item")

                    mainContents.forEach(mainContent => {

                        //Kiểm tra các class đang không ẩn
                        if (!mainContent.classList.contains("hide")) {
                            //Nếu đang hiển thị giao diện không đúng thì ẩn đi 
                            //Và hiển thị giao diện đúng
                            if (mainContent !== guiElementToActive) {
                                mainContent.classList.add("hide")
                                //Nếu có giao diện của chức năng thì cho nó hiển thị
                                if (guiElementToActive) {
                                    let fnName = guiElementToActive.querySelector(".headerName").innerText
                                    console.log(fnName);
                                    setHeaderName(fnName)
                                    guiElementToActive.classList.remove("hide")

                                    //Kiểm tra để gọi hàm tương ứng
                                    switch (classNameToQuery) {
                                        case "overview":
                                            setUpOverView()

                                            break;
                                        case "list_employee":
                                            setUpListEmployee()

                                            break;
                                        case "update_employee":
                                            setUpEditEmployee()

                                            break;
                                        case "shift_list":
                                            setUpShiftTypeManagement()

                                            break;

                                        case "schedule":
                                            setUpShedule()

                                            break;
                                        case "view_schedule":
                                            setUpViewShedule()

                                            break;
                                        case "salary_report":
                                            setUpSalaryReport()

                                            break;
                                        default:
                                            setUpOverView()
                                            break;
                                    }
                                    // setUpViewShedule()
                                    return;
                                }
                                //Không có thì thông báo và hiển thị giao diện overview(tạm)
                                else {
                                    alert("Chưa có giao diện chức năng này");
                                    //Tạm thời cho mặc định trang overview
                                    // document.querySelector(".overview").classList.remove("hide")
                                    return
                                }
                            }

                        }
                    })
                }

            }
        })

    })
})
setUpOverView()

//test
function convertToInput(thisItem) {
    let input = document.createElement("input");
    let currentValue = thisItem.innerText;
    input.type = "text";
    input.value = currentValue
    thisItem.innerText = ""
    input.style.width = "100%"
    input.style.margin = "2px 0"

    console.log([thisItem]);
    thisItem.appendChild(input);
    input.focus();
    input.onblur = function () {
        thisItem.innerText = input.value;
        return;
    };
    input.oninput = function () {
        //hiển thị nút lưu thay đổi
        saveChange.classList.remove("hide")
    };

}
// let tdEdit = document.querySelectorAll(".table td")
// tdEdit.forEach(item => {
//     item.addEventListener("click", (e) => {
//         convertToInput(e.target)
//     })
// })




//Sự kiện thêm nhân viên
addEmployeeBtn.addEventListener("click", () => {
    //hiển thị form thêm nhân viên
    const addEmployeeForm = document.querySelector(".main_content_add_employee")
    addEmployeeForm.classList.remove("hide")
    let closeForm = document.querySelector(".add_employee_popup_wrapper span")
    //Thêm sự kiện tắt form
    closeForm.addEventListener("click", () => {
        addEmployeeForm.classList.add("hide")
    })
})
// Set up các chức năng ------------------------------------

//Chức năng tổng quan
async function setUpOverView() {
    console.log("Gọi chức năng tổng quan")
    localStorage.setItem("previousFunction", "overview")
    //Goi api tìm tổng nhân sự
    let api = "http://localhost:8080/api/manager/employee/total"
    try {
        let totalNumberRes = await getTotalEmployee(api)
        if (totalNumberRes.status === "OK") {
            let total = totalNumberRes.data
            showInfo()
            //render
            document.querySelector(".overview__employee .employee__total .totalEm span").innerText = total
        } else {
            alert("Không lấy được tổng nhân sự")
        }
    } catch (error) {
        console.log(error);
    }

    //Gọi api tìm nhân sự đang làm việc hiện tại

}
async function getTotalEmployee(apiUrl) {
    let data
    data = await fetch(apiUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(response => {
            if (response) {
                return response;

            }
        })
    return (data);
}


async function getEmployeeDetail(apiUrl) {

    let data
    data = await fetch(apiUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(response => {
            if (response) {
                return response;

            }
        })
    return data;
}

async function showDetailEmployee(thisElement) {
    let detailElement = document.querySelector(".main_content__body__list_employee .details")
    let idToGetDetail = thisElement.querySelector(".list_employee__table__uid").innerText
    console.log(idToGetDetail);

    let url = `http://localhost:8080/api/manager/employee/detail?uid=${idToGetDetail}`
    //call api
    try {
        let resData = await getEmployeeDetail(url)
        if (resData.status === "OK") {
            console.log(resData.data);
            let data = resData.data
            //Đổ data
            let details__description_wrapper = document.querySelector(".details__description_wrapper")
            let uid = details__description_wrapper.querySelector(".uid")
            let full_name = details__description_wrapper.querySelector("#fullName")
            let gender = details__description_wrapper.querySelector("#gender")

            let birthday = details__description_wrapper.querySelector("#birthday")

            let role_name = details__description_wrapper.querySelector("#role")

            let phone = details__description_wrapper.querySelector("#phone")

            let email = details__description_wrapper.querySelector("#email")

            let identification = details__description_wrapper.querySelector("#identification")

            let startWork = details__description_wrapper.querySelector("#startWork")

            let username = details__description_wrapper.querySelector("#username")
            let password = details__description_wrapper.querySelector("#password")

            let bank = details__description_wrapper.querySelector("#bank")

            uid.innerHTML = data.uid
            full_name.value = data.fullName
            gender.value = data.gender
            birthday.value = data.birthday
            role_name.value = data.roleName
            phone.value = data.phone
            email.value = data.email
            identification.value = data.identification
            startWork.value = data.startWorkFromDay ? data.startWorkFromDay : ""
            username.value = data.userName
            bank.value = data.bank
            password.value = (data.userName === "root") ? "" : "nv123123"
            detailElement.classList.remove("hide")

        } else {
            alert(resData.message)
        }
    } catch (error) {
        alert(error);
    }



    //Thêm sự kiện nhấn nút tắt details
    let closeFormBtn = document.querySelector(".detail_close")
    closeFormBtn.addEventListener("click", handleCloseForm)

}
function handleCloseForm(e) {
    let detailElement = document.querySelector(".main_content__body__list_employee .details")
    detailElement.classList.add("hide")


    e.target.removeEventListener("click", handleCloseForm)
}

//Danh sách nhân viên
function setUpListEmployee() {
    let apiUrl = "http://localhost:8080/api/manager/employees";
    localStorage.setItem("previousFunction", "list_employee")
    console.log("Gọi chức năng danh sách nhân viên")
    let tbodyListEmployeeTable = document.querySelector(".list_employee__table .list_employee__table__body")
    let dataToShow = [];
    let erData
    //Gọi api và đổ dữ liệu
    fetch(apiUrl, {
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
            console.log(data);
            erData = data
            //save data
            dataToShow = [...data]
            tbodyListEmployeeTable.innerHTML = ""
            dataToShow.forEach(item => {
                let trHtmlTemplate = `<tr title="Xem thông tin chi tiết" onclick="showDetailEmployee(this)">
                                <th class="list_employee__table__uid" scope="row">${item.uid}</th>
                                <th class="list_employee__table__fullname">${item.fullName}</th>
                                <th class="list_employee__table__role">${item.roleName}</th>
                                <th class="list_employee__table__birthday">${item.birthday}</th>

                                <th class="list_employee__table__gender">${item.gender || "Nam"}</th>
                                <th class="list_employee__table__phone">${item.phone}</th>
                                
                                <th class="list_employee__table__startWorkFromDay">${item.startWorkFromDay || ""}</th>
                                <th class="list_employee__table__status">${item.status || "Không có ca"}</th>
                            </tr>`
                tbodyListEmployeeTable.innerHTML += trHtmlTemplate
            })
        })
        .catch(err => {
            if (err) alert(erData.message)
        })


    //set up chức năng tìm kiếm
    let searchInput = document.querySelector(".main_content__body__list_employee .employee__search")
    searchInput.addEventListener("input", handleSearchEmployeeByName)
}
function handleSearchEmployeeByName(e) {
    let searchInput = document.querySelector(".main_content__body__list_employee .employee__search")

    let apiSearchUrl = `http://localhost:8080/api/manager/employees/search?name=${searchInput.value}`
    if (searchInput.value !== "") {
        //delay 1s
        setTimeout(() => {
            //Call api
            fetch(apiSearchUrl, {
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
                    let list_employee__table_tbody = document.querySelector(".list_employee__table tbody")
                    if (data.length > 0) {
                        //render ra man hinh
                        list_employee__table_tbody.innerHTML = ""
                        data.forEach(item => {
                            list_employee__table_tbody.innerHTML +=
                                `<tr title="Xem thông tin chi tiết" onclick="showDetailEmployee(this)">
                                <th class="list_employee__table__uid" scope="row">${item.uid}</th>
                                <th class="list_employee__table__fullname">${item.fullName}</th>
                                <th class="list_employee__table__role">${item.roleName}</th>
                                <th class="list_employee__table__birthday">${item.birthday}</th>

                                <th class="list_employee__table__gender">${item.gender}</th>
                                <th class="list_employee__table__phone">${item.phone}</th>

                                <th class="list_employee__table__startWorkFromDay">${item.uid}</th>
                                <th class="list_employee__table__status">none</th>
                            </tr>
                            `
                        })
                    } else {

                    }

                    // updateEmployee.querySelector(".saveChange").classList.remove("hide")
                    // return;
                })


        }, 500)


        // e.target.removeEventListener("input", handleSearchEmployeeByName)
    }


}

//Cập nhật và chỉnh sửa nhân viên
let formAddEmployee = document.querySelector(".add_employee_popup_wrapper")

let roleName = formAddEmployee.querySelector(".roleName")

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
        console.log(data);
        data.forEach(element => {
            let newOption = document.createElement("option");
            newOption.value = element.name
            newOption.text = element.name
            roleName.appendChild(newOption);
        });
    }).catch(err => {
        console.log(err);
        alert("Có lỗi xảy ra! Không lấy được danh sách chức vụ");
    })
function setUpEditEmployee() {
    console.log("Gọi chức năng cập nhật nv")
    localStorage.setItem("previousFunction", "update_employee")

    //Thêm nhân viên
    let updateEmployee = document.querySelector(".main_content__body__update_employee")
    let formAddEmployee = document.querySelector(".add_employee_popup_wrapper")
    let submitAddEmployee = formAddEmployee.querySelector(".add") // Nút xác nhận thêm nhân viên

    let employeeJustAdd = document.querySelector(".edit__list_employee__table")
    let searchEmployeeTable = document.querySelector(".search__list_employee__table")
    let tbodySearchEmployeeTable = searchEmployeeTable.querySelector("tbody")
    //Gọi api lấy các chức vụ
    //Lấy về danh sách role


    //Set up chức năng tìm kiếm nhân viên
    //Lấy giá trị của ô input search
    let inputSearch = updateEmployee.querySelector(".employee__search")

    inputSearch.addEventListener("input", () => {
        let apiSearchUrl = `http://localhost:8080/api/manager/employees/search?name=${inputSearch.value}`
        if (inputSearch.value !== "") {
            //delay 1s
            setTimeout(() => {
                //Call api
                fetch(apiSearchUrl, {
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
                        //render ra man hinh
                        tbodySearchEmployeeTable.innerHTML = ""
                        data.forEach(item => {
                            tbodySearchEmployeeTable.innerHTML +=
                                ` <tr>
                                <th class="edit__list_employee__uid" scope="row">${item.uid}</th>
                                <td onclick="convertToInput(this)" class="edit__list_employee__fullname">${item.fullName}</td>
                                <td class="edit__list_employee__role">${item.roleName}</td>
                                <td onclick="convertToInput(this)" class="edit__list_employee__gender">${item.gender}</td>
                                <td onclick="convertToInput(this)" class="edit__list_employee__phone">${item.phone}</td>
                                <th class="edit__list_employee__username">${item.userName}</th>
                                <td class="edit__list_employee__password"><input type="password" name="" value="${item.password}"
                                        id=""></td>
                                <th onclick="convertToInput(this)" class="edit__list_employee__startWorkFromDay"> ${item.startWorkFromDay}</th>

                            </tr>
                        `
                        })
                        updateEmployee.querySelector(".saveChange").classList.remove("hide")
                        return;
                    })


            }, 500)
        } else {
            tbodySearchEmployeeTable.innerHTML = ""
            updateEmployee.querySelector(".saveChange").classList.add("hide")

        }

    })


    //Khi nhấn xác nhận thêm nhân viên
    submitAddEmployee.addEventListener("click", addEmployeeHandler)
}
//Xử lí xự kiện thêm nhân viên
function addEmployeeHandler(e) {
    let formAddEmployee = document.querySelector(".add_employee_popup_wrapper")
    let fullName = formAddEmployee.querySelector(".fullName")
    let gender = formAddEmployee.querySelector(".gender")
    let email = formAddEmployee.querySelector(".email")
    let phone = formAddEmployee.querySelector(".phone")
    let identification = formAddEmployee.querySelector(".identification")
    let roleName = formAddEmployee.querySelector(".roleName")
    let bank = formAddEmployee.querySelector(".bank")
    let birthday = formAddEmployee.querySelector(".birthday")
    let workStartDay = formAddEmployee.querySelector(".workStartDay")
    let addEmployeeUrl = "http://localhost:8080/api/manager/employee/add"
    let employeeJustAdd = document.querySelector(".edit__list_employee__table")
    let tBodyEmployeeJustAdd = employeeJustAdd.querySelector("tbody")

    let formData = {
        fullName: fullName.value,
        email: email.value,
        phone: phone.value,
        identification: identification.value,
        roleName: roleName.value,
        bank: bank.value,
        birthday: birthday.value,
        avatarUrl: "https://www.svgrepo.com/download/5125/avatar.svg",
        gender: gender.value,
        startWorkFromDay: workStartDay.value
    }
    console.log(formData);

    fetch(addEmployeeUrl, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(res => {
            return res.json()
        })
        .then((response) => {
            let data = response;
            console.log(data);
            if (data.status === "OK") {
                //Thêm 1 trường vào bảng nhân viên mới thêm
                let trTemplate = `<tr>
                            <th class="just__list_employee__uid" scope="row">${data.data.uid}</th>
                            <td class="just__list_employee__fullname">${data.data.fullName}</td>
                            <td class="just__list_employee__role">${data.data.roleName} </td>
                            <td class="just__list_employee__gender">${data.data.gender}</td>
                            <td class="just__list_employee__phone">${data.data.phone}</td>
                            <th class="just__list_employee__username">${data.data.userName}</th>
                            <td class="just__list_employee__password"><input type="text" name="" value="${data.data.password}"
                                    id=""></td>
                            <th class="just__list_employee__startWorkFromDay">${data.data.startWorkFromDay} </th>
                        </tr>`
                tBodyEmployeeJustAdd.innerHTML += trTemplate
                alert("Thêm thành công")
                return;
            } return;
            //save data

        })
        .catch(err => {
            if (err) console.log(err);
        })
}


function deleteShiftTypeEvent(thisItem) {
    let id = thisItem.parentElement.parentElement.querySelector(".shift_type__id").innerHTML
    let trDelete = thisItem.parentElement.parentElement;
    let apiUrl = `http://localhost:8080/api/manager/shiftType/delete?id=${id}`
    console.log(id);
    fetch(apiUrl, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },

    })
        .then(res => {
            return res.json()
        })
        .then(res => {
            let data = res;
            if (data.status === "OK") {
                alert(data.message)
                trDelete.remove();
            }
            else
                alert("Xóa không thành công")
        })
        .catch(err => {
            console.log(alert("Xoa không thành công"));
        })

}
//Chức năng quản lý loại ca làm
function setUpShiftTypeManagement() {
    console.log("Gọi chức năng quản lý loại ca làm")
    localStorage.setItem("previousFunction", "shift_list")

    let shiftListTypeTable = document.querySelector(".shift__list_employee__table")
    let tbodyShiftListTypeTable = shiftListTypeTable.querySelector("tbody")
    let apiUrl = "http://localhost:8080/api/manager/shiftTypes"
    //Lấy các ca đang có
    fetch(apiUrl, {
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
            //save data
            tbodyShiftListTypeTable.innerHTML = ""
            if (data) {
                console.log(data);
                data.forEach(item => {
                    //render và tính toán số giờ

                    let timeline = item.timeline
                    let timelineStart = timeline.split("-")[0].trim()
                    let timelineEnd = timeline.split("-")[1].trim()
                    let timeNumber = timelineEnd - timelineStart
                    console.log(timeNumber);
                    tbodyShiftListTypeTable.innerHTML +=
                        `
                            <tr class="shiftTypeListBody">
                                <th class="shift_type__id" scope="row">${item.id}</th>
                                <td class="shift_type__name">${item.name}</td>
                                <td class="shift_type__timeline">${timeline}</td>
                                <th class="shift_type__time">${timeNumber}</th>
                                <th><button onclick="deleteShiftTypeEvent(this)" class="shift_type__delete">Xóa</button></th>
                            </tr>`

                })

            }

        })
        .catch(err => {
            if (err) console.log("Có lỗi xảy ra")
        })



}
let shiftListTypeTable = document.querySelector(".shift__list_employee__table")
let tbodyShiftListTypeTable = shiftListTypeTable.querySelector("tbody")
//Chức năng tạo ca làm
let shiftTypeCreateSave = document.querySelector(".shift_type__create__save")
//Lấy các trường dữ liệu trong dòng
let name = shiftTypeCreateSave.parentElement.parentElement.querySelector(".shift_type__create__name")
let timeline = shiftTypeCreateSave.parentElement.parentElement.querySelector(".shift_type__create__timeline")
shiftTypeCreateSave.addEventListener("click", () => {
    let timelineStart = timeline.innerHTML.split("-")[0].trim()
    let timelineEnd = timeline.innerHTML.split("-")[1].trim()
    let timeNumber = timelineEnd - timelineStart
    console.log(name.innerHTML);
    if (name.innerHTML !== "" && timeline.innerHTML !== "") {
        fetch("http://localhost:8080/api/manager/employee/schedule/createShift", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.innerHTML,
                timeline: timeline.innerHTML
            })
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                let data = res;
                tbodyShiftListTypeTable.innerHTML +=
                    `
                            <tr class="shiftTypeListBody">
                                <th class="shift_type__id" scope="row">${data.id}</th>
                                <td class="shift_type__name">${data.name}</td>
                                <td class="shift_type__timeline">${data.timeline}</td>
                                <th class="shift_type__time">${timeNumber}</th>
                                <th><button onclick="deleteShiftTypeEvent(this)" class="shift_type__delete">Xóa</button></th>
                            </tr>`
            })
            .catch(err => {
                console.log(alert("Tạo ca không thành công"));
            })
    }
})



//Chức năng báo cáo lương
function setUpSalaryReport() {
    console.log("Gọi chức năng báo cáo lương")
    localStorage.setItem("previousFunction", "salary_report")

}


//Tạo 1 ca cho ngày này
function createShiftOfDay(shiftTypeId, task, date) {
    return new Promise((resolve, reject) => {
        let apiUrl = "http://localhost:8080/api/manager/shift/create";
        console.log("Gọi chức năng tạo ca trong ngày")

        //Gọi api và đổ dữ liệu
        fetch(apiUrl, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shiftList: {
                    id: shiftTypeId
                },
                task: task,
                date: date,
                schedule_by: {
                    uid: userInfo.user.uid
                },
                isDeleted: false
            })
        })

            .then(res => {
                return res.json()
            })
            .then((response) => {

                resolve(response)
                //save data

            })
            .catch(err => {
                // if (err) alert("Có lỗi xảy ra")
                reject(err)
            })
    })
}




function getAllEmployeeAndContinue() {
    let data = []
    let apiUrl = "http://localhost:8080/api/manager/employees";
    //Gọi api và đổ dữ liệu
    fetch(apiUrl, {
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
            data = response;
            showToAvailableEmployeeTable(data)
        })
        .catch(err => {
            if (err) alert("Có lỗi xảy ra")
        })
}

function showToAvailableEmployeeTable(data) {
    let list_employee__table_available = document.querySelector(".list_employee__table_available")
    let tbodyList_employee__table_available = list_employee__table_available.querySelector("tbody")
    tbodyList_employee__table_available.innerHTML = ""
    data.forEach(item => {
        tbodyList_employee__table_available.innerHTML += `      
                                    <tr>
                                        <th class="employee_availlable__uid" scope="row">${item.uid}</th>
                                        <th class="employee_availlable__fullName">${item.fullName}</th>
                                        <th class="employee_availlable__roleName">${item.roleName}</th>
                                        <th class="employee_availlable__gender">${item.gender}</th>
                                        <th class="employee_availlable__phone">${item.phone}</th>
                                        <th class="employee_availlable__startWorkFromDay">${item.startWorkFromDay}</th>
                                        <th onclick="copyElementPutToSchuduleTable(this)"><button>Thêm vào ca</button></th>
                                    </tr>`
    })
}

//Xóa cha của nó, thường là thẻ tr (1 hàng)
function removeParentElement(thisElement) {
    //Xóa khỏi bảng xếp lịch
    thisElement.parentElement.parentElement.remove()
    //Hiển thị lại nút thêm vào ca
    let uid = thisElement.parentElement.parentElement.querySelector(".schedule_list_employee__user_uid").innerHTML
    console.log(uid);
    let list_employee__table_available = document.querySelector(".list_employee__table_available")
    let trToShowAddScheduleButton = list_employee__table_available.querySelectorAll(".employee_availlable__uid")
    console.log(trToShowAddScheduleButton);
    trToShowAddScheduleButton.forEach(element => {
        if (element.innerHTML === uid) {

            element.parentElement.querySelector(".employee_availlable__startWorkFromDay").removeAttribute("colspan")
            let thTag = document.createElement("th")
            let buttonTag = document.createElement("button")
            buttonTag.innerHTML = "Thêm vào ca"
            thTag.setAttribute("onclick", "copyElementPutToSchuduleTable(this)")
            thTag.appendChild(buttonTag)
            // `<th onclick="copyElementPutToSchuduleTable(this)"><button>Thêm vào ca</button></th>`
            element.parentElement.appendChild(thTag)
        }

    })
}

//Tính toán tổng giờ làm khi thay đổi giờ bắt đầu, giờ kết thúc và tăng ca
function handleChangeUpdateTotalTime(e) {
    let tr = e.target.parentElement.parentElement
    console.log(tr);
    let startInput = tr.querySelector(".timelineStart")
    let endInput = tr.querySelector(".timelineEnd")
    let overTime = tr.querySelector(".overTime")
    let total = tr.querySelector(".timeTotal")

    //Giá trị thay đổi
    let newStartValue = startInput.value
    let newEndValue = endInput.value
    let newOverTimeValue = overTime.value

    let totalValue = (Number(newEndValue) - Number(newStartValue)) + Number(newOverTimeValue)
    if (typeof (totalValue) === "number" && totalValue >= 0) {

        console.log(totalValue);
        total.innerText = totalValue
    } else {
        total.innerText = 0
    }
}

function changeTotalTimeOnInput() {
    let schedule_list_employee__table = document.querySelector(".schedule_list_employee__table")
    let startInput = schedule_list_employee__table.querySelectorAll(".timelineStart")
    let endInput = schedule_list_employee__table.querySelectorAll(".timelineEnd")
    let overTime = schedule_list_employee__table.querySelectorAll(".overTime")

    startInput.forEach(el => {
        el.addEventListener("input", handleChangeUpdateTotalTime)
    })

    overTime.forEach(el => {
        el.addEventListener("input", handleChangeUpdateTotalTime)
    })

    endInput.forEach(el => {
        el.addEventListener("input", handleChangeUpdateTotalTime)
    })

}
function copyElementPutToSchuduleTable(thisElement) {
    //Hàng cần copy vào bảng phân công
    let elementToPut = thisElement.parentElement //<tr> </tr> tag
    let uid = elementToPut.querySelector(".employee_availlable__uid").innerHTML
    let fullName = elementToPut.querySelector(".employee_availlable__fullName").innerHTML
    let roleName = elementToPut.querySelector(".employee_availlable__roleName").innerHTML
    let gender = elementToPut.querySelector(".employee_availlable__gender").innerHTML
    let shiftTypeActive = document.querySelector(".schedule__shift_type.active")
    let shiftTypeIdActive = shiftTypeActive.querySelector(".shift_type_id ").innerHTML
    //Lấy ra timeline
    let timelineArr = shiftTypeActive.innerText.split(" ")
    let timeline = timelineArr[timelineArr.length - 1]
    let timelineStart = timeline.split("-")[0].trim()
    let timelineEnd = timeline.split("-")[1].trim()
    let timeNumber = timelineEnd - timelineStart
    // console.log(uid, fullName, roleName, gender);
    //Lấy ra các thông tin cần copy
    try {
        let tbodySchedule_list_employee__table = document.querySelector(".schedule_list_employee__table tbody")
        console.log(tbodySchedule_list_employee__table);
        tbodySchedule_list_employee__table.innerHTML +=
            `<tr>
                <th class="schedule_list_employee__shift_id" scope="row">#</th>
                <th class="schedule_list_employee__user_uid">${uid}</th>
                <th class="schedule_list_employee__fullname">${fullName}</th>
                <th class="schedule_list_employee__gender">${gender}</th>
                <th class="schedule_list_employee__role">${roleName}</th>
                <td class="schedule_list_employee__start text_center">
                    <input class="timelineStart" type="number" min="0" max="22"/ value="${timelineStart}"></td>
                <td class="schedule_list_employee__end text_center">
                    <input class="timelineEnd" type="number" min="0" max="22"/ value="${timelineEnd}"></td>
                </td>
                <td class="schedule_list_employee__overtime text_center">
                    <input class="overTime" type="number" min="0" max="22"/ value="0"></td>
                </td>
                <th class="schedule_list_employee__totaltime timeTotal">${timeNumber}</th>
                <td class="schedule_list_employee__note">
                <textarea style="width: 100%;" rows="3"></textarea>
                </td>
                <th class="schedule_list_employee__action">
                    <button onClick="removeParentElement(this)">Xóa</button>
                </th>
            </tr>`
        changeTotalTimeOnInput()
    } catch (error) {
        console.log(error);
    }

    thisElement.remove()
    elementToPut.querySelector(".employee_availlable__startWorkFromDay").setAttribute("colspan", "2");

    //Cho cốt trước nó colspan = 2 để đẹp
    // thisElement.previousElementSibling.setAttribute("colspan", "2");
}
//Thêm hiệu ứng chuyển tab && Khi chuyển thì gọi api kiểm tra ngày đó đã sắp lịch làm chưa. Nếu chưa có thì hiển thị 2 bảng ra để sắp lịch.
//Sắp lịch xong bấm lưu thì lần lượt gọi api tạo ca làm cho ngày hôm đó và thêm các thông tin nhân viên vào
var task

//Khi bấm 1 tab ca làm trong sắp lịch thì sẽ gọi hàm này
//Kiểm tra có ca chưa, nếu có thì hiện bảng phân công, nếu chưa thì hiện bảng tạo ca
async function fetchApiAndCheck(thisElement) {
    let scheduleShiftType = document.querySelectorAll(".schedule__shift_type")
    let availableEmployeeTable = document.querySelector(".availablleToSchedule")
    let scheduleEmployeeTable = document.querySelector(".schedule_employee")
    let creaftShiftForm = document.querySelector(".create_shift")
    let mainContentSchedule = document.querySelector(".main_content__body__schedule")
    let createShift = mainContentSchedule.querySelector(".create_shift")
    let createShiftBtn = createShift.querySelector(".create_shift button")
    let taskEl = createShift.querySelector(".shift_task")
    let dayNow = document.querySelector(".schedule .schedule_date input").value
    let schedule__shift_type_table = document.querySelector(".schedule__shift_type_table")
    availableEmployeeTable.classList.add("hide")
    createShift.classList.add("hide")
    scheduleEmployeeTable.classList.add("hide")

    // let tbodySchedule_list_employee__table = document.querySelector(".schedule_list_employee__table tbody")
    // tbodySchedule_list_employee__table.innerHTML = ""
    //Xoa het cac type dang active
    scheduleShiftType.forEach(type => {
        if (type.classList.contains("active"))
            type.classList.remove("active")
    })
    thisElement.classList.add("active")


    let thisId = thisElement.querySelector("span").innerText
    //Kiểm tra có ca chưa
    let dataShift = await fetch(`http://localhost:8080/api/manager/shiftsSchedules?date=${dayNow}&id=${thisId}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(response => {
            if (response) {
                return response
            }

        })
    let tbody = scheduleEmployeeTable.querySelector("tbody")
    //Co thong tin ca lam thi hien thi
    if (dataShift.length > 0) {
        //Sau này sửa lại lấy các nhân viên khả dụng
        getAllEmployeeAndContinue()
        // schedule__shift_type_table.classList.remove("hide")
        console.log(dataShift);
        availableEmployeeTable.classList.remove("hide")
        scheduleEmployeeTable.classList.remove("hide")
        //ĐỔ data vào bảng phân công
        tbody.innerHTML = ""
        dataShift.forEach(item => {
            console.log(item);
            tbody.innerHTML += `
                                    <tr>
                                        <th class="schedule_list_employee__shift_id" scope="row">${item.shift.id}</th>
                                        <th class="schedule_list_employee__user_uid">${item.user_uid.uid}</th>
                                        <th class="schedule_list_employee__fullname">${item.user_uid.fullName}</th>
                                        <th class="schedule_list_employee__role">${item.user_uid.roleName}</th>

                                        <th class="schedule_list_employee__gender">${item.user_uid.gender}</th>
                                        <th class="schedule_list_employee__start text_center">${item.start}</th>
                                        <th class="schedule_list_employee__end text_center">${item.end}</th>
                                        <td class="schedule_list_employee__overtime text_center">${item.overtime}</td>
                                        <th class="schedule_list_employee__totaltime">${item.totalTime}</th>
                                        <td class="schedule_list_employee__note">
                                            <textarea style="width: 100%;" rows="3">${item.note}</textarea>
                                        </td>
                                        <th class="schedule_list_employee__action">
                                            <button>Xóa</button>
                                        </th>
                                    </tr>
        `
        })


    }

    //Khong co ca lam hien thi hop thoai tao ca
    else {
        console.log(dataShift);
        console.log("Khong co ca");
        createShift.classList.remove("hide")
        tbody.innerHTML = ""
    }







    //Bắt sự kiện bấm nút tạo ca
    createShiftBtn.addEventListener("click", async () => {
        //Lấy nội dung nhiệm vụ
        task = taskEl.value;
        let shiftList = document.querySelector(".schedule__shift_type.active")
        // let shiftListId = shiftList.querySelector(".shift_type_id ").innerHTML
        // createShiftOfDay(shiftListId, task, dayNow)

        if (true) {
            //Hiển thị nhân viên có thể làm trong ca đó
            //Tạm thời đổ tất cả nhân viên vào
            availableEmployeeTable.classList.remove("hide")
            getAllEmployeeAndContinue()






            scheduleEmployeeTable.classList.remove("hide")
            creaftShiftForm.classList.add("hide")
        }
    })


    // 
}

//Chức năng lập lịch
function setUpShedule() {
    localStorage.setItem("previousFunction", "schedule")

    let apiUrl = "http://localhost:8080/api/manager/shiftTypes"
    let scheduleEmployeeTable = document.querySelector(".schedule_employee")

    console.log("Gọi chức năng lập lịch")

    let chooseDate = document.querySelector(".schedule_date input")

    let dateNow = new Date()
    let year = dateNow.getFullYear();
    let month = String(dateNow.getMonth() + 1).padStart(2, '0');
    let day = String(dateNow.getDate() + 1).padStart(2, '0');


    let formattedDate = year + "-" + month + "-" + day;
    chooseDate.value = formattedDate

    // let scheduleShiftType = document.querySelectorAll(".schedule__shift_type")
    // let creaftShiftForm = document.querySelector(".create_shift")
    // let createShiftBtn = document.querySelector(".create_shift button")
    // let availableEmployeeTable = document.querySelector(".availablleToSchedule")
    // let scheduleEmployeeTable = document.querySelector(".schedule_employee")



    //Gọi api và hiển thị các loại ca
    //Lấy các ca đang có
    fetch(apiUrl, {
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
            let shiftTypeList = document.querySelector(".schedule__shift_type_list")
            //Nhận được các ca + timeline
            let data = response;
            //save data

            if (data) {
                shiftTypeList.innerHTML = ""
                console.log(data);
                data.forEach(item => {
                    shiftTypeList.innerHTML += `
                            <p onclick="fetchApiAndCheck(this)" class="schedule__shift_type">${item.name + " " + item.timeline}
                                <span class="shift_type_id hide">${item.id}</span>
                            </p>`
                })
            }

        })
        .catch(err => {
            if (err) console.log("Có lỗi xảy ra")
        })
}
//Bắt sự kiện khi lưu bảng phân công
let scheduleEmployeeTable = document.querySelector(".schedule_employee")

let saveScheduleBtn = scheduleEmployeeTable.querySelector("button")
let ScheduleTable = scheduleEmployeeTable.querySelector("table")
let ScheduleTbody = ScheduleTable.querySelector("tbody")

console.log(saveScheduleBtn);
//Kiểm tra bảng phân công. nếu hợp lệ thì lưu
saveScheduleBtn.addEventListener("click", () => {
    let listScheduleEmployee = []
    let shiftList = document.querySelector(".schedule__shift_type.active")
    let shiftTypeId = shiftList.querySelector(".shift_type_id ").innerHTML
    let dayNow = document.querySelector(".schedule .schedule_date input").value

    let tr = ScheduleTbody.querySelectorAll("tr")


    tr.forEach(eachItem => {
        console.log(eachItem);
        if (eachItem) {
            let shift_type_id = eachItem.querySelector(".schedule_list_employee__shift_id").innerText
            let employee_id = eachItem.querySelector(".schedule_list_employee__user_uid").innerText
            let totaltime = eachItem.querySelector(".schedule_list_employee__totaltime").innerText
            let start = eachItem.querySelector(".schedule_list_employee__start .timelineStart").value
            let end = eachItem.querySelector(".schedule_list_employee__end .timelineEnd").value
            let overtime = eachItem.querySelector(".schedule_list_employee__overtime .overTime").value
            let note = eachItem.querySelector(".schedule_list_employee__note textarea").value
            console.log(note);
            let data = {
                "user_uid": {
                    "uid": employee_id
                },
                "overtime": overtime,
                "note": note,
                "totalTime": totaltime, //Front end tự tính r gữi đi cái này
                "start": start, //Front end tự tính r gữi đi cái này
                "end": end //Front end tự tính r gữi đi cái này
            }
            if (data) {
                listScheduleEmployee.push(data)

                // //Gọi tạo 1 ca trong ngày sau đó gọi sắp lịch cho danh sách nhân viên
                // createShiftOfDay(shiftTypeId, task, dayNow)

            }
        }

    })
    if (listScheduleEmployee.length !== 0) {
        let shiftId
        //Gọi tạo 1 ca trong ngày sau đó gọi sắp lịch cho danh sách nhân viên
        console.log(listScheduleEmployee);
        alert("Tao 1 ca")
        createShiftOfDay(shiftTypeId, task, dayNow)
            .then(res => {
                if (!res.status) {
                    shiftId = res.id
                    console.log(res);

                    let dataChange = [...listScheduleEmployee]
                    let dataToPost = []
                    console.log(dataChange);
                    dataChange.forEach(data => {
                        data.shift = {
                            id: shiftId
                        }
                    })

                    console.log(dataChange);
                    let apiAddEmployeeToScheduleUrl = "http://localhost:8080/api/manager/employee/schedule"
                    fetch(apiAddEmployeeToScheduleUrl, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataChange)
                    })
                        .then(res => {
                            return res.json()
                        })
                        .then((response) => {
                            //Nhận được các ca + timeline
                            let data = response;
                            //save data
                            console.log(data);
                            if (data) {
                                alert("Thành công");
                                document.querySelectorAll(".schedule_list_employee__shift_id").forEach(item => {
                                    item.innerText = data[0].shift.id
                                })
                            }

                        })
                        .catch(err => {
                            if (err) console.log("Có lỗi xảy ra khi phân công")
                        })
                } else {
                    alert(res.message)
                }
            })
        // .catch(err => console.log(err.message))
        // console.log(data);

    }
})
//Lấy về thông tin lịch làm trong ngày đang chọn và kiểm tra -> nếu có thì hiện bảng phân công nếu chưa thì hiện tạo ca,
// Khi bấm chuyển ngày thì cũng gọi hàm này luôn


function getScheduleAtDay(shiftTypeId, date) {

    return new Promise((resolve, reject) => {
        let apiUrl = `http://localhost:8080/api/manager/employee/schedules?date=${date}`
        fetch(apiUrl, {
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
                let shiftTypeList = document.querySelector(".schedule__shift_type_list")
                //Nhận được các ca + timeline
                let data = response;
                //save data

                if (data) {

                }

            })
            .catch(err => {
                if (err) console.log("Có lỗi xảy ra")
            })
    })
}

function showAndFetchApi(thisEl) {
    let viewScheduleShiftType = document.querySelectorAll(".view_schedule_shift_type")
    console.log(thisEl);
    viewScheduleShiftType.forEach(item => {
        item.classList.remove("active")

    })
    thisEl.classList.add("active")
    let id = thisEl.querySelector("span").innerHTML
    console.log(id);
    let toDayElement = document.querySelector(".view_schedule .schedule_date input")

    let today = toDayElement.value
    getScheduleInfoOfDay(today, id)
    //Gọi api

}
// Chức năng xem lịch làm
function setUpViewShedule() {
    localStorage.setItem("previousFunction", "view_schedule")

    let toDayElement = document.querySelector(".view_schedule .schedule_date input")
    console.log("Gọi chức năng xem lịch làm")

    // let chooseDate = document.querySelector(".view_schedule .schedule_date input")
    let viewScheduleShiftType = document.querySelectorAll(".view_schedule_shift_type")
    let dateNow = new Date()
    let year = dateNow.getFullYear();
    let month = String(dateNow.getMonth() + 1).padStart(2, '0');
    let day = String(dateNow.getDate()).padStart(2, '0');
    let shiftActive;

    // let formattedDate = year + "-" + month + "-" + day;
    // chooseDate.value = formattedDate

    fetch("http://localhost:8080/api/manager/shiftTypes", {
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
            // let shiftTypeList = document.querySelector(".view_schedule__shift_type_list")
            // //Nhận được các ca + timeline
            // let data = response;
            // //save data
            // console.log(shiftTypeList);
            // if (data) {
            //     shiftTypeList.innerHTML = ""
            //     console.log(data);
            //     data.forEach(item => {
            //         shiftTypeList.innerHTML += `
            //                 <p onclick="showAndFetchApi(this)" class="view_schedule_shift_type">${item.name + " " + item.timeline}
            //                     <span class="view_schedule_shift_type_id hide">${item.id}</span>
            //                 </p>`
            //     })
            // }
            // let toDay = toDayElement.value

            // getScheduleInfoOfDay(toDay)
        })
        .catch(err => {
            if (err) console.log(err)
        })



    //Chấm công
    let presentCheck = document.querySelector(".presentCheckBtn")
    presentCheck.addEventListener("click", presentCheckHandler)
    //Khi bấm lưu chấm công thì lấy các id shiftDetail check
}

//Xử lý khi lưu chấm công
function presentCheckHandler(e) {
    console.log("xử lí lưu chấm công");
    //Lấy ra cái id đang check
    let idChecking = []

    let checkBox = document.querySelectorAll(".presentCheck")
    checkBox.forEach(check => {
        if (check.checked) {
            let checkid = check.parentElement.parentElement.querySelector(".view__schedule_list_employee__shift_id").innerText
            console.log(checkid);
            idChecking.push(Number(checkid))
        }
    })
    console.log("Danh sach id ", idChecking);
    //Goi api
    console.log("Goi api cập nhật chấm công");
    if (idChecking.length > 0) {
        fetch("http://localhost:8080/api/manager/employee/updatePresent", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idChecking,
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status == "OK") {
                    alert(res.message)
                    location.reload()
                } else {
                    alert("Chấm công không thành công")
                }
            })
    }



    e.target.removeEventListener("click", presentCheckHandler)
}

async function getScheduleInfoOfDay(date, shiftListId) {
    let apiUrl = `http://localhost:8080/api/manager/employee/schedules?date=${date}`
    let data = await fetch(apiUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(response => {

            return response

        })
    // console.log(data);
    //Có danh sách nhân viên làm trong ngày
    if (data) {
        //
        let dataToShow = []
        data.forEach(item => {
            console.log(item.shift.shiftList.id + " " + shiftListId + " " + date);
            if (item.shift.shiftList.id == shiftListId) {
                // console.log(item);
                dataToShow.push(item)
            } else {
                console.log("Không có ca này");
            }
        })


        console.log(dataToShow);
        //Show ra thoai
        let containerElement = document.querySelector(".view_schedule__shift_type_table")
        containerElement.classList.remove("hide")
        let tbody = containerElement.querySelector("tbody")
        if (dataToShow.length > 0) {
            console.log(tbody);
            tbody.innerHTML = ""

            dataToShow.forEach(item => {
                tbody.innerHTML +=
                    ` <tr>
                                        <th class="view__schedule_list_employee__shift_id" scope="row">${item.id}</th>
                                        <th class="view__schedule_list_employee__fullname">${item.user_uid.fullName}</th>
                                        <th class="view__schedule_list_employee__role">${item.user_uid.roleName}</th>
                                        <th class="view__schedule_list_employee__gender">${item.user_uid.gender}</th>
                                        <th class="view__schedule_list_employee__phone">${item.user_uid.phone}</th>

                                        <th class="view__schedule_list_employee__start text_center">${item.start}</th>
                                        <th class="view__schedule_list_employee__end text_center">${item.end}</th>
                                        <th class="view__schedule_list_employee__overtime text_center">${item.overtime}</th>
                                        <th class="view__schedule_list_employee__totaltime">${item.totalTime}</th>
                                        <th class="view__schedule_list_employee__note">
                                            <textarea style="width: 100%;" rows="3">${item.note}</textarea>
                                        </th>
                                        <th class="view__schedule_list_employee__presentCheck" scope="col">
                                            <input class="presentCheck" type="checkbox" ${item.present ? 'checked' : ''} name="" id="">
                                        </th>

                                    </tr> `
            })


        } else {
            tbody.innerHTML = `<tr>
            <th class="text_center" colspan="11">Không có lịch cho ca này </th>
             </tr>`
        }
    }
    //không có dâta
    else {
        console.log("Không có dữ liệu");
    }
}

//Chức năng xóa ca làm của ngày
// Tìm id ca đang bấm xóa
// Gữi id lên backend
async function deleteHandler(e) {
    //Lấy shift id
    let shiftIdToDelete = e.target.parentElement.querySelector(".schedule_list_employee__table .schedule_list_employee__shift_id").innerText
    console.log(shiftIdToDelete);
    //call api
    let response = await fetch(`http://localhost:8080/api/manager/shiftDetail/delete?id=${shiftIdToDelete}`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            alert(res.message)
        })
        .catch(err => {
            console.log(err);
        })

    if (response.status === "OK") {
        let rs = await fetch(`http://localhost:8080/api/manager/shift/delete?id=${shiftIdToDelete}`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
            })
            .catch(err => {
                console.log(err);
            })
        console.log(rs);
    }
}

let schedule_employee__deleteShift = document.querySelector(".schedule_employee__deleteShift")

schedule_employee__deleteShift.addEventListener("click", deleteHandler)

//them su kien xoa nhan vien

let detail_delete = document.querySelector(".detail_delete")
detail_delete.addEventListener("click", (e) => {
    //Lấy id thằng cần xóa
    let uidDelete = e.target.parentElement.querySelector(".details__description_wrapper .uid").innerText

    fetch(`http://localhost:8080/api/manager/employee/delete?id=${uidDelete}`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            alert(res.message)
        })
        .catch(err => {
            console.log(err);
        })
})