//Hiển thị số stt tuần của ngày hiện tại
// showSttWeekOfMonth(new Date()) //Đang lỗi nên không xài


//Hiển thị ngày bắt đầu và kết thúc của tuần hiện tại
showStartAndEndWeek(getWeekList(new Date()))

// Hiển thị ngày bên dưới thứ trong tuần
showDayUnderSttOfWeekTh()


//Thêm số 0 vào chuỗi ngày tháng.. Tryuền vào tham số dạng yyyy-mm-đd
function formatDateString(dateString) {

    // console.log(dateString + " Trong ham format string");
    // Tách ngày, tháng, năm từ chuỗi đầu vào
    const parts = dateString.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    // Chuyển đổi ngày và tháng thành chuỗi có 2 chữ số, nếu cần
    const formattedDay = day.length === 1 ? '0' + day : day;
    const formattedMonth = month.length === 1 ? '0' + month : month;

    // Tạo chuỗi ngày tháng năm đã được định dạng
    const formattedDateString = `${year}-${formattedMonth}-${formattedDay}`;

    return formattedDateString;
}
//Dùng để call api dùng chung
async function callApi(method, url, body) {
    if (method === "GET") {
        return fetch(url, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },

        })
            .then(res => res.json())
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        return fetch(url, {
            method: method,
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : ""
        })
    }

}


//Trả về tuần của ngày hiện tại
function getWeekList(dayNow) {
    // console.log(dayNow);

    //Tìm ngày đầu tuần

    let startOfWeek = new Date(dayNow);
    //Lấy ngày hiện tại trừ cho số ngày cách thứ 2
    startOfWeek.setDate(dayNow.getDate() - (dayNow.getDay() + 6) % 7)

    //Lặp danh sách từ thứ 2 đến chủ nhật
    // console.log(startOfWeek);
    let weekList = []

    for (let i = 0; i <= 6; i++) {

        let day = new Date(startOfWeek);
        //Ngày đầu tuần tăng 1
        day.setDate(day.getDate() + i);
        let dayFomat = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
        let week = {
            stt: i + 2, // Thứ 0 + 2 => Thứ 2
            day: formatDateString(dayFomat)
        }
        weekList.push(week)
    }
    return weekList;
}


//Lấy ra tuần thứ mấy dựa vào ngày truyền vào
function getWeekNumberInMonth(date) {
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const daysOffset = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

    const currentDate = targetDate.getDate();
    const weekNumber = Math.floor((currentDate + daysOffset - 1) / 7) + 1;
    if (weekNumber === 5) return 4;
    else
        return weekNumber;
}


//Hiển thị tuần thứ mấy trong tháng dựa vào ngày truyền vào
function showSttWeekOfMonth(date) {

    let weekNumber = getWeekNumberInMonth(date)
    let weekNumberOfMonth = document.querySelector(".weekNumberOfMonth")
    // console.log(weekNumberOfMonth);
    weekNumberOfMonth.innerText = `Tuần ${weekNumber}`
}

//Hiển thị ngày bắt đầu và kết thúc của tuần // Tham số là danh sách tuần hiện tại
function showStartAndEndWeek(weekList) {
    let startDay = weekList[0].day
    let endDay = weekList[weekList.length - 1].day
    // console.log(weekList[0].day + " " + weekList[weekList.length - 1].day);

    let startToEndDay = document.querySelector(".startToEndDay")
    startToEndDay.innerText = `${reversedDateString(formatDateString(startDay))} -> ${reversedDateString(formatDateString(endDay))}`
}
function showDayUnderSttOfWeekTh(date) {
    //danh sách tuần hiện tại
    //index 0 là thú 2
    let thisWeek = date ? getWeekList(new Date(date)) : getWeekList(new Date())
    // console.log(thisWeek);
    let thOfWeekElementList = document.querySelectorAll(".sttOfWeek")
    //Mỗi
    thOfWeekElementList.forEach((item, index) => {
        item.querySelector("p").innerText = reversedDateString(formatDateString(thisWeek[index].day))
    })
}

//-------Bắt sự kiện ấn nút tiến tới 1 tuần-------------


//Lấy ngày kế tiếp của ngày truyền vào
function getNextDay(date) {
    const targetDate = new Date(date);
    // console.log(targetDate);
    targetDate.setDate(targetDate.getDate() + 1); // Tăng giá trị ngày lên 1
    if (targetDate.getDate() === 1) {
        targetDate.setMonth((targetDate.getMonth() + 1) + 1); // Tăng giá trị tháng lên 1
        targetDate.setDate(1); // Đặt ngày thành 1
    }

    return targetDate;
}

