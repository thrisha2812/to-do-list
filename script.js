document.addEventListener('DOMContentLoaded', () => {
    // Select the input field where the user types their task
    const taskInput = document.getElementById('task-input');
    // Select the button that adds the task
    const addTaskBtn = document.getElementById('add-task-btn');
    // Select the list where tasks will be displayed
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    const addTask = (event) => {
        // Prevent the default form submission behavior (if it's in a form)
        event.preventDefault();

        // Get the trimmed value from the input field
        const taskText = taskInput.value.trim();

        // If the input is empty, do nothing
        if (!taskText) {
            return;
        }

        // Create a new list item element
        const li = document.createElement('li');

        // Set the inner HTML for the list item
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <div class="task-buttons">
             <button class="edit-btn"><i
             class="fa-solid fa-pen"></i></button>
             <button class="delete-btn"><i
             class="fa-solid fa-trash"></i></button>
            </div> 

        `;

        // Append the new list item to the task list
        taskList.appendChild(li);

        // Clear the input field for the next task
        taskInput.value = '';
    };

    // Add a click event listener to the "add task" button
    addTaskBtn.addEventListener('click', addTask);

    // Add a keypress event listener to the input field itself
    taskInput.addEventListener('keypress', (e) => {
        // Check if the pressed key is 'Enter'
        if (e.key === 'Enter') {
            addTask(e);
        }
    });
});