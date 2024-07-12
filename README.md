# Task Management Board

A task management application that allows users to create, edit, delete, and manage tasks. The application supports
drag-and-drop functionality to move tasks between different statuses and offers filtering options to help users focus on
specific tasks.

## Features

- **Create, Edit, and Delete Tasks**: Manage your tasks with ease by adding new tasks, editing existing ones, and
  deleting tasks that are no longer needed.
- **Drag-and-Drop**: Easily move tasks between different statuses (To Do, In Progress, Completed) by dragging and
  dropping.
- **Task Filtering**: Filter tasks based on assigned team member, due date, or priority level to focus on specific
  tasks.
- **Data Persistence**: Tasks and filters are saved to `localStorage` to ensure data persistence across sessions.
- **Accessibility**: Provides appropriate alt text for images, keyboard navigation support, and ensures sufficient color
  contrast for users with visual impairments.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **React Hook Form**: A performant, flexible and extensible forms with easy-to-use validation.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Strla/task-management-board.git
    cd task-management-board
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Run tests:
    ```bash
    npm run test
    ```

## Usage

1. **Add a Task**:
    - Click the "+ Add Task" button.
    - Fill in the task details in the modal that appears.
    - Click "Add Task" to save.

2. **Edit a Task**:
    - Click the "Edit" button on a task.
    - Update the task details in the modal that appears.
    - Click "Save Changes" to update.

3. **Delete a Task**:
    - Click the "Delete" button on a task.
    - Confirm the deletion in the modal that appears.

4. **Move a Task**:
    - Drag a task card to the desired status column (To Do, In Progress, Completed).

5. **Filter Tasks**:
    - Use the dropdowns and date input in the filter section to filter tasks by assigned team member, priority, or due
      date.
    - Click "Apply" to apply filters or "Reset" to clear all filters.

## Project Structure

```bash
src/
├── app/
│ └── store.ts # Redux store configuration
├── components/
│ ├── Button.tsx # Button component
│ ├── ConfirmationModal.tsx # Confirmation modal component
│ ├── Modal.tsx # Generic modal component
│ ├── Task.tsx # Task component
│ ├── TaskBoard.tsx # Task board component
│ ├── TaskDetails.tsx # Task details modal component
│ ├── TaskFilter.tsx # Task filter component
│ ├── TaskForm.tsx # Task form component
│ └── TaskList.tsx # Task list component
├── constants/
│ └── index.ts # Application constants (e.g., TaskStatus, Priority, etc.)
├── features/
│ ├── dragging/ # Dragging slice
│ ├── modals/ # Modals slice
│ └── tasks/ # Tasks slice
├── hooks/
│ ├── useDrag.ts # Custom hook for drag-and-drop functionality
│ ├── useModal.ts # Custom hook for modal state management
│ ├── useTaskForm.ts # Custom hook for task form handling
│ ├── useTasks.ts # Custom hook for tasks handling
│ └── useTypedSelector.ts # Custom hook for typed useSelector
├── utils/
│ ├── localStorage.ts # Utility functions for localStorage
│ └── validationRules.ts # Form validation rules
└── main.tsx # Application entry point
```

## Testing

The project uses Jest for testing. Test cases cover various functionalities, including task creation, editing, deletion,
and data persistence.