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
// if (!localStorage.getItem("info")) location.href = "http://localhost:5500/src/login.html";



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
                                        case "schedule":
                                            setUpShedule()

                                            break;
                                        case "view_schedule":
                                            setUpViewShedule()

                                            break;
                                        default:
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
    input.type = "text";
    input.value = thisItem.innerHTML;
    input.style.width = "100%"
    input.onblur = function () {
        thisItem.innerHTML = input.value;
    };
    input.oninput = function () {
        //hiển thị nút lưu thay đổi
        saveChange.classList.remove("hide")
    };
    thisItem.innerHTML = "";
    thisItem.appendChild(input);
    input.focus();
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

//Chức năng lập lịch
//Khi bấm nút tạo ca trong ngày
function setUpShedule() {

    let chooseDate = document.querySelector(".schedule_date input")

    let dateNow = new Date()
    let year = dateNow.getFullYear();
    let month = String(dateNow.getMonth() + 1).padStart(2, '0');
    let day = String(dateNow.getDate()).padStart(2, '0');


    let formattedDate = year + "-" + month + "-" + day;
    chooseDate.value = formattedDate

    let scheduleShiftType = document.querySelectorAll(".schedule__shift_type")
    let creaftShiftForm = document.querySelector(".create_shift")
    let createShiftBtn = document.querySelector(".create_shift button")
    let availableEmployeeTable = document.querySelector(".availablleToSchedule")
    let scheduleEmployeeTable = document.querySelector(".schedule_employee")

    //Đầu tiên kiểm tra ca đang active hiện tại có được tạo ca chưa
    //Gọi api tìm id_shift_type trong ngày này có trong bảng shift hay k
    // Nếu có thì render 2 bảng ra để sắp lịch
    //Nếu không thì hiện giao diện tạo ca

    let shiftActive;

    //Lấy ra ca đang chọn
    scheduleShiftType.forEach(item => {
        if (item.classList.contains("active")) {
            console.log("Gọi tìm xem ca trong ngày này đã có chưa");
            shiftActive = item
            console.log(shiftActive);
        }
    })

    function showCreateShiftForm() {
        console.log("Gọi hàm hiển thị tạo ca");
    }

    //Hiển thị 2 bảng để lập lịch làm
    function showScheduleGui() {
        console.log("Gọi hàm hiển thị bảng sắp lịch");

    }

    //Khi nhấn tạo ca trong ngày
    createShiftBtn.addEventListener("click", () => {
        availableEmployeeTable.classList.remove("hide")
        scheduleEmployeeTable.classList.remove("hide")
        creaftShiftForm.classList.add("hide")
    })

    //Khi bấm chuyển qua 1 loại ca khác
    scheduleShiftType.forEach(type => {
        type.addEventListener("click", (e) => {
            scheduleShiftType.forEach(item => {
                if (item.classList.contains("active")) {
                    if (item !== e.target) {
                        item.classList.remove("active")
                        e.target.classList.add("active")

                        //re render

                        availableEmployeeTable.classList.add("hide")
                        scheduleEmployeeTable.classList.add("hide")
                        creaftShiftForm.classList.remove("hide")
                    }
                }
            })
        })
    })
}


function setUpViewShedule() {
    let chooseDate = document.querySelector(".view_schedule .schedule_date input")
    let viewScheduleShiftType = document.querySelectorAll(".view_schedule_shift_type")
    let dateNow = new Date()
    let year = dateNow.getFullYear();
    let month = String(dateNow.getMonth() + 1).padStart(2, '0');
    let day = String(dateNow.getDate()).padStart(2, '0');

    let shiftActive;

    let formattedDate = year + "-" + month + "-" + day;
    chooseDate.value = formattedDate

    viewScheduleShiftType.forEach(item => {
        if (item.classList.contains("active")) {
            shiftActive = item;
            console.log("Goi api lần đầu"); //Cho ca mặc định
        }
    })

    console.log(viewScheduleShiftType);
    viewScheduleShiftType.forEach(type => {
        type.addEventListener("click", (e) => {
            viewScheduleShiftType.forEach(item => {
                if (item.classList.contains("active")) {
                    //lấy ra ca element đang active
                    if (item !== e.target) {
                        //Gọi api để đổ dữ liệu mới cho e.target
                        console.log(e.target);

                        console.log("Gọi api để đổ dữ liệu mới");
                        item.classList.remove("active")
                        e.target.classList.add("active")

                        //re render


                    }
                }
            })
        })
    })
}






// //Chức năng thêm nhân viên
// let add_employee_nav = document.querySelector(".add_employee")
// let add_employee_content = document.querySelector(".main_content_add_employee")
// let fullName = document.querySelector(".fullName")
// let email = document.querySelector(".email")

// let phone = document.querySelector(".phone")

// let id = document.querySelector(".identification")

// let role = document.querySelector(".roleName")

// let bank = document.querySelector(".bank")

// let birthday = document.querySelector(".birthday")

// let add_btn = document.querySelector(".add")

// add_employee_nav.addEventListener("click", (e) => {


//     //Check
//     if (!add_employee_content.classList.contains("show_block")) {
//         add_employee_content.classList.add("show_block")
//         //Lấy về danh sách role
//         fetch("http://localhost:8080/api/manager/roles", {
//             method: "GET",
//             mode: "cors",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(res => {
//                 return res.json()
//             })
//             .then((response) => {
//                 let data = response;

//                 data.forEach(element => {
//                     let newOption = document.createElement("option");
//                     newOption.value = element.name
//                     newOption.text = element.name
//                     role.appendChild(newOption);
//                 });
//             }).catch(err => {
//                 alert("Có lỗi xảy ra! Không lấy được danh sách chức vụ");
//             })
//     }

//     return;

// })

// //post api

// add_btn.addEventListener("click", () => {
//     let employee = {
//         fullName: fullName.value,
//         email: email.value,
//         phone: phone.value,
//         identification: id.value,
//         roleName: role.selectedOptions[0].innerText,
//         bank: bank.value,
//         birthday: birthday.value,
//     }
//     console.log(employee);

//     //PHẢI CÓ 1 DÒNG CHECK RỖNG NỮA NHE --------------
//     fetch("http://localhost:8080/api/manager/employee/add", {
//         method: "POST",
//         mode: "cors",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(employee)
//     })
//         .then(res => {
//             return res.json()
//         })
//         .then((response) => {
//             let data = response;

//             if (data.status !== "OK") {
//                 alert(data.message)
//                 return;
//             }
//             //save data
//             console.log(data)
//         }).catch(err => {
//             alert(err.message)
//         })

// })