//Xử lý tăng tuần
async function upWeekHandler(e) {
    //Làm sạch hết các cột để đổ data mới
    clearTdContentInScheduleColumn()
    // Lấy ra ngày của tuần tiếp theo. Đầu tiên lấy ngày cuối của tuần này
    let startToEndDayElement = e.target.parentElement.querySelector(".startToEndDay")
    let startToEndDay = startToEndDayElement.innerText
    let index = startToEndDay.lastIndexOf(">")

    //Ngày cuối của tuần hiện tại
    let lastDayofTargetWeek = startToEndDay.substring(index + 2)
    // console.log(reversedDateString(lastDayofTargetWeek));
    let nextDay = getNextDay(new Date(reversedDateString(lastDayofTargetWeek)))
    //Ngày đầu của tuần kế tiếp
    let nextDayFomat = `${nextDay.getFullYear()}-${nextDay.getMonth() + 1}-${nextDay.getDate()}`
    //console.log(nextDayFomat);    //Hiển thị số stt tuần của ngày truyền vào
    // showSttWeekOfMonth(new Date(nextDayFomat))
    //Hiển thị ngày bắt đầu và kết thúc của tuần hiện tại
    showStartAndEndWeek(getWeekList(new Date(nextDayFomat)))
    // Hiển thị ngày bên dưới thứ trong tuần
    showDayUnderSttOfWeekTh(nextDayFomat)


    ///Gọi api get dữ liệu làm việc từ ngày thứ 2 đến ngày chủ nhật
    //Truyền ngày lên nhớ đảo chuỗi lại
    let dayStart = formatDateString(nextDayFomat)
    let nextWeekList = getWeekList(new Date(nextDayFomat))
    let dayEnd = (nextWeekList[nextWeekList.length - 1].day)
    // console.log("Ngay bat dau ", dayEnd + dayStart)
    let apiUrl = `http://localhost:8080/api/manager/schedule/dayToDay?start=${dayStart}&end=${dayEnd}`
    //Nhận lại dữ liệu
    let data = await callApi("GET", apiUrl)
    // console.log(data);
    renderDataToScheduleColumn(data.data)
}
//Thêm tên nhân viên vào cột thứ trong tuần tương ứng
function renderDataToScheduleColumn(listShiftDetail) {
    listShiftDetail.forEach(oneShiftDetail => {
        //Lấy ra shift_list_id
        console.log(oneShiftDetail);
        let shiftList_id = oneShiftDetail.shift.shiftList.id;
        let shiftDate = oneShiftDetail.shift.date

        //tìm thứ của ca ngày đó
        let sttOfShiftDateInWeek = (new Date(shiftDate).getDay()) === 0 ? 8 : new Date(shiftDate).getDay() + 1;

        // console.log(shiftList_id + " " + sttOfShiftDateInWeek)

        //tìm tr có shiftList_id bằng với shiftList id của response
        let trElement = document.querySelectorAll(".view_schedule__new_tr")
        // console.log(trElement);
        trElement.forEach((one) => {
            let shiftListIdShowed = one.querySelector(".shift_list_id")
            if (Number(shiftListIdShowed.innerText) === shiftList_id) {
                let firstTd = shiftListIdShowed.parentElement
                let trTarget = firstTd.parentElement
                let schedule_col = trTarget.querySelectorAll(".schedule_col")
                let schedule_col_target = schedule_col[sttOfShiftDateInWeek - 2]
                // console.log(schedule_col[6]);
                // console.log(schedule_col_target);
                schedule_col_target.innerHTML +=
                    `
                    <div class="margin-10px-top font-size14 timeline_uid timeline">${oneShiftDetail.start}:00-${(Number(oneShiftDetail.end) + Number(oneShiftDetail.overtime))}:00
                        <p class="uid_fullName fullName">${oneShiftDetail.user_uid.fullName}</p>
                        <span class="employee_uid hide">${oneShiftDetail.user_uid.uid}</span>   
                    </div>`
            }
        })
    })

}

function clearTdContentInScheduleColumn() {
    let allScheduleColumn = document.querySelectorAll('.schedule_col')
    allScheduleColumn.forEach(item => {
        item.innerHTML = ""
    })
}
//Đảo chuổi ngày tháng năm thành dạng dd/mm/yyyy
function reversedDateString(dateString) {

    const dateParts = dateString.split('-');
    const reversedDateString = dateParts.reverse().join('-');
    return reversedDateString;
}



