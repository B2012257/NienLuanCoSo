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
let userInfo = JSON.parse(localStorage.getItem("info"));
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
                                    document.querySelector(".overview").classList.remove("hide")
                                    return
                                }
                            }

                        } return;
                    })
                }

            }
        })


        // overview
        // list_employee
        // update_employee
        // shift_list
        // schedule
        // view_schedule
        // salary_report
        // work_report

        //Thêm sự kiện khi click thì mở giao diện chức năng tương ứng

        //Thêm gạch cho item click
        /* Kiểm tra nếu item đang có class active khác với item
         đang click thì clear class và active cho item đang click 
        */

        // item.classList.add("active")

    })
})

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
let tdEdit = document.querySelectorAll(".table td")
tdEdit.forEach(item => {
    item.addEventListener("click", (e) => {
        convertToInput(e.target)
    })
})




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
function setUpOverView() {
    console.log("Gọi chức năng tổng quan")
}

//Danh sách nhân viên
function setUpListEmployee() {
    let apiUrl = "http://localhost:8080/api/manager/employees";
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
                let trHtmlTemplate = `<tr>
                                <th class="list_employee__table__uid" scope="row">${item.uid}</th>
                                <th class="list_employee__table__fullname">${item.fullName}</th>
                                <th class="list_employee__table__role">${item.roleName}</th>
                                <th class="list_employee__table__birthday">${item.birthday}</th>

                                <th class="list_employee__table__gender">${item.gender || "Nam"}</th>
                                <th class="list_employee__table__phone">${item.phone}</th>
                                <th class="list_employee__table__username">${item.userName}</th>
                                <th class="list_employee__table__password"><input type="password" name=""
                                        value=${item.password}" id="">
                                </th>
                                <th class="list_employee__table__startWorkFromDay">${item.startWorkFromDay || ""}</th>
                                <th class="list_employee__table__status">${item.status || "none"}</th>
                            </tr>`
                tbodyListEmployeeTable.innerHTML += trHtmlTemplate
            })
        })
        .catch(err => {
            if (err) alert(erData.message)
        })

}
//Cập nhật và chỉnh sửa nhân viên
function setUpEditEmployee() {
    console.log("Gọi chức năng cập nhật nv")
    //Thêm nhân viên
    let updateEmployee = document.querySelector(".main_content__body__update_employee")
    let formAddEmployee = document.querySelector(".add_employee_popup_wrapper")
    let submitAddEmployee = formAddEmployee.querySelector(".add") // Nút xác nhận thêm nhân viên
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
    let searchEmployeeTable = document.querySelector(".search__list_employee__table")
    let tbodySearchEmployeeTable = searchEmployeeTable.querySelector("tbody")
    //Gọi api lấy các chức vụ
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
                roleName.appendChild(newOption);
            });
        }).catch(err => {
            alert("Có lỗi xảy ra! Không lấy được danh sách chức vụ");
        })

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


    //Khi nhấn xác nhận
    //Lấy dữ liệu từ form
    submitAddEmployee.addEventListener("click", () => {
        let formData = {
            fullName: fullName.value,
            email: email.value,
            phone: phone.value,
            identification: identification.value,
            roleName: roleName.value,
            bank: bank.value,
            birthday: birthday.value,
            avatarUrl: "",
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
                                <th class="just__list_employee__uid" scope="row">${data.user.uid}</th>
                                <td class="just__list_employee__fullname">${data.user.fullName}</td>
                                <td class="just__list_employee__role">${data.user.roleName} </td>
                                <td class="just__list_employee__gender">${data.user.gender}</td>
                                <td class="just__list_employee__phone">${data.user.phone}</td>
                                <th class="just__list_employee__username">${data.user.userName}</th>
                                <td class="just__list_employee__password"><input type="text" name="" value="${data.user.password}"
                                        id=""></td>
                                <th class="just__list_employee__startWorkFromDay">${data.user.startWorkFromDay} </th>
                            </tr>`
                    tBodyEmployeeJustAdd.innerHTML += trTemplate
                    alert("Thêm thành công")
                    return;
                } return;
                //save data

            })
            .catch(err => {
                if (err) alert("Có lỗi xảy ra")
            })
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
                }
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
    console.log(uid, fullName, roleName, gender);
    //Lấy ra các thông tin cần copy
    try {
        let tbodySchedule_list_employee__table = document.querySelector(".schedule_list_employee__table tbody")
        console.log(tbodySchedule_list_employee__table);
        tbodySchedule_list_employee__table.innerHTML +=
            `<tr>
                <th class="schedule_list_employee__shift_id" scope="row">${shiftTypeIdActive}</th>
                <th class="schedule_list_employee__user_uid">${uid}</th>
                <th class="schedule_list_employee__fullname">${fullName}</th>
                <th class="schedule_list_employee__gender">${gender}</th>
                <th class="schedule_list_employee__role">${roleName}</th>
                <th class="schedule_list_employee__start text_center">${timelineStart}</th>
                <th class="schedule_list_employee__end text_center">${timelineEnd}</th>
                <td onclick="convertToInput(this)" class="schedule_list_employee__overtime text_center">0</td>
                <th class="schedule_list_employee__totaltime">${timeNumber}</th>
                <td class="schedule_list_employee__note">
                <textarea style="width: 100%;" rows="3"></textarea>
                </td>
                <th class="schedule_list_employee__action">
                    <button onClick="removeParentElement(this)">Xóa</button>
                </th>
            </tr>`
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
function addSwitchShiftTypeEvent() {
    let scheduleShiftType = document.querySelectorAll(".schedule__shift_type")
    let availableEmployeeTable = document.querySelector(".availablleToSchedule")
    let scheduleEmployeeTable = document.querySelector(".schedule_employee")
    let creaftShiftForm = document.querySelector(".create_shift")
    let mainContentSchedule = document.querySelector(".main_content__body__schedule")
    let createShift = mainContentSchedule.querySelector(".create_shift")
    let createShiftBtn = createShift.querySelector(".create_shift button")
    let taskEl = createShift.querySelector(".shift_task")
    //Bắt sự kiện bấm nút tạo ca
    createShiftBtn.addEventListener("click", async () => {
        //Lấy nội dung nhiệm vụ
        task = taskEl.value;
        let shiftList = document.querySelector(".schedule__shift_type.active")
        // let shiftListId = shiftList.querySelector(".shift_type_id ").innerHTML
        // createShiftOfDay(shiftListId, task, dayNow)

        if (task !== "") {
            //Hiển thị nhân viên có thể làm trong ca đó
            //Tạm thời đổ tất cả nhân viên vào
            availableEmployeeTable.classList.remove("hide")
            getAllEmployeeAndContinue()






            scheduleEmployeeTable.classList.remove("hide")
            creaftShiftForm.classList.add("hide")
        }


    })
    //Khi bấm chuyển qua 1 loại ca khác
    scheduleShiftType.forEach(type => {
        type.addEventListener("click", (e) => {
            scheduleShiftType.forEach(item => {
                if (item.classList.contains("active")) {
                    //Khi bấm vào 1 ca khác với ca hiện tại đang active
                    if (item !== e.target) {
                        item.classList.remove("active")
                        e.target.classList.add("active")

                        //re render
                        //Gọi api
                        //Sau này gọi api thì xóa 2 dòng này
                        let tbodySchedule_list_employee__table = document.querySelector(".schedule_list_employee__table tbody")
                        tbodySchedule_list_employee__table.innerHTML = ""


                        availableEmployeeTable.classList.add("hide")
                        scheduleEmployeeTable.classList.add("hide")
                        creaftShiftForm.classList.remove("hide")
                    }
                } else {
                    //Gọi api khi lần đầu bấm 1 tab

                    e.target.classList.add("active")
                    document.querySelector(".schedule__shift_type_table").classList.remove("hide")
                }
            })
        })
    })
}

//Chức năng lập lịch
function setUpShedule() {
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
                            <p class="schedule__shift_type">${item.name + " " + item.timeline}
                                <span class="shift_type_id hide">${item.id}</span>
                            </p>`
                })
                //Thêm sự kiện khi bấm 1 tab thì gọi api
                addSwitchShiftTypeEvent()
            }

        })
        .catch(err => {
            if (err) console.log("Có lỗi xảy ra")
        })

    //Gọi api tìm id_shift_type trong ngày này có trong bảng shift hay k
    // Nếu có thì render 2 bảng ra để sắp lịch
    //Nếu không thì hiện giao diện tạo ca

    function showCreateShiftForm() {
        console.log("Gọi hàm hiển thị tạo ca");
    }

    //Hiển thị 2 bảng để lập lịch làm
    function showScheduleGui() {
        console.log("Gọi hàm hiển thị bảng sắp lịch");

    }

    // //Khi nhấn tạo ca trong ngày
    // createShiftBtn.addEventListener("click", () => {

    // })



    //Bắt sự kiện khi lưu bảng phân công
    let saveScheduleBtn = scheduleEmployeeTable.querySelector("button")
    let ScheduleTable = scheduleEmployeeTable.querySelector("table")
    let ScheduleTbody = ScheduleTable.querySelector("tbody")

    console.log(saveScheduleBtn);
    //Kiểm tra bảng phân công. nếu hợp lệ thì lưu
    saveScheduleBtn.addEventListener("click", () => {
        let listScheduleEmployee = []
        let shiftList = document.querySelector(".schedule__shift_type.active")
        let shiftTypeId = shiftList.querySelector(".shift_type_id ").innerHTML
        let dayNow = document.querySelector(".schedule_date input").value

        let tr = ScheduleTbody.querySelectorAll("tr")
        tr.forEach(eachItem => {
            console.log(eachItem);
            if (eachItem) {
                let shift_type_id = eachItem.querySelector(".schedule_list_employee__shift_id").innerText
                let employee_id = eachItem.querySelector(".schedule_list_employee__user_uid").innerText
                let totaltime = eachItem.querySelector(".schedule_list_employee__totaltime").innerText
                let start = eachItem.querySelector(".schedule_list_employee__start").innerText
                let end = eachItem.querySelector(".schedule_list_employee__end").innerText
                let overtime = eachItem.querySelector(".schedule_list_employee__overtime").innerText
                let note = eachItem.querySelector(".schedule_list_employee__note").innerText

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
                            data.shift_id = {
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

                                if (data) {
                                    alert("Thành công");
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

}

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
        if (item.classList.contains("active")) {
            //lấy ra ca element đang active
            if (item !== thisEl) {
                let dayNow = document.querySelector(".schedule_date input").value
                //Gọi api để đổ dữ liệu mới cho e.target

                console.log("Gọi api để đổ dữ liệu mới");
                item.classList.remove("active")
                thisEl.classList.add("active")

                //re rende
            }
        } else {

            thisEl.classList.add("active")
            document.querySelector(".view_schedule__shift_type_table").classList.remove("hide")
        }
    })
}
// Chức năng xem lịch làm
function setUpViewShedule() {
    console.log("Gọi chức năng xem lịch làm")

    let chooseDate = document.querySelector(".view_schedule .schedule_date input")
    let viewScheduleShiftType = document.querySelectorAll(".view_schedule_shift_type")
    let dateNow = new Date()
    let year = dateNow.getFullYear();
    let month = String(dateNow.getMonth() + 1).padStart(2, '0');
    let day = String(dateNow.getDate()).padStart(2, '0');

    let shiftActive;

    let formattedDate = year + "-" + month + "-" + day;
    chooseDate.value = formattedDate

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
            let shiftTypeList = document.querySelector(".view_schedule__shift_type_list")
            //Nhận được các ca + timeline
            let data = response;
            //save data
            console.log(shiftTypeList);
            if (data) {
                shiftTypeList.innerHTML = ""
                console.log(data);
                data.forEach(item => {
                    shiftTypeList.innerHTML += `
                            <p onclick="showAndFetchApi(this)" class="view_schedule_shift_type">${item.name + " " + item.timeline}
                                <span class="view_schedule_shift_type hide">${item.id}</span>
                            </p>`
                })
            }

        })
        .catch(err => {
            if (err) console.log("Có lỗi xảy ra")
        })





    // viewScheduleShiftType.forEach(type => {
    //     type.addEventListener("click", (e) => {
    //         viewScheduleShiftType.forEach(item => {
    //             if (item.classList.contains("active")) {
    //                 //lấy ra ca element đang active
    //                 if (item !== e.target) {
    //                     let dayNow = document.querySelector(".schedule_date input").value
    //                     //Gọi api để đổ dữ liệu mới cho e.target
    //                     console.log(e.target);

    //                     console.log("Gọi api để đổ dữ liệu mới");
    //                     item.classList.remove("active")
    //                     e.target.classList.add("active")

    //                     //re render


    //                 }
    //             }
    //         })
    //     })
    // })
}