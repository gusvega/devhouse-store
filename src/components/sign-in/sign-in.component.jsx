import React from 'react';

import './sign-in.styles.scss';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async event => {
		event.preventDefault();
		const {email, password} = this.state

		try {
			await auth.signInWithEmailAndPassword(email, password)
			this.setState({
				email: '',
				password: ''
			})
		} catch (e) {
			console.log(e)
		}

		this.setState({
			email: '',
			password: ''
		});
	};

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="sign-in">
				<h2> I already have an account</h2>
				<span>Sign In with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						value={this.state.email}
						label="Email"
						handleChange={this.handleChange}
						required
					/>
					<FormInput
						name="password"
						type="password"
						label="Password"
						value={this.state.password}
						handleChange={this.handleChange}
						required
					/>

					<div className="buttons">
						<CustomButton type="submit">Sign In</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							{''}
							Use Google{''}
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
