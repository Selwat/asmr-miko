import Head from "next/head"

export default function Home() {
  const links = [
    "ABOUT",
    "HELP",
    "PRESS",
    "API",
    "JOBS",
    "PRIVACY",
    "TERMS",
    "LOCATIONS",
    "TOP ACCOUNTS",
    "HASHTAGS",
    "LANGUAGE",
  ]

  return (
    <div className="flex h-full items-center justify-center flex-col p-10 mx-auto w-full bg-white">
      <Head>
        <title>Instagram Clone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex h-full items-center justify-center mx-auto w-full bg-white">
        <section id="mobile" className="max-w-[454px] hidden md:flex"></section>
        <section id="auth" className="flex flex-col max-w-[350px]">
          <div className="bg-white border border-[#dbdbdb] mb-2 p-3 flex flex-col">
            <h1 className="flex justify-center my-5">
              <img src="/instagram-logo.png" alt="Instagram logo" />
            </h1>
            <form className="flex flex-col p-5 w-full">
              <label htmlFor="email" className="sr-only">
                Phone number, username, or email
              </label>
              <input
                name="text"
                autoComplete="off"
                placeholder="Phone number, username, or email"
                className="bg-[#fafafa] border border-[#dbdbdb] rounded px-3 py-2 mb-2 text-sm 
                text-gray-600 focus:outline-none focus:border-gray-500"
              />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="bg-[#fafafa] border border-[#dbdbdb] rounded px-3 py-2 mb-2 text-sm 
                text-gray-600 focus:outline-none focus:border-gray-500"
              />
              <button
                type="button"
                className="bg-[#0095f6] text-white font-bold rounded h-9 mt-2"
              >
                Log In
              </button>
            </form>

            <div className="flex items-center px-5 py-2">
              <span className="flex-grow bg-[#dbdbdb] h-px mr-2"></span>
              <div className="text-gray-500 font-bold text-sm">OR</div>
              <span className="flex-grow bg-[#dbdbdb] h-px ml-2"></span>
            </div>

            <div className="flex flex-col items-center px-5 py-5">
              <div className="mb-4 flex items-center space-x-2">
                <a className="text-[#385185] font-bold text-sm" href="#">
                  Log in with Facebook
                </a>
              </div>
              <a className="text-xs text-[#385185]" href="#">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="bg-white border border-[#dbdbdb] p-4 flex justify-center text-sm mb-4">
            <p className="mr-2">Don't have an account?</p>
            <a href="#" className="text-[#0095f6] font-bold">
              Sign up
            </a>
          </div>

          <div className="text-center p-3 text-sm">
            <p className="mb-2">Get the app.</p>
            <div className="flex justify-center">
              <img
                className="h-10 mx-1"
                src="/apple-button.png"
                alt="App Store"
              />
              <img
                className="h-10 mx-1"
                src="/googleplay-button.png"
                alt="Google Play"
              />
            </div>
          </div>
        </section>
      </main>

      <div className="mx-auto mt-8 max-w-[935px] text-center px-4">
        <ul className="flex flex-wrap justify-center text-xs text-[#385185] font-bold uppercase mb-5">
          {links.map((link, idx) => (
            <li key={idx} className="mx-2 mb-2">
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
        <p className="text-gray-500 text-xs font-bold uppercase">
          © 2025 Instagram
        </p>
      </div>
    </div>
  )
}
