

import Student from "./Student.js";
import Teacher from "./Teacher.js";
import Customer from "./Customer.js";

const perList = new ListPerson();
const validation = new Validation();

function getELE(id) {
    return document.getElementById(id);
}

function showTable(arr) {
    var content = "";
    arr.map(function (person) {
        const { id, name, address, email, kind } = person;
        var text = ``;

        if (kind == "student") {
            text = `
            <button onclick="averageStu('${id}')" class="btn btn-success">Điểm trung bình</button>
            `
        } else if (kind == "teacher") {
            text = `
            <button onclick="salTeacher('${id}')" class="btn btn-primary">Tính lương</button>
            `
        }

        var trELE = `<tr>
            <td>${id}</td>
            <td class="text-left">${name}</td>
            <td>${address}</td>
            <td>${email}</td>
            <td>${kind.charAt(0).toUpperCase() + kind.slice(1)}</td>
            <td>
                <button onclick="deletePer('${id}')" class="btn btn-danger">Xóa</button>
                <button onclick="detail('${id}')" class="btn btn-info" data-toggle="modal" data-target="#myModal">Xem</button>
                
            </td>
            <td>${text}</td>
        </tr>`
        content += trELE;
    })
    getELE("tableList").innerHTML = content;
}


function setLocalStorage(arr) {
    localStorage.setItem("perList", JSON.stringify(arr));

}

function getLocalStorage() {
    if (localStorage.getItem("perList") != null) {
        perList.perArr = JSON.parse(localStorage.getItem("perList"));
        showTable(perList.perArr);
    }
}
getLocalStorage();

getELE("kind").addEventListener('change', () => {
    const kind = getELE("kind").value;
    changeInput(kind);
})

function changeInput(kind) {
    let content = "";
    if (kind == 'student') {
        content = `
            <div class="form-group">
            <input type="text" class="form-control" id="maths" placeholder="Toán">
            <span id="maths-al"></span>
            </div>
            <div class="form-group">
            <input type="text" class="form-control" id="physics" placeholder="Lý">
            <span id="physics-al"></span>
            </div>
            <div class="form-group">
            <input type="text" class="form-control" id="chemistry" placeholder="Hóa">
            <span id="chemistry-al"></span>
            </div>
            `
    } else if (kind == 'teacher') {
        content = `
            <div class="form-group">
            <input type="text" class="form-control" id="workDay" placeholder="Số ngày làm việc">
            <span id="workDay-al"></span>
            </div>
            <div class="form-group">
            <input type="text" class="form-control" id="salary" placeholder="Lương theo ngày">
            <span id="salary-al"></span>
            </div>
            `
    } else if (kind == 'customer') {
        content = `
            <div class="form-group">
            <input type="text" class="form-control" id="company" placeholder="Công ty">
            <span id="company-al"></span>
            </div>
            <div class="form-group">
            <input type="text" class="form-control" id="bill" placeholder="Giá trị hóa đơn">
            <span id="bill-al"></span>
            </div>
            <div class="form-group">
            <input type="text" class="form-control" id="rating" placeholder="Đánh giá">
            <span id="rating-al"></span>
            </div>
            `
    }

    getELE("list").innerHTML = content;
}

