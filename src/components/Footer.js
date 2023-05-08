export default function Footer() {
  return (
    <>
      <footer className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
        <div className="flex flex-col justify-between w-full sm:w-auto sm:flex-row">
          <div className="text-white font-semibold text-lg mb-4 sm:mb-0 sm:mr-8">
            <p>Follow us on:</p>
            <div className="flex mt-2">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="text-lime-400 mr-4 hover:text-lime-300 transition duration-200"
              >
                <i className="fab fa-facebook-square"></i>
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="text-lime-400 mr-4 hover:text-lime-300 transition duration-200"
              >
                <i className="fab fa-twitter-square"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="text-lime-400 mr-4 hover:text-lime-300 transition duration-200"
              >
                <i className="fab fa-instagram-square"></i>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="text-lime-400 hover:text-lime-300 transition duration-200"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="text-white font-semibold text-lg">
            <p>Contact us:</p>
            <p className="mt-2">
              Email: <a href="mailto:support@sudokupuzzle.com" className="text-lime-400">support@sudokupuzzle.com</a>
            </p>
            <p className="mt-2">
              Phone: <a href="tel:+1234567890" className="text-lime-400">+1234567890</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
