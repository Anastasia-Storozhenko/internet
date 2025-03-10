document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("students-modal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");
    const studentTable = document.querySelector("#student-table tbody");
    const createBtn = document.getElementById("create-btn");
    const cancBtn = document.getElementById("canc-btn");
    const headerCheckbox = document.querySelector("#student-table thead input[type='checkbox']");


    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const groupSelect = document.getElementById("group");
    const genderSelect = document.getElementById("gender");
    const birthdayInput = document.getElementById("birthday");
    const titleModal=document.getElementById("titleModal");

    openModalBtn.addEventListener("click", function () {
        modal.classList.add("active");
        createBtn.textContent = "Create";
        titleModal.textContent="Add student";
        modal.currentRow = null;
    });


    

    closeModalBtn.addEventListener("click", function () {
        modal.classList.remove("active");
        resetForm();
    });


    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("active");
            resetForm();
        }
    });

    cancBtn.addEventListener("click", function() {
        const group = groupSelect.value.trim();
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const gender = genderSelect.value.trim();
        const birthday = birthdayInput.value.trim();
    
        if (!group || !firstName || !lastName || !gender || !birthday) {
            modal.classList.remove("active");
            resetForm();
            return;
        }

        if (createBtn.textContent === "Create") {
            addStudent();
        } else if (createBtn.textContent === "Save") {
            updateStudent();
        }
    });

    createBtn.addEventListener("click", function () {
        if (createBtn.textContent === "Create") {
            addStudent();
        } else if (createBtn.textContent === "Save") {
            updateStudent();
        }
    });

    headerCheckbox.addEventListener("change", function() {
        const allCheckboxes = studentTable.querySelectorAll(".studentCheckbox");
        const isChecked = this.checked; // Отримуємо стан головного чекбоксу
    
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
            toggleRowButtons(checkbox); // Вмикаємо/вимикаємо кнопки у рядках
        });
    });
    

  

    function addStudent() {
        const group = groupSelect.value;
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const gender = genderSelect.value;
        const birthday = birthdayInput.value;

        if (!group || !firstName || !lastName || !gender || !birthday) {
            alert("Будь ласка, заповніть усі поля!");
            return;
        }

        const newRow = studentTable.insertRow();

        const isTargetStudent = firstName.trim().toUpperCase() === "ROMEO";

        const statusIcon = isTargetStudent
        ? '<div style="display: flex; justify-content: left; align-items: center; width: 100%; height: 100%;">' +
          '<div style="width: 20px; height: 20px; background-color: green; border-radius: 50%;"></div>' +
          '</div>'
        : '<div style="display: flex; justify-content: left; align-items: left; width: 100%; height: 100%;">' +
          '<div style="width: 20px; height: 20px; background-color: gray; border-radius: 50%;"></div>' +
          '</div>';

        newRow.innerHTML = `
            <td><input type="checkbox" class="studentCheckbox" onchange="toggleRowButtons(this)"></td>
            <td>${group}</td>
            <td>${firstName} ${lastName}</td>
            <td>${gender}</td>
            <td>${birthday}</td>
            <td>${statusIcon}</td>
            <td>
                <button class="editBtn" onclick="editRow(this)" disabled>
                    <img src="./img/pencil.png" alt="Edit" width="20">
                </button>
                <button class="cancelBtn" onclick="deleteRow(this)" disabled>
                    <img src="./img/cancel.png" alt="Delete" width="20">
                </button>
            </td>
        `;

        modal.classList.remove("active");
        resetForm();
    }

    window.editRow = function(button) {
        const row = button.closest('tr');
        const cells = row.getElementsByTagName('td');
        
        groupSelect.value = cells[1].textContent.trim();
        const [firstName, lastName] = cells[2].textContent.trim().split(' ');
        firstNameInput.value = firstName || '';
        lastNameInput.value = lastName || '';
        genderSelect.value = cells[3].textContent.trim();
        birthdayInput.value = cells[4].textContent.trim();

        createBtn.textContent = "Save";
        titleModal.textContent="Edit Student";
        modal.currentRow = row;
        
        modal.classList.add("active");
    }

    function updateStudent() {
        const group = groupSelect.value;
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const gender = genderSelect.value;
        const birthday = birthdayInput.value;

        if (!group || !firstName || !lastName || !gender || !birthday) {
            alert("Будь ласка, заповніть усі поля!");
            return;
        }

        const row = modal.currentRow;
        if (!row) {
            alert('Помилка: не вибрано рядок для оновлення');
            return;
        }

        row.cells[1].textContent = group;
        row.cells[2].textContent = `${firstName} ${lastName}`;
        row.cells[3].textContent = gender;
        row.cells[4].textContent = birthday;

        const isTargetStudent = firstName.trim().toUpperCase() === "ANASTASIIA" &&
        lastName.trim().toUpperCase() === "STOROZHENKO";

        row.cells[5].innerHTML = isTargetStudent
        ? '<div style="display: flex; justify-content: left; align-items: center; height: 100%;">' +
        '<div style="width: 20px; height: 20px; background-color: green; border-radius: 50%;"></div>' +
        '</div>'
        : '<div style="display: flex; justify-content: left; align-items: center; height: 100%;">' +
        '<div style="width: 20px; height: 20px; background-color: gray; border-radius: 50%;"></div>' +
        '</div>';

        modal.classList.remove("active");
        resetForm();
    }

    function resetForm() {
        groupSelect.value = "";
        firstNameInput.value = "";
        lastNameInput.value = "";
        genderSelect.value = "";
        birthdayInput.value = "";
        createBtn.textContent = "Create";
        titleModal.textContent="Add student";
        modal.currentRow = null;
    }

  


    window.deleteRow = function() {
        const checkedRows = document.querySelectorAll('.studentCheckbox:checked');
        
        if (checkedRows.length === 0) {
            alert('Будь ласка, виберіть хоча б одного студента для видалення');
            return;
        }
        let studentNames = [];
        checkedRows.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const studentName = row.querySelector('td:nth-child(3)')?.textContent.trim() || 'Error';
        studentNames.push(studentName);
    });
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="delmodal-close" id="delcloseModal">
                    <img src="./img/close.png" alt="close">
                </span>
                <h2>Warning</h2>
                <p>Are you sure you want to delete user ${studentNames.join(', ')}?</p>
                <div class="modal-buttons">
                    <button id="cancelBtn">Cancel</button>
                    <button id="okBtn">OK</button>
                </div>
            </div>
        `;
        
        const styles = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .modal-content {
                background: white;
                padding: 30px;
                border-radius: 10px;
                min-width: 500px;
                min-height: 350px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .delmodal-close {
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
                width: 24px;
                height: 24px;
                margin-right: 15px;
                 margin-top: 20px;
            }
            .delmodal-close:hover {
                opacity: 0.7;
            }
            .modal-buttons {
                margin-top: 20px;
                display: flex;
                justify-content: flex-end;
                gap: 20px;
            }
            .modal-buttons button {
                padding: 8px 16px;
                cursor: pointer;
                border-radius: 10%;
                background-color: #efa2db;
                 border-radius: 10%;
                color: black;
                transition: background-color 0.3s ease;
            }
            .modal-buttons button:hover {
                background-color: #f7b8e3;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(modal);
        
        // Обробник для кнопки закриття
        document.getElementById('delcloseModal').onclick = function() {
            document.body.removeChild(modal);
        };
        
        // Обробник для Cancel
        document.getElementById('cancelBtn').onclick = function() {
            document.body.removeChild(modal);
        };
        
        // Обробник для OK
        document.getElementById('okBtn').onclick = function() {
            checkedRows.forEach(checkbox => {
                const row = checkbox.closest('tr');
                if (modal.currentRow === row) {
                    modal.currentRow = null;
                }
                row.remove();
            });
            updateHeaderCheckbox();
            document.body.removeChild(modal);
        };
    }
        
        

    // Нова функція для управління кнопками рядка
    window.toggleRowButtons = function(checkbox) {
        const row = checkbox.closest('tr');
        const editBtn = row.querySelector('.editBtn');
        const deleteBtn = row.querySelector('.cancelBtn');
        
        editBtn.disabled = !checkbox.checked;
        deleteBtn.disabled = !checkbox.checked;
        
        updateHeaderCheckbox();
    }

    // Оновлення стану чекбокса в заголовку
    function updateHeaderCheckbox() {
        const allCheckboxes = studentTable.querySelectorAll('.studentCheckbox');
        const checkedCount = Array.from(allCheckboxes).filter(cb => cb.checked).length;
        
        if (checkedCount === 0) {
            headerCheckbox.checked = false;
            headerCheckbox.indeterminate = false;
        } else if (checkedCount === allCheckboxes.length) {
            headerCheckbox.checked = true;
            headerCheckbox.indeterminate = false;
        } else {
            headerCheckbox.checked = false;
            headerCheckbox.indeterminate = true;
        }
    }

    // Функція для масового видалення (можна викликати з окремої кнопки)
    window.deleteAllSelected = function() {
        const selectedRows = studentTable.querySelectorAll('.studentCheckbox:checked');
    
        if (selectedRows.length === 0) {
            alert('Будь ласка, виберіть хоча б одного студента');
            return;
        }
    
        const confirmMessage = selectedRows.length === studentTable.querySelectorAll('.studentCheckbox').length 
            ? 'Ви впевнені, що хочете видалити всіх студентів?'
            : `Видалити ${selectedRows.length} вибраних студентів?`;
    
        if (confirm(confirmMessage)) {
            selectedRows.forEach(checkbox => {
                const row = checkbox.closest('tr');
                if (modal.currentRow === row) {
                    modal.currentRow = null;
                }
                row.remove();
            });
    
            updateHeaderCheckbox();
        }
    }

  
  
  
    // Отримуємо елемент дзвіночка
const bellLink = document.querySelector('.notification-bell');
const dot = document.querySelector('.notification-dot');

// Функція для перемикання сповіщення
function toggleNotification(event) {
    event.preventDefault(); // Запобігаємо переходу по посиланню при подвійному кліку
    dot.classList.toggle('active');
}

// Показуємо сповіщення через 2 секунди після завантаження сторінки
window.addEventListener('load', function() {
    setTimeout(function() {
        dot.classList.add('active');
    }, 2000); // 2000 мс = 2 секунди
});

// Додаємо обробники подій
bellLink.addEventListener('dblclick', toggleNotification);

// Залишаємо одинарний клік для переходу по посиланню
bellLink.addEventListener('click', function(event) {
    // Нічого не робимо додатково, посилання спрацює автоматично
});

document.querySelector('.notification-bell').addEventListener('mouseover', function() {
    this.querySelector('.popup').style.display = 'block';
});

document.querySelector('.notification-bell').addEventListener('mouseout', function() {
    this.querySelector('.popup').style.display = 'none';
});

document.querySelector('.user-block').addEventListener('mouseover', function() {
    this.querySelector('.popup-ava').style.display = 'block';
});

document.querySelector('.user-block').addEventListener('mouseout', function() {
    this.querySelector('.popup-ava').style.display = 'none';
});

});    