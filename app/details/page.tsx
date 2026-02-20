import { Navbar, Footer, Copyright } from "@/app/components";

export default function Detail() {
  return (
    <>
      <Navbar />
      <div className="border rounded-md max-w-full mx-44 my-4 p-10 shadow-lg">
        <h1
          id="about"
          className="text-center font-bold text-4xl underline mb-6"
        >
          About
        </h1>
        <p>
          Inspec is an independent organization that collects and manages
          publicly available information, giving authorized professionals quick
          access when needed.
        </p>
        <p>
          Designed for employers and law enforcement professionals, it helps
          users quickly learn more about a person.
        </p>
        <p>
          Inspec is not responsible for misuse of the data. To opt out, please
          contact our team using the form below.
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg max-w-2xl mx-auto my-8 p-8 shadow-xl bg-white">
        <h1
          id="contact"
          className="text-center font-bold text-3xl text-gray-800 mb-8"
        >
          Get In Touch
        </h1>
        <form id="form" className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
      <Copyright />
    </>
  );
}
