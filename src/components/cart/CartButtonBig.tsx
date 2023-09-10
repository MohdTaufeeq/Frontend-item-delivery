import { IoCaretForwardSharp } from "react-icons/io5";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { showCart } from "../../store/ui";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const CartButtonBig = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { billAmount, totalQuantity, totalAmount } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;

  useEffect(() => {
    if (path === "/checkout") {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [path]);

  return totalQuantity > 0 && !isHidden ? (
    <div id="bottom" className="fixed bottom-0 lg:hidden w-full p-3 z-10">
      <div
        className="flex items-center rounded-[6px] w-full px-3 py-2 gap-2 font-bold leading-none bg-[#0c831f] cursor-pointer text-white _fab"
        onClick={() => dispatch(showCart())}
      >
        <div className="flex flex-col">
          <span className="tracking-tight text-sm">
            {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
          </span>
          <span className="tracking-tight text-sm">
            ₹{billAmount}{" "}
            <span className="text-xs font-normal">
              <del className="opacity-80">₹{totalAmount}</del> plus taxes
            </span>{" "}
          </span>
        </div>
        <div className="ml-auto flex items-center font-bold">
          View Cart <IoCaretForwardSharp size={18} className="ml-2" />
        </div>
      </div>
    </div>
  ) : null;
};

export default CartButtonBig;