//Lấy ngày cuối của tuần trước
function getPreviousDay(date) {
    const targetDate = new Date(date);
    targetDate.setDate(targetDate.getDate() - 1); // Giảm giá trị ngày đi 1

    return targetDate;
}

//Xử lý giảm tuần
async function downWeekHandler(e) {
    //Làm sạch hết các cột để đổ data mới
    clearTdContentInScheduleColumn()

    // Lấy ra ngày dầu của tuần này. 
    let startToEndDayElement = e.target.parentElement.querySelector(".startToEndDay")
    let startToEndDay = startToEndDayElement.innerText
    let index = startToEndDay.lastIndexOf(">")

    //Ngày đầu của tuần hiện tại
    let lastDayofTargetWeek = startToEndDay.substring(0, index - 2)
    // console.log(reversedDateString(lastDayofTargetWeek));
    let previousDay = getPreviousDay(new Date(reversedDateString(lastDayofTargetWeek)))
    //Ngày đầu của tuần kế tiếp
    let previousDayFormat = `${previousDay.getFullYear()}-${previousDay.getMonth() + 1}-${previousDay.getDate()}`
    // console.log(previousDayFormat);    //Hiển thị số stt tuần của ngày truyền vào
    // showSttWeekOfMonth(new Date(nextDayFomat))


    //Hiển thị ngày bắt đầu và kết thúc của tuần hiện tại
    showStartAndEndWeek(getWeekList(new Date(previousDay)))

    // Hiển thị ngày bên dưới thứ trong tuần
    showDayUnderSttOfWeekTh(previousDay)



    ///Gọi api get dữ liệu làm việc từ ngày thứ 2 đến ngày chủ nhật
    //Truyền ngày lên nhớ đảo chuỗi lại
    let dayEnd = formatDateString(previousDayFormat)
    let nextWeekList = getWeekList(new Date(previousDayFormat))
    let dayStart = (nextWeekList[0].day)
    console.log("Ngay bat dau ", dayEnd + dayStart)
    let apiUrl = `http://localhost:8080/api/manager/schedule/dayToDay?start=${dayStart}&end=${dayEnd}`
    //Nhận lại dữ liệu
    let data = await callApi("GET", apiUrl)
    console.log(data);
    renderDataToScheduleColumn(data.data)
}

//Hiển thị ca làm ngày hiện tại 
async function showScheduleNow() {
    let weekList = getWeekList(new Date())
    let dayStart = formatDateString(weekList[0].day)
    let dayEnd = formatDateString(weekList[weekList.length - 1].day)
    let apiUrl = `http://localhost:8080/api/manager/schedule/dayToDay?start=${dayStart}&end=${dayEnd}`


    let data = await callApi("GET", apiUrl)
    console.log(data);
    renderDataToScheduleColumn(data.data)

}

//Thêm loại ca làm và id loại ca làm vào bảng 
async function showShiftList() {
    let apiUrl = "http://localhost:8080/api/manager/shiftTypes"
    let shiftTypesResponse = await callApi("GET", apiUrl)

    console.log(shiftTypesResponse);
    if (shiftTypesResponse) {
        //Hiển thị tên ca và id 
        let td_shift_col = document.querySelectorAll(".view_schedule__new_tr .shift_col")
        console.log(td_shift_col[0], shiftTypesResponse[0]);
        for (let index = 0; index < shiftTypesResponse.length; index++) {
            td_shift_col[index].innerHTML = `
                                    <p>${shiftTypesResponse[index].name}</p>
                                        <span class="hide shift_list_id">${shiftTypesResponse[index].id}</span>
                                    <p class="hide">(${shiftTypesResponse[index].timeline})</p>
            `

        }

        showScheduleNow()

    } else
        return alert("Không lấy được danh sách loại ca làm")

}
showShiftList()
// Thêm sự kiện tăng tuần
let up_week_btn = document.querySelector(".up_week_btn")
up_week_btn.addEventListener("click", upWeekHandler)
// Thêm sự kiện giảm tuần
let down_week_btn = document.querySelector(".down_week_btn")
down_week_btn.addEventListener("click", downWeekHandler)
//Xem theo ngày của các nhân viên




