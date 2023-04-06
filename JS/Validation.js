function Validation() {
    this.checkEmpty = function (valueInput, spanId, message) {
        if (valueInput == "") {
            document.getElementById(spanId).style.display = "block";
            document.getElementById(spanId).innerHTML = message;

            return false;
        }
        document.getElementById(spanId).style.display = "none";
        document.getElementById(spanId).innerHTML = "";
        return true;
    }

    this.checkID = function (valueInput, spanId, message, empArr) {
        var isExsist = false;
        isExsist = empArr.some(function (emp) {
            return valueInput === emp.acc
        })

        if (isExsist) {
            document.getElementById(spanId).style.display = "block";
            document.getElementById(spanId).innerHTML = message;

            return false;
        } else {
            document.getElementById(spanId).style.display = "none";
            document.getElementById(spanId).innerHTML = "";
            return true;
        }
    }

    this.checkAcc = function (valueInput, spanId, message) {

        if (valueInput.length >= 4 && valueInput.length <= 6) {
            document.getElementById(spanId).style.display = "none";
            document.getElementById(spanId).innerHTML = "";
            return true;

        } else {
            document.getElementById(spanId).style.display = "block";
            document.getElementById(spanId).innerHTML = message;
            return false;

        }

    }

    this.checkName = function (valueInput, spanId, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (valueInput.match(pattern)) {
            document.getElementById(spanId).style.display = "none";
            document.getElementById(spanId).innerHTML = "";
            return true;

        } else {
            document.getElementById(spanId).style.display = "block";
            document.getElementById(spanId).innerHTML = message;
            return false;

        }

    }

    this.checkEmail = function (valueInput, spanId, message) {
        var patternString = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (valueInput.match(patternString)) {

            document.getElementById(spanId).style.display = "none";
            document.getElementById(spanId).innerHTML = "";
            return true;

        } else {

            document.getElementById(spanId).style.display = "block";
            document.getElementById(spanId).innerHTML = message;
            return false;

        }

    }


    this.checkSelect = function (selectID, spanId, message) {
        var indexOption = document.getElementById(selectID).selectedIndex;

        if (indexOption != 0) {

            document.getElementById(spanId).style.display = "none";
            document.getElementById(spanId).innerHTML = "";
            return true;

        } else {
            document.getElementById(spanId).style.display = "block";
            document.getElementById(spanId).innerHTML = message;
            return false;

        }

    }

    this.checkMath = function (valueInput, spanId, message) {

        if (valueInput >= 0 && valueInput <= 10) {
            document.getElementById(spanId).style.display = "none";
            document.getElementById(spanId).innerHTML = "";
            return true;

        } else {
            document.getElementById(spanId).style.display = "block";
            document.getElementById(spanId).innerHTML = message;
            return false;

        }

    }

    this.checkValue = function (valueInput, spanId, message) {

        if (valueInput >= 0) {
            document.getElementById(spanId).style.display = "none";
            document.getElementById(spanId).innerHTML = "";
            return true;

        } else {
            document.getElementById(spanId).style.display = "block";
            document.getElementById(spanId).innerHTML = message;
            return false;

        }

    }
}