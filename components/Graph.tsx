import { DataChart } from 'grommet'
import { Task } from '../types'

export default function TodoVisualGraph() {
	const todoList: Task[] = [] // get todoList from some state management and not from props

	return <DataChart data={todoList} />
}