//Lấy dữ liệu danh sách đi làm trong ngày
// Nếu ko truyền ngày thì lấy ngày hiện tại
async function getEmployeeWorkToday(day) {
    let dayFomat
    if (day) {

        dayFomat = formatDateString(day)
    } else {
        daynow = new Date()
        dayFomat = `${daynow.getFullYear()}-${daynow.getMonth() + 1}-${daynow.getDate()}`
    }


    let dayString = formatDateString(dayFomat)
    let apiUrl = `http://localhost:8080/api/manager/employee/schedules?date=${dayString}`
    let employees = await callApi("GET", apiUrl)
    return employees;
}
//

//Hiển thị danh sách nhân viên vào bảng xem lịch trong ngày
async function showListEmployeWorkOnToday(day) {
    let employees = await getEmployeeWorkToday(day)
    console.log(employees);

    let tbodyListEmployee = document.querySelector(".tbody_viewSchedule_onDay")
    tbodyListEmployee.innerHTML = ""
    //Lọc trùng


    const filteredArray = [];

    employees.forEach(item => {
        const uid = item.user_uid.uid;
        const fullName = item.user_uid.fullName;
        const timeline = item.start + "-" + (Number(item.end) + Number(item.overtime));
        const existingItem = filteredArray.find(e => e.uid === uid);

        if (existingItem) {
            existingItem.timeline.push(timeline);
        } else {
            filteredArray.push({
                uid: uid,
                fullName: fullName,
                timeline: [timeline]
            });
        }
    });

    console.log("danh sach sao khi loc: ", filteredArray);
    filteredArray.forEach(item => {

        tbodyListEmployee.innerHTML +=
            `

        <tr class="list_employee_work_on_day view_schedule__new_tr_onDay">
                                       
            <td class="align-middle employee_work fixMenu">
                                               <p>${item.fullName}</p>
                                               <span class="user_uid hide">${item.uid}</span>
            </td>
                                            <td class="start7 shift_list_iddd schedule_col">
    
                                            </td>
                                            <td class="start8 schedule_col">
    
                                            </td>
                                            <td class="start9  schedule_col">
    
    
    
                                            </td>
                                            <td class="start10  schedule_col">
    
                                            </td>
                                            <td class="start11  schedule_col">
                                            </td>
                                            <td class="start12  schedule_col">
                                            </td>
                                            <td class="start13 schedule_col">
                                            </td>
                                            <td class="start14 schedule_col">
                                            </td>
                                            <td class="start15 schedule_col">
                                            </td>
                                            <td class="start16 schedule_col">
                                            </td>
                                            <td class="start17 schedule_col">
                                            </td>
                                            <td class="start18 schedule_col">
                                            </td>
                                            <td class="start19 schedule_col">
                                            </td>
                                            <td class="start20 schedule_col">
                                            </td>
                                            <td class="start21 schedule_col">
                                            </td>
        </tr>
        
        `



    })
    //Xử lí tô màu vào cột có giờ làm
    let uidelement = tbodyListEmployee.querySelectorAll(".user_uid")
    uidelement.forEach(element => {
        let uidElementText = element.innerText
        let tr = element.parentElement.parentElement
        for (let i = 0; i < filteredArray.length; i++) {
            if (filteredArray[i].uid === uidElementText) {
                let timeline = filteredArray[i].timeline //Array
                console.log(timeline + "" + uidElementText);

                timeline.forEach(e => {
                    let startTime = e.split("-")[0]
                    let endTime = e.split("-")[1]
                   console.log(startTime + " " + endTime);
                    //Lấy danh sách elemnt cần tô màu
                    for(let i = Number(startTime); i < Number(endTime); i++) {
                        let toMakeColor = tr.querySelector(`.start${i}`)
                        toMakeColor.classList.add("bg_lightBlue")
                    }
                })
            }
        }
        // if(element.innerText ==="")
        // console.log(tr);
    })
}
//  showListEmployeWorkOnToday("2023-06-30")

//Hiển thị ngày hôm nay vào input
function showTodayToInputDate() {
    let dnow = new Date()
    let dateString =  `${dnow.getFullYear()}-${dnow.getMonth()+1}-${dnow.getDate()}`
    let inputTypeDate = document.querySelector(".view_schedule_new_wrapper .view_schedule_date input")
    inputTypeDate.value =formatDateString(dateString)
    // console.log(dateString);

showListEmployeWorkOnToday() //Hiển thj lịch ngày hôm nayy 

}
showTodayToInputDate()

//Thêm sự kiện đổi ngày xem lịch theo ngày
let inputTypeDate = document.querySelector(".view_schedule_new_wrapper .view_schedule_date input")
inputTypeDate.addEventListener("change",(e) => {
    let changeValueDate = e.target.value

    showListEmployeWorkOnToday(changeValueDate)
})