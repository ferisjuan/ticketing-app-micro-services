export default () => {
	return (
		<form>
			<h1>Sign Up</h1>
			<div className='form-group'>
				<label>Email Address</label>
				<input className='form-control' />
			</div>
			<div className='form-group'>
				<label>Password</label>
				<input className='form-control' type='password' />
			</div>
			<buton className='btn btn-primary'>Sign Up</buton>
		</form>
	)
}
