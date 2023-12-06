import React from 'react'
import { Form } from 'antd'
import { Input, Textarea } from '@/components/BaseComponents'

export function ChapterForm ({ numberOfForms = [1] }) {
	// Note: order of fields starts at 0, so chapter 1 is index 0
  return numberOfForms.map((_, id) =>
			<React.Fragment key={id}>
				<h3>Chapter {id + 1}</h3>
				<Form.Item
					name={`name-${id}`}
					htmlFor="name"
					label="Name"
					rules={[{ required: true, message: 'Please input your name' }]}
				>
					<Input placeholder="Prologue" />
				</Form.Item>
				<Form.Item
					name={`description-${id}`}
					htmlFor="description"
					label='Description'
					rules={[{ required: true, message: 'Please input your description' }]}
				>
					<Textarea placeholder="It was a dark and stormy night..." />
				</Form.Item>
				<Form.Item name={`details-${id}`} htmlFor="details" label='Hints / Details'>
					<Textarea placeholder="What color are the mesquite pods?" />
				</Form.Item>
				<Form.Item name={`passcode-${id}`} htmlFor='inviteCode' label="Passcode">
					<Input />
				</Form.Item>
				<Form.Item
					name={`secretText-${id}`}
					htmlFor="secrettext"
					label='Secret text'
					rules={[{ required: true, message: 'Please input your secret text' }]}
				>
					<Textarea placeholder="And the rabbit said, 'I'm late!' Next chapter, we'll find where the rabbit went." />
				</Form.Item>
			</React.Fragment>
		)
}
