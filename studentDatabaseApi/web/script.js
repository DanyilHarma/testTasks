document.getElementById('add-student-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const student = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        patronymic: document.getElementById('patronymic').value,
        birthDate: document.getElementById('birthDate').value,
        groupName: document.getElementById('groupName').value
    };

    fetch('http://localhost:8080/addStudent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
        .then(response => {
            if (response.ok) {
                alert('Студент добавлен успешно!');
                document.getElementById('add-student-form').reset();
                loadStudents();  // обновляем список студентов после добавления
            } else {
                alert('Ошибка при добавлении студента.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при добавлении студента.');
        });
});

document.getElementById('list-students-button').addEventListener('click', loadStudents);

function loadStudents() {
    fetch('http://localhost:8080/listStudents')
        .then(response => response.json())
        .then(data => {
            const studentsList = document.getElementById('students-list');
            studentsList.innerHTML = '';

            data.forEach(student => {
                const listItem = document.createElement('li');
                listItem.textContent = `${student.surname} ${student.name} ${student.patronymic}, ${student.groupName} --- Дата Рождения:${student.birthDate}`;


                const deleteButton = document.createElement('button');
                deleteButton.classList.add("deleteButton")
                deleteButton.textContent = 'Удалить';
                deleteButton.addEventListener('click', function () {
                    deleteStudent(student.studentId);
                });

                listItem.appendChild(deleteButton);
                studentsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при получении списка студентов.');
        });
}

function deleteStudent(studentId) {
    fetch(`http://localhost:8080/deleteStudent?studentId=${studentId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                alert('Студент удалён успешно!');
                loadStudents();
            } else {
                alert('Ошибка при удалении студента.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при удалении студента.');
        });
}