function addObject() {
    var isValid = true;

    var id = getELE("id").value;
    var name = getELE("name").value;
    var email = getELE("email").value;
    var address = getELE("address").value;
    var kind = getELE("kind").value;
    if (kind == 'student') {
        var maths = getELE("maths").value;
        var physics = getELE("physics").value;
        var chemistry = getELE("chemistry").value;
        isValid &= validation.checkEmpty(maths, "maths-al", "Điểm toán không được để trống");
        isValid &= validation.checkEmpty(physics, "physics-al", "Điểm lý không được để trống");
        isValid &= validation.checkEmpty(chemistry, "chemistry-al", "Điểm hóa không được để trống");
    } else if (kind == 'teacher') {
        var workDay = getELE("workDay").value;
        var salary = getELE("salary").value;
        isValid &= validation.checkEmpty(salary, "salary-al", "Lương không được để trống");
        isValid &= validation.checkEmpty(workDay, "workDay-al", "Lương không được để trống");

    } else if (kind == 'customer') {
        var company = getELE("company").value;
        var bill = getELE("bill").value;
        var rating = getELE("rating").value;
        isValid &= validation.checkEmpty(company, "company-al", "Tên công ty không được để trống");
        isValid &= validation.checkEmpty(bill, "bill-al", "Hóa đơn không được để trống") ;
        isValid &= validation.checkEmpty(rating, "rating-al", "Đánh giá không được để trống");
    }

    isValid &= validation.checkEmpty(id, "id-al", "Tài khoản không được để trống");
    isValid &= validation.checkEmpty(name, "name-al", "Tên nhân viên không được để trống");
    isValid &= validation.checkEmpty(email, "email-al", "Email không được để trống");
    isValid &= validation.checkEmpty(address, "address-al", "Mật khẩu không được để trống");



    if (isValid) {
        if (kind == 'student') {
            var person = new Student(Number(maths), Number(physics), Number(chemistry), name, address, id, email, kind);
            person.getAverage();

            perList.addPerson(person);
            showTable(perList.perArr);
            setLocalStorage(perList.perArr);
            swal({
                title: "More success!",
                icon: "success",
                timer: 1000,    
              });

        } else if (kind == 'teacher') {
            var person = new Teacher(Number(workDay), Number(salary), name, address, id, email, kind);
            person.getSumSal();

            perList.addPerson(person);
            showTable(perList.perArr);
            setLocalStorage(perList.perArr);
            swal({
                title: "More success!",
                icon: "success",
                timer: 1000,    
              });
        } else if (kind == 'customer') {
            var person = new Customer(company, bill, rating, name, address, id, email, kind);
            perList.addPerson(person);
            showTable(perList.perArr);
            setLocalStorage(perList.perArr);
            swal({
                title: "More success!",
                icon: "success",
                timer: 1000,    
              });
        }
        getELE("btnClose").click();
    }



}

getELE("btnAddOn").onclick = addObject;

function seeAble() {
    getELE("id").disabled = false;
    getELE("btnUpdate").style.display = 'none';
    getELE('addobj').reset();

}

getELE("btnAdd").addEventListener('click', () => { seeAble() })


function detail(id) {
    getELE("btnUpdate").style.display = 'block';

    var index = perList.findIndexPerson(id);
    if (index != -1) {

        getELE("id").value = perList.perArr[index].id;
        getELE("id").disabled = true;
        getELE("name").value = perList.perArr[index].name;
        getELE("email").value = perList.perArr[index].email;
        getELE("address").value = perList.perArr[index].address;
        getELE("kind").value = perList.perArr[index].kind;

        const kind = getELE("kind").value;
        changeInput(kind);

        if (kind == 'student') {
            getELE("maths").value = perList.perArr[index].maths;
            getELE("physics").value = perList.perArr[index].physics;
            getELE("chemistry").value = perList.perArr[index].chemistry;
        } else if (kind == 'teacher') {
            getELE("workDay").value = perList.perArr[index].workDay;
            getELE("salary").value = perList.perArr[index].salary;
        } else if (kind == 'customer') {
            getELE("company").value = perList.perArr[index].company;
            getELE("bill").value = perList.perArr[index].bill;
            getELE("rating").value = perList.perArr[index].rating;
        }

    }
    setLocalStorage(perList.perArr);
    getLocalStorage()

}

window.detail = detail;

