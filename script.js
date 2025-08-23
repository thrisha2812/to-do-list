document.addEventListener('DOMContentLoaded', () => {
    // Select the input field where the user types their task
    const taskInput = document.getElementById('task-input');
    // Select the button that adds the task
    const addTaskBtn = document.getElementById('add-task-btn');
    // Select the list where tasks will be displayed
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    const addTask = (event, text, completed = false) => {
        // Prevent the default form submission behavior (if an event is passed)
        if (event) {
            event.preventDefault();
        }

        // Get the trimmed value from the input field
        const taskText = text || taskInput.value.trim();

        // If the input is empty, do nothing
        if (!taskText) {
            return;
        }

        // Create a new list item element
        const li = document.createElement('li');

        // Set the inner HTML for the list item
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ' '}/>
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');
        
        // Apply completed styles on initial creation
        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        // This part is the correct logic for handling completed tasks
        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
        });

        // Append the new list item to the task list
        taskList.appendChild(li);

        // Clear the input field for the next task
        taskInput.value = '';
    };

    // Correctly add a click event listener to the "add task" button
    addTaskBtn.addEventListener('click', (event) => addTask(event));

    // Correctly add a keypress event listener to the input field itself
    taskInput.addEventListener('keypress', (e) => {
        // Check if the pressed key is 'Enter'
        if (e.key === 'Enter') {
            addTask(e);
        }
    });
});