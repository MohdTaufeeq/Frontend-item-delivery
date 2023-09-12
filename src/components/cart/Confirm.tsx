const Confirm = () => {
  return (
    <>
      <section className="flex min-h-[60vh] flex-col items-center p-8 lg:p-16">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <span className="text-md max-w-3xl rounded-md border-2 border-yellow-600 bg-yellow-50 p-2 text-center text-yellow-600 md:text-lg">
            Thank you for making a purchase from our website! Your order is
            still pending so kindly download our mobile app and confirm your
            order. We look forward to seeing you again.
          </span>
          <div className="w-full max-w-lg">
            <a href="https://dmarteasystore.com/dmart.apk" download>
              <button
                type="button"
                className="flex gap-2 justify-center px-4 p-2.5 rounded-md border-2 border-transparent transtion-all duration-200 break-none hover:shadow-md outline-none focus:outline-none disabled:opacity-50 bg-yellow-400 hover:bg-yellow-500 text-black active:bg-yellow-400 w-full"
              >
                <p className="md:text-md whitespace-nowrap text-sm">
                  Confirm your order
                </p>
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Confirm;
