import React from 'react'

const Login = () => {
  return (
    <div className='felx flex-col items-center justify-center min-w-96 mx-auto'>
        <div className=' w-full p-6 bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 '>
        <h1 className='text-3xl font-bold text-center text-white'>Login to
            <span className='text-cyan-400'> Blazeken</span>
        </h1>
        <form>
            <div>
                <label className='label p-2'>
                   <span className='text-base label-text'>Username</span>
                </label>
                <input type="text" placeholder="Enter username" className="input input-bordered w-full h-10" />
            </div>
            <div>
                <label className='label p-2'>
                   <span className='text-base label-text'>Password</span>
                </label>
                <input type="password" placeholder="Enter password" className="input input-bordered w-full h-10" />
            </div>
            <a to='/' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
			</a>
            <div>
						<button className='btn btn-outline btn-block btn-default mt-2'>
							Login
						</button>
			</div>
        </form>
        </div>
        
    </div>
  )
}

export default Login