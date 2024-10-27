function getTasks(url, data, successCallback) {
    $.ajax({
        url: url,
        method: "GET",
        data: data,
        success: function (response) {
            console.log(response);
            successCallback(response)
        },
        error: function (error) {
            console.error("Ошибка при получении данных:", error);
        }
    });
}

function updateTaskByDate(from, to, successCallback) {
    getTasks("http://localhost:3001/api/todos/date", { from, to }, successCallback)
};