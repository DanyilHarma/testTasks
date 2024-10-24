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

function getAllTodo() {
    $.ajax({
        url: "http://localhost:3001/api/todos",
        method: "GET",
        success: function (data) {
            console.log(data)
        },
        error: function (error) {
            console.log(error)
        }
    })
}
getAllTodo()