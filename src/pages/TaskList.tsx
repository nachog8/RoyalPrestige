import React, { useState } from 'react'
import { CheckSquare, Plus } from 'lucide-react'

interface Task {
  id: number
  title: string
  completed: boolean
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete project proposal', completed: false },
    { id: 2, title: 'Review team member submissions', completed: true },
    { id: 3, title: 'Prepare for client meeting', completed: false },
  ])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
          onClick={addTask}
        >
          <Plus />
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li
            key={task.id}
            className={`flex items-center p-2 border rounded ${task.completed ? 'bg-green-100' : ''}`}
          >
            <CheckSquare
              className={`mr-2 cursor-pointer ${task.completed ? 'text-green-500' : 'text-gray-400'}`}
              onClick={() => toggleTask(task.id)}
            />
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList