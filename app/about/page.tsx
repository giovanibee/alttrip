import { Card, CardHeader } from 'components/BaseComponents'
import './page.scss'

export default function Page() {
	return (
		<Card id="faq-card">
			<CardHeader>About + FAQ</CardHeader>
			<div className="faq-section">
				<h3>What is this?</h3>
				<p>
					This is a pre-alpha version of a location-based storytelling game.
					It's a bit like geocaching, but for stories.
				</p>
			</div>
			<div className="faq-section">
				<h3>Why is the explore page so empty?</h3>
				<p>
					In pre-alpha, example locations have mostly been randomly placed in
					Las Vegas, NV. If you're not in Las Vegas, you may not see any
					stories. Use the demo location option to see some examples. Also make
					sure you're logged in! You don't have to make an account--just click
					on "Guest Pass" to get started.
				</p>
			</div>
			<div className="faq-section">
				<h3>Could I go to these places in real life?</h3>
				<p>
					Ideally! The stories and chapters are supposed to be based on real
					locations, but right now virtually all of them are just examples and
					are not yet connected to their respective location.
				</p>
				<p>
					If you do go to a location, please be respectful of the area and other
					people. Don't trespass and always be mindful of your surroundings!
				</p>
			</div>
			<div className="faq-section">
				<h3>How do I add a story?</h3>
				<p>
					For the adventurous types, you can create your own stories and
					chapters by clicking on the map. Just make sure "Add story" is
					checked.
				</p>
			</div>
			<div className="faq-section">
				<h3>How do I view a story?</h3>
				<p>You can view stories and chapters by clicking on the map markers.</p>
			</div>
			<div className="faq-section">
				<h3>Will there be a mobile app?</h3>
				<p>
					Someday! A mobile app would be better suited to exploring for sure, so
					that's top of priority once the proof of concept is fleshed out.
				</p>
			</div>
			<div className="faq-section">
				<h3>Can I get involved in development?</h3>
				<p>
					Yes! This is a pre-alpha version of the game, so there's a lot of work
					to be done. If you're interested in contributing, please reach out to
					me at{' '}
					<a href="mailto: hello.alttrip@gmail.com">hello.alttrip@gmail.com</a>
				</p>
				<p>
					Or reach out to me (Giovani) directly{' '}
					<a href="https://www.linkedin.com/in/giovani-bee/">on LinkedIn</a>!
				</p>
			</div>
			<div className="faq-section">
				<h3>Has anyone actually asked questions for this FAQ?</h3>
				<p>No, but I can dream :,)</p>
			</div>
		</Card>
	)
}
