$(document).ready(function () {
    $("#datepicker").datepicker({
        showOtherMonths: false,
        selectOtherMonths: false,
        dateFormat: "dd MM yy",
        showButtonPanel: false,
        firstDay: 1,
        changeMonth: false,
        changeYear: false,
        onSelect: function (dateText) {
            console.log("Вы выбрали дату: " + dateText);
        }
    });
});