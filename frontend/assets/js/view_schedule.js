//Hiển thị số stt tuần của ngày hiện tại
// showSttWeekOfMonth(new Date()) //Đang lỗi nên không xài


//Hiển thị ngày bắt đầu và kết thúc của tuần hiện tại
showStartAndEndWeek(getWeekList(new Date()))

// Hiển thị ngày bên dưới thứ trong tuần
showDayUnderSttOfWeekTh()


//Thêm số 0 vào chuỗi ngày tháng.. Tryuền vào tham số dạng yyyy-mm-đd
function formatDateString(dateString) {

    console.log(dateString + " Trong ham format string");
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
                if (res.status === "OK") {
                    return res;
                }
                return console.log(res.message);
            })
            .catch(err => {
                console.log(err);
            })
    }
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


//Trả về tuần của ngày hiện tại
function getWeekList(dayNow) {
    console.log(dayNow);

    //Tìm ngày đầu tuần

    let startOfWeek = new Date(dayNow);
    //Lấy ngày hiện tại trừ cho số ngày cách thứ 2
    startOfWeek.setDate(dayNow.getDate() - (dayNow.getDay() + 6) % 7)

    //Lặp danh sách từ thứ 2 đến chủ nhật
    console.log(startOfWeek);
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
    console.log(weekNumberOfMonth);
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
    console.log(thisWeek);
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
    console.log(targetDate);
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
    console.log(reversedDateString(lastDayofTargetWeek));
    let nextDay = getNextDay(new Date(reversedDateString(lastDayofTargetWeek)))
    //Ngày đầu của tuần kế tiếp
    let nextDayFomat = `${nextDay.getFullYear()}-${nextDay.getMonth() + 1}-${nextDay.getDate()}`
    console.log(nextDayFomat);    //Hiển thị số stt tuần của ngày truyền vào
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
    console.log("Ngay bat dau ", dayEnd + dayStart)
    let apiUrl = `http://localhost:8080/api/manager/schedule/dayToDay?start=${dayStart}&end=${dayEnd}`
    //Nhận lại dữ liệu
    let data = await callApi("GET", apiUrl)
    console.log(data);
    renderDataToScheduleColumn(data.data)
}
//Thêm tên nhân viên vào cột thứ trong tuần tương ứng
function renderDataToScheduleColumn(listShiftDetail) {
    listShiftDetail.forEach(oneShiftDetail => {
        //Lấy ra shift_list_id
        let shiftList_id = oneShiftDetail.shift_id.shiftList.id;
        let shiftDate = oneShiftDetail.shift_id.date

        //tìm thứ của ca ngày đó
        let sttOfShiftDateInWeek = (new Date(shiftDate).getDay()) === 0 ? 8 : new Date(shiftDate).getDay() + 1;

        console.log(shiftList_id + " " + sttOfShiftDateInWeek)

        //tìm tr có shiftList_id bằng với shiftList id của response
        let trElement = document.querySelectorAll(".view_schedule__new_tr")
        console.log(trElement);
        trElement.forEach((one) => {
            let shiftListIdShowed = one.querySelector(".shift_list_id")
            if (Number(shiftListIdShowed.innerText) === shiftList_id) {
                let firstTd = shiftListIdShowed.parentElement
                let trTarget = firstTd.parentElement
                let schedule_col = trTarget.querySelectorAll(".schedule_col")
                let schedule_col_target = schedule_col[sttOfShiftDateInWeek - 2]
                console.log(schedule_col[6]);
                console.log(schedule_col_target);
                schedule_col_target.innerHTML +=
                    `
                    <div class="margin-10px-top font-size14 timeline_uid timeline">${oneShiftDetail.start}:00-${oneShiftDetail.end}:00
                        <p class="uid_fullName fullName">${oneShiftDetail.user_uid.fullName}</p>
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
    console.log(previousDayFormat);    //Hiển thị số stt tuần của ngày truyền vào
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

async function showScheduleNow() {
    let weekList = getWeekList(new Date())
    let dayStart = formatDateString(weekList[0].day)
    let dayEnd = formatDateString(weekList[weekList.length - 1].day)
    let apiUrl = `http://localhost:8080/api/manager/schedule/dayToDay?start=${dayStart}&end=${dayEnd}`


    let data = await callApi("GET", apiUrl)
    console.log(data);
    renderDataToScheduleColumn(data.data)
}
showScheduleNow()
// Thêm sự kiện tăng tuần
let up_week_btn = document.querySelector(".up_week_btn")
up_week_btn.addEventListener("click", upWeekHandler)
// Thêm sự kiện giảm tuần
let down_week_btn = document.querySelector(".down_week_btn")
down_week_btn.addEventListener("click", downWeekHandler)