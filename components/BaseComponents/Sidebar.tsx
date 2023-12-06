import { Layout, SiderProps } from 'antd'

const { Sider: AntDSidebar } = Layout

export function Sidebar(props: SiderProps) {
	return <AntDSidebar {...props} />
}