function update() {
    var isValid = true;

    var id = getELE("id").value;
    var name = getELE("name").value;
    var email = getELE("email").value;
    var address = getELE("address").value;
    var kind = getELE("kind").value;
    if (kind == 'student') {
        var maths = getELE("maths").value;
        var physics = getELE("physics").value;
        var chemistry = getELE("chemistry").value;
        isValid &= validation.checkEmpty(maths, "maths-al", "Điểm toán không được để trống");
        isValid &= validation.checkEmpty(physics, "physics-al", "Điểm lý không được để trống");
        isValid &= validation.checkEmpty(chemistry, "chemistry-al", "Điểm hóa không được để trống");
    } else if (kind == 'teacher') {
        var workDay = getELE("workDay").value;
        var salary = getELE("salary").value;
        isValid &= validation.checkEmpty(salary, "salary-al", "Lương không được để trống");
        isValid &= validation.checkEmpty(workDay, "workDay-al", "Lương không được để trống");

    } else if (kind == 'customer') {
        var company = getELE("company").value;
        var bill = getELE("bill").value;
        var rating = getELE("rating").value;
        isValid &= validation.checkEmpty(company, "company-al", "Tên công ty không được để trống");
        isValid &= validation.checkEmpty(bill, "bill-al", "Hóa đơn không được để trống");
        isValid &= validation.checkEmpty(rating, "rating-al", "Đánh giá không được để trống");
    }

    isValid &= validation.checkEmpty(id, "id-al", "Tài khoản không được để trống");
    isValid &= validation.checkEmpty(name, "name-al", "Tên nhân viên không được để trống") && validation.checkName(name, "name-al", "Tên nhân viên không hợp lệ");
    isValid &= validation.checkEmpty(email, "email-al", "Email không được để trống") && validation.checkEmail(email, "email-al", "Email không hợp lệ");
    isValid &= validation.checkEmpty(address, "address-al", "Mật khẩu không được để trống");

    if (isValid) {
        if (kind == 'student') {
            var person = new Student(Number(maths), Number(physics), Number(chemistry), name, address, id, email, kind);
            person.getAverage();

            perList.updatePerson(person);
            setLocalStorage(perList.perArr);
            getLocalStorage();


        } else if (kind == 'teacher') {
            var person = new Teacher(Number(workDay), Number(salary), name, address, id, email, kind);
            person.getSalc();

            perList.updatePerson(person);
            setLocalStorage(perList.perArr);
            getLocalStorage();

        } else if (kind == 'customer') {
            var person = new Customer(company, bill, rating, name, address, id, email, kind);
            perList.updatePerson(person);
            setLocalStorage(perList.perArr);
            getLocalStorage();

        }
        getELE("btnClose").click();
        swal({
            title: "Update successful!",
            icon: "success",
            timer: 1000,    
          });
    }

}

getELE("btnUpdate").addEventListener('click', () => { update() })


function deletePer(id) {
    perList.delPerson(id);
    setLocalStorage(perList.perArr);
    getLocalStorage()
    swal({
        title: "Delete successful!",
        icon: "success",
        timer: 1000,    
      });
}

window.deletePer = deletePer;

function search() {
    var keyword = getELE("searchName").value;
    var mangKQ = perList.searchName(keyword);
    showTable(mangKQ);
}

getELE("btnFindName").onclick = search;

getELE("searchName").onkeyup = function () {
    var keyword = getELE("searchName").value;
    var mangKQ = perList.searchName(keyword);
    showTable(mangKQ);
};

getELE("sort-ins").addEventListener('click', () => {
    perList.perArr.sort(function (a, b) {
        let fa = a.name.toLowerCase().split(' ').slice(-1).join(' ');
        let fb = b.name.toLowerCase().split(' ').slice(-1).join(' ');

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    })
    showTable(perList.perArr);
});

getELE("sort-dec").addEventListener('click', () => {
    perList.perArr.sort(function (a, b) {
        let fa = a.name.toLowerCase().split(' ').slice(-1).join(' ');
        let fb = b.name.toLowerCase().split(' ').slice(-1).join(' ');
        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
    })
    showTable(perList.perArr);
});

getELE("type").addEventListener('change', () => {
    const type = getELE("type").value;

    let filterData =
        type == "doiTuong" ? perList.perArr : perList.perArr.filter((ele) => ele.kind == type);

    showTable(filterData);
})

function averageStu(id) {
    var person = (perList.perArr[perList.findIndexPerson(id)]);
    swal({
        title:"Điểm trung bình của " + person.name + " là " + person.average.toFixed(2),
        icon: "success",
        timer: 2000,    
      });
}
window.averageStu = averageStu;

function salTeacher(id) {
    var person = (perList.perArr[perList.findIndexPerson(id)]);
    swal({
        title: "Lương của " + person.name + " là " + person.salary.toLocaleString() + " VNĐ",
        icon: "success",
        timer: 2000,    
      });
}
window.salTeacher = salTeacher;