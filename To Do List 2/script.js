document.addEventListener('DOMContentLoaded', function () {
    // Initialize task list from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    renderTasks();

    // Event listener for adding a new task
    document.getElementById('taskInput').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task
    window.addTask = function () {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            tasks.push(taskText);
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    // Function to delete a task
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to render tasks on the page
    function renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="deleteBtn" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
});
