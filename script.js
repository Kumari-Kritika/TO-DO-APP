document.addEventListener('DOMContentLoaded', () => {
    // Find the form, task input, and task list in the HTML
    const form = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Get saved tasks from local storage, or start with an empty list
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert tasks array to a string and store it
    }

    // Function to display tasks on the page
    function renderTasks() {
        taskList.innerHTML = ''; // Clear the current list of tasks

        // Loop through each task and create a list item for it
        tasks.forEach((task, index) => {
            const li = document.createElement("li"); // Create a new list item
            li.textContent = task.text; // Set the task text

            // Create a "Mark Completed" button
            const completeBtn = document.createElement('button');
            completeBtn.textContent = task.completed ? 'Unmark' : 'Mark Completed'; // Text changes based on task completion

            // Create a "Delete" button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';

            // Add buttons to the list item
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);

            // When the "Mark Completed" button is clicked, toggle task completion
            completeBtn.addEventListener('click', () => {
                task.completed = !task.completed; // Switch between completed and not completed
                saveTasks(); // Save the updated tasks
                renderTasks(); // Re-display the tasks with the new status
            });

            // When the "Delete" button is clicked, remove the task
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1); // Remove the task at the given index
                saveTasks(); // Save the updated tasks
                renderTasks(); // Re-display the updated list
            });
        });
    }

    // When the form is submitted (when a new task is added)
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the page from refreshing

        const taskText = taskInput.value; // Get the input value (new task text)

        if (taskText === '') {
            alert('Please enter a task'); // If the input is empty, show an alert
            return; // Stop here if no task was entered
        }

        // Add the new task to the tasks array
        tasks.push({ text: taskText, completed: false }); // Add new task with "completed" set to false

        saveTasks(); // Save the updated tasks to local storage
        renderTasks(); // Re-display the tasks
        taskInput.value = ''; // Clear the input field for the next task
    });

    // Initial rendering of tasks when the page loads
    renderTasks();
});
