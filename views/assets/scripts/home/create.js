const loadSpinner = $("#loading");
const weekForm = $("#week-form");
const dateForm = $("#date-form");

$(function() {
    initDateTime();
    showOnlyArea();
});

$("#typeSelect").change(function() {
    const selected = $("#typeSelect").val();
    showArea(selected);
});

$("#funitureSelect").change(function() {
    modFuni()
});

$("#statusSelect").change(function() {
    modFuni()
});

$("#fbtn").click(function () { 
    $("#datetime").val($("#date").val() + " " + $("#time").val());
    $("form").submit();
});

function showArea(mode) {
    initDateTime();
    switch (mode) {
        case "1":
            showOnlyArea();
            break;

        case "2":
            showWeekArea();
            break;
    
        default:
            break;
    }
}

function showOnlyArea() {
    onOffCss(loadSpinner, true);
    onOffCss(weekForm, false);
    onOffCss(dateForm, true);
    onOffCss(loadSpinner, false);
}

function showWeekArea() {
    onOffCss(loadSpinner, true);
    onOffCss(weekForm, true);
    onOffCss(dateForm, false);
    onOffCss(loadSpinner, false);
}

function onOffCss(element, flag) {
    if (flag) {
        element.css("display", "block");
        return;
    }
    element.css("display", "none");
}

function initDateTime() {
    $("#date").attr("min", getNowDate());
    $("#date").val(getNowDate());
    $("#time").val(getNowTime());
}

function getNowDate() {
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    return `${yyyy}-${mm}-${dd}`;
}

function getNowTime() {
    const now = new Date();
    let HH = now.getHours();
    let MM = now.getMinutes();
    if (HH < 10) HH = '0' + HH;
    if (MM < 10) MM = '0' + MM;
    return `${HH}:${MM}`;
}

function modFuni() {
    let f_selected = $("#funitureSelect").val();
    const s_selected = $("#statusSelect").val();
    $("#funiture").val(f_selected);
    if (f_selected+s_selected=="cooler:off") {
        f_selected = "aircon";
    } else if (f_selected+s_selected=="aircon:on") {
        f_selected = "cooler";
    }
    $('#command').val(f_selected+s_selected);
}
