import React from "react";

export default function CreditCard({
  name,
  cardNumber,
  expiry,
  balance,
  currency,
}) {
  return (
    <div>
      <div className="min-w-min">
        <div>
          <div className="w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl m-0">
            <img
              className="relative object-cover w-full h-full rounded-xl"
              src="https://i.imgur.com/kGkSg1v.png"
            />

            <div className="w-full px-8 absolute top-3">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-light">Name</p>
                  <p className="font-medium tracking-widest h-4">{name}</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="font-light">Balance</p>
                {balance !== 0 ? (
                  <p className="text-xl tracking-more-wider h-5 font-semibold">
                    {balance} {currency}
                  </p>
                ) : (
                  <p className="text-xl tracking-more-wider h-5"></p>
                )}
              </div>
              <div className="pt-4">
                <p className="font-light">Card Number</p>
                {cardNumber == "" ? (
                  <p className="text-xl tracking-more-wider h-5"></p>
                ) : (
                  <p className="text-xl tracking-more-wider h-5 font-semibold">
                    {cardNumber.substring(0, 4)} {cardNumber.substring(4, 8)}{" "}
                    {cardNumber.substring(8, 12)} {cardNumber.substring(12, cardNumber.length)}
                  </p>
                )}
              </div>

              <div className="pt-4 pr-6">
                <div>
                  <div className="">
                    <p className="font-light text-xs">Expiry Date</p>
                    {expiry.MM ? (
                      <p className="font-medium tracking-wider text-sm">
                        {expiry.MM} / {expiry.YY}
                      </p>
                    ) : (
                      <p className="font-medium tracking-wider text-sm"></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
