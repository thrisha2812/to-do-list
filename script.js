document.addEventListener('DOMContentLoaded', () => {
    // Select the input field where the user types their task
    const taskInput = document.getElementById('task-input');
    // Select the button that adds the task
    const addTaskBtn = document.getElementById('add-task-btn');
    // Select the list where tasks will be displayed
    const taskList = document.getElementById('task-list');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');

    const runConfetti = () => {
        const count = 200,
            defaults = {
                origin: { y: 0.7 },
            };

        function fire(particleRatio, opts) {
            confetti(
                Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                })
            );
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    const updateProgress = () => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
        
        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumbers.textContent = `${completedTasks}/${totalTasks}`;
        
        // Trigger confetti when all tasks are complete
        if (totalTasks > 0 && completedTasks === totalTasks) {
            runConfetti();
        }
    };

    const addTask = (event, text, completed = false) => {
        if (event) {
            event.preventDefault();
        }
        
        const taskText = text || taskInput.value.trim();

        if (!taskText) {
            return;
        }

        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
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
            updateProgress();
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                updateProgress();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            updateProgress();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        updateProgress();
    };

    addTaskBtn.addEventListener('click', (event) => addTask(event));

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }
    });

    updateProgress();
});