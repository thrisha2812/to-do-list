document.addEventListener('DOMContentLoaded', () => {
    // Select the input field where the user types their task
    const taskInput = document.getElementById('task-input');
    // Select the button that adds the task
    const addTaskBtn = document.getElementById('add-task-btn');
    // Select the list where tasks will be displayed
    const taskList = document.getElementById('task-list');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');

    const updateProgress = () => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
        
        // Corrected spelling of 'completedTasks'
        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumbers.textContent = `${completedTasks}/${totalTasks}`;
    };

    // Function to add a new task
    const addTask = (event, text, completed = false) => {
        // Prevent form submission if an event is passed
        if (event) {
            event.preventDefault();
        }
        
        const taskText = text || taskInput.value.trim();

        if (!taskText) {
            return;
        }

        const li = document.createElement('li');

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
        
        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress(); // Call updateProgress after state change
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                updateProgress(); // Call updateProgress after task removal
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            updateProgress(); // Call updateProgress after task removal
        });

        taskList.appendChild(li);
        taskInput.value = '';
        updateProgress(); // Call updateProgress after adding a new task
    };

    addTaskBtn.addEventListener('click', (event) => addTask(event));

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }
    });

    // You may want to call updateProgress once on load to initialize it
    updateProgress();
});