import { FormField, Input, Textarea } from '@/components/BaseComponents';

export default function ChapterForm ({ numberOfForms = [1] }) {
	// Note: order of fields starts at 0, so chapter 1 is index 0
  return numberOfForms.map((_, id) =>
			<div key={id}>
				<h3>Chapter {id + 1}</h3>
				<FormField name={`name-${id}`} htmlFor="name" label="Name">
					<Input
						id={`name-${id}`}
						name={`name-${id}`}
						placeholder="Prologue"
						required
					/>
				</FormField>
				<FormField name={`description-${id}`} htmlFor="description" label='Description'>
					<Textarea
						id={`description-${id}`}
						name={`description-${id}`}
						placeholder="It was a dark and stormy night..."
						required
					/>
				</FormField>
				<FormField name={`details-${id}`} htmlFor="details" label='Hints / Details'>
					<Textarea
						id={`details-${id}`}
						name={`details-${id}`}
						placeholder="What color are the mesquite pods?"
						required
					/>
				</FormField>
				<FormField name={`passcode-${id}`} htmlFor='inviteCode' label="Passcode">
					<Input
						id={`passcode-${id}`}
						name={`passcode-${id}`}
						type="text"
					/>
				</FormField>
				<FormField name={`secretText-${id}`} htmlFor="secrettext" label='Secret text'>
					<Textarea
						id={`secretText-${id}`}
						name={`secretText-${id}`}
						placeholder="And the rabbit said, 'I'm late!' Next chapter, we'll find where the rabbit went."
						required
					/>
				</FormField>
			</div>
		)
}
