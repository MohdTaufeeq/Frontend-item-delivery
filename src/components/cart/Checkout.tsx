import { useAppDispatch } from "../../hooks/useAppDispatch";
import { hide as hideModal } from "../../store/modal";
import { hideCart } from "../../store/ui";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useState } from "react";

const Checkout = () => {
  const billAmount = useAppSelector((state) => state.cart.billAmount);
  const cart = useAppSelector((state) => state.cart);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [nameOnCard, setnameOnCard] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [expiryDate, setexpiryDate] = useState("");
  const [cvv, setcvv] = useState("");
  const navigate = useNavigate();

  const handleCreditCardValidation = (card = "") => {
    const masterCard =
      /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
    const visaCard = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const americanExpress = /^3[47][0-9]{13}$/;
    const debitCard =
      /^((?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12})|(4[0-9]{12}(?:[0-9]{3})?)$/gm;

    const rupayDebitCard =
      /^(((60)([0-9]{14}))|((6521)([0-9]{12}))|((6522)([0-9]{12})))$/;

    if (card.match(masterCard)) {
      return true;
    } else if (card.match(visaCard)) {
      return true;
    } else if (card.match(americanExpress)) {
      return true;
    } else if (card.match(debitCard)) {
      return true;
    } else if (card.match(rupayDebitCard)) {
      return true;
    } else {
      alert("Enter valid card number");
      return false;
    }
  };

  const handlePayNow = async () => {
    if (!handleCreditCardValidation(cardNumber)) {
      return;
    }

    try {
      const res = await fetch(
        "https://red-thoughtful-moth.cyclic.app/api/saveItem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNumber: mobileNumber,
            address: address,
            city: city,
            zipcode: zipcode,
            nameOnCard: nameOnCard,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            billAmount: billAmount,
          }),
        }
      );

      console.log({
        firstName: firstName,
        lastName: lastName,
        billAmount: billAmount,
      });
      const data = await res.json();
      console.log(data);
      navigate("/confirm");
    } catch (e) {
      // console.log(e.message);
    }
  };

  // console.log("CHECOUT COMPEONET CART:", cart)
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideModal());
    dispatch(hideCart());
  };
  return (
    <>
      <div className="flex gap-8 p-8 md:px-16">
        <section className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-4 md:w-max">
            <h1 className="text-xl font-extrabold md:text-2xl">Checkout</h1>
            <h3 className="text-lg md:text-lg">Shipping Info</h3>
            <div className="flex w-full flex-col md:flex-row md:gap-2">
              {/* <form> */}
              <div className="flex flex-col gap-2">
                <label className="py-0">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder=""
                  className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                  required
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="py-0">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder=""
                  className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                  required
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="py-0">Email</label>
              <input
                type="text"
                name="email"
                placeholder=""
                className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                max="96"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="py-0">Mobile Number</label>
              <input
                type="number"
                name="mobile_number"
                placeholder=""
                className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                max="10"
                required
                value={mobileNumber}
                onChange={(e) => setmobileNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="py-0">Address</label>
              <input
                type="text"
                name="address"
                placeholder=""
                className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                required
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col md:flex-row md:gap-2">
              <div className="flex flex-col gap-2">
                <label className="py-0">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder=""
                  className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                  min="2"
                  max="32"
                  required
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="py-0">Zip Code</label>
                <input
                  type="number"
                  name="zip_code"
                  placeholder=""
                  className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                  required
                  value={zipcode}
                  onChange={(e) => setzipcode(e.target.value)}
                />
              </div>
            </div>
            <h3 className="text-lg font-bold md:text-xl">Billing Info</h3>
            <div className="flex flex-col gap-2">
              <label className="py-0">Name On Card</label>
              <input
                type="text"
                name="name_on_card"
                placeholder=""
                className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                required
                value={nameOnCard}
                onChange={(e) => setnameOnCard(e.target.value)}
              />
            </div>
            <h3 className="md:text-md text-sm">Card Type</h3>
            <div className="">
              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
                  name="paymentMethod"
                  value="credit"
                  checked
                />

                <label className="ml-2 text-ms font-medium text-gray-900">
                  Credit
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
                  name="paymentMethod"
                  value="debit"
                />
                <label className="ml-2 text-ms font-medium text-gray-900">
                  Debit
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="py-0">Card Number</label>
              <input
                type="text"
                name="card_number"
                placeholder=""
                className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                max="23"
                required
                value={cardNumber}
                onChange={(e) => setcardNumber(e.target.value)}
              />
              <span
                id="warning"
                style={{ color: "brown", fontSize: "smaller" }}
              ></span>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <label className="py-0">Expiry Date</label>
                <input
                  type="text"
                  name="expiry_date"
                  placeholder="MM/YY"
                  className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                  max="5"
                  pattern="[0-9]"
                  required
                  value={expiryDate}
                  onChange={(e) => setexpiryDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  <label className="py-0">CVV</label>
                  <input
                    type="number"
                    name="cvv"
                    placeholder="Enter the number on the back of your card"
                    pattern="[0-9]"
                    className="w-full bg-transparent outline-none flex gap-2 items-center justify-center p-2 px-4 rounded-md border-2 transtion-all cursor-text duration-150 border-gray-200"
                    max="3"
                    required
                    value={cvv}
                    onChange={(e) => setcvv(e.target.value)}
                  />
                </div>
                <small className="text-xs text-gray-400">
                  Check for a 3 digit number on the back of your card
                </small>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className=" border-t-2 border-gray-200 bg-white p-2 md:hidden">
        <div className="w-full border-b-2 border-gray-200 p-4">
          <h1 className="text-xl font-extrabold text-center">Order Summary</h1>
        </div>
        <div className="flex flex-col gap-2 p-4" id="summary-content">
          {/* Content for dynamic data */}

          <div className="flex items-center justify-between p-1">
            <p className="font-bold text-xl text-gray-500">Sub Total</p>
            <p className="font-semibold text-xl">₹{billAmount}</p>
          </div>

          <hr />

          <div className="flex items-center justify-between p-1">
            <p className="font-semibold text-lg text-gray-500">Tax</p>
            <p className="font-semibold text-xl text-green-400">₹0</p>
          </div>

          <hr />

          <div className="flex items-center justify-between p-1">
            <p className="font-bold text-xl text-gray-500">Total</p>
            <p className="font-semibold  text-orange-400 text-xl">
              ₹{billAmount}
            </p>
          </div>
          <hr />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" checked />
              <label htmlFor="">
                Use cash on delivery in case of card transaction failure
              </label>
            </div>
            {/* <Link to="/confirm"> */}
            <button
              onClick={handlePayNow}
              className="p-2 my-2 text-white bg-green-500 rounded-md"
            >
              Pay now
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
