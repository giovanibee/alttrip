import Button from '../BaseComponents/Button'
import { Task } from '../types'
// import { create } from 'zustand'

export default function TodoList() {
	const todoList: Task[] = [] // get todoList from some state management and not from props
	const todos = todoList.map((todo) => {
		return (
			<div className="todo-component" key={todo.id}>
				<input type="checkbox" checked={todo.completed} />
				<span>{todo.title}</span>
			</div>
		)
	})
	return (
		<>
			{todos}
			<Button id="button-add-task">+ add task</Button>
		</>
	)
}
