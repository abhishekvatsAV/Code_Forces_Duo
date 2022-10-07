//styles
import './Login.css'
import Bg from '../assets/login-bg.jpeg'

const Login = () => {
	return (
		<div className='login'>
			<img src={Bg} alt="login-bg" />
			<div className="userHandle">
				<label htmlFor="">
					<p>Enter your CodeForces Handle:</p> <br/>
					<input type="text" placeholder="Enter your codeforces Handle" />
				</label>
				<br/>
				<button>Go</button>
			</div>
		</div>
	)
}

export default Login