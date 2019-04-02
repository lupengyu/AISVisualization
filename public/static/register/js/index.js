var school = 0;
var grade = 0;

$(function () {
    if ($("#school").find("option:selected").text() == "请选择") {
        $("#grade").hide();
        $("#class").hide();
    }
})


function shcoolcheck(o) {
    if (o.value != "default") {
        $("#grade").show();
        if(o.value == 'air') {
            school = 1;
        }
        else if(o.value == 'software') {
            school = 14;
        }
    } else {
        $("#grade").hide();
        $("#class").hide();
        grade = 0;
        school = 0;
    }

}

function gradecheck(o) {
    if (o.value != "default") {
        $("#class").show();
        if (o.value == "13") {
            grade = 1;
            if (school == 1) {
                $(".air.g13").siblings().hide();
                $(".air.g13").show();
                $(".air.g13").first().attr("selected", true);
            }
            else if (school == 14) {
                $(".software.g13").siblings().hide();
                $(".software.g13").show();
                $(".software.g13").first().attr("selected", true);
            }
        } else if (o.value == "14") {
            grade = 2;
            if (school == 1) {
                $(".air.g14").siblings().hide();
                $(".air.g14").show();
                $(".air.g14").first().attr("selected", true);
            }
            else if (school == 14) {
                $(".software.g14").siblings().hide();
                $(".software.g14").show();
                $(".software.g14").first().attr("selected", true);
            }
        } else if (o.value == "15") {
            grade = 3;
            if (school == 1) {
                $(".air.g15").siblings().hide();
                $(".air.g15").show();
                $(".air.g15").first().attr("selected", true);
            }
            else if (school == 14) {
                $(".software.g15").siblings().hide();
                $(".software.g15").show();
                $(".software.g15").first().attr("selected", true);
            }
        } else if (o.value == "16") {
            grade = 4;
            if (school == 1) {
                $(".air.g16").siblings().hide();
                $(".air.g16").show();
                $(".air.g16").first().attr("selected", true);
            }
            else if (school == 14) {
                $(".software.g16").siblings().hide();
                $(".software.g16").show();
                $(".software.g16").first().attr("selected", true);
            }
        }
    } else {
        $("#class").hide();
        grade = 0;
    }
}