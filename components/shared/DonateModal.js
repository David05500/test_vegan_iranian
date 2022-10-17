import React, { useContext, useState } from "react"
import {set} from "lodash"
import { AppDataContext } from "../AppDataContext";
import { StripeContext } from "../../context/Stripe/context";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const iframeStyles = {
    base: {
      color: "#4A5568",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#A0AEC0"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
};

const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
};

const DonateModal = () => {
    const {
        handleFormSubmit, 
        checkoutError, 
        handleCardDetailsChange, 
        setPaymentDetails, 
        paymentDetails,
        amount ,
        setAmount,
        isProcessing,
        isPaymentSuccess,
        updateValue
    } = useContext(StripeContext);

    const { setDonateModal } = useContext(AppDataContext);
    const stripe = useStripe()
    const elements = useElements()

    return (
        <div className="relative z-99999" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* backdrop */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center w-full">
                <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full lg:w-auto">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-black" id="modal-title">Donation</h3>
                                    <div className="mt-4">
                                        {!isPaymentSuccess && (
                                            <form onSubmit={handleFormSubmit}>
                                                <div className="flex flex-col">
                                                    <input
                                                        className="bg-white mb-4 text-base lg:text-base text-black appearance-none border rounded-md border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none" 
                                                        name="name"
                                                        label="Name"
                                                        type="text"
                                                        placeholder="Name"
                                                        onChange={(e) => setPaymentDetails({
                                                            ...paymentDetails,
                                                            name: e.target.value
                                                        })}
                                                        value={paymentDetails.name}
                                                        required
                                                    />
                                                    <input
                                                        className="bg-white mb-4 text-base lg:text-base text-black appearance-none border rounded-md border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none" 
                                                        name="email"
                                                        label="Email"
                                                        type="email"
                                                        placeholder="Email"
                                                        onChange={(e) => setPaymentDetails({
                                                            ...paymentDetails,
                                                            email: e.target.value
                                                        })}
                                                        value={paymentDetails.email}
                                                        required
                                                    />
                                                    {/* <input
                                                        className="bg-white mb-4 text-base lg:text-base text-black appearance-none border rounded-md border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none" 
                                                        name="address"
                                                        label="Address"
                                                        type="text"
                                                        placeholder="Street address"
                                                        onChange={(e) => setPaymentDetails(set(paymentDetails, "address.line1", e.target.value))}
                                                        value={paymentDetails.address.line1}
                                                        required
                                                    />
                                                    <input
                                                        className="bg-white mb-4 text-base lg:text-base text-black appearance-none border rounded-md border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none" 
                                                        name="city"
                                                        label="City"
                                                        type="text"
                                                        placeholder="City"
                                                        onChange={(e) => setPaymentDetails(set(paymentDetails, "address.city", e.target.value))}
                                                        value={paymentDetails.address.city}
                                                        required
                                                    />
                                                    <input
                                                        className="bg-white mb-4 text-base lg:text-base text-black appearance-none border rounded-md border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none" 
                                                        name="county"
                                                        label="County"
                                                        type="text"
                                                        placeholder="County"
                                                        onChange={(e) => setPaymentDetails(set(paymentDetails, "address.county", e.target.value))}
                                                        value={paymentDetails.address.county}
                                                        required
                                                    /> */}
                                                    <div  className="flex">
                                                        <input
                                                            className="bg-white mb-4 text-base lg:text-base text-black appearance-none border rounded-md border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none w-1/2 mr-2" 
                                                            name="Amount"
                                                            label="Amount"
                                                            type="number"
                                                            placeholder="Amount*"
                                                            onChange={(e) => setAmount(e.target.value)}
                                                            value={amount === 0 ? "" : amount}
                                                            required
                                                        />
                                                        <input
                                                            className="bg-white mb-4 text-base lg:text-base text-black appearance-none border rounded-md border-gray-400 w-full py-2 px-3 leading-tight focus:outline-none w-1/2" 
                                                            name="Post code"
                                                            label="PC"
                                                            type="text"
                                                            placeholder="Post code*"
                                                            onChange={(e) => setPaymentDetails(set(paymentDetails, "address.postCode", e.target.value))}
                                                            value={paymentDetails.address.postCode}
                                                            required
                                                        />
                                                    </div>
                                                    
                                                </div>
                                                <div className="mt-2">
                                                    <CardElement
                                                        id="card-element"
                                                        options={cardElementOpts}
                                                        onChange={handleCardDetailsChange}
                                                    />
                                                </div>
                                                {checkoutError && <p className="text-base text-initial">{checkoutError}</p>}
                                            </form>
                                        )}
                                        {isPaymentSuccess && (
                                            <>
                                                <h3 className="text-lg font-medium text-black" id="modal-title">Payment successful</h3>
                                                <p  className="text-base font-medium text-black">Thank you for your support! <br />You should recieve an invoice for this transaction via an email,<br /> if you provided one.</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {!isPaymentSuccess && (
                                <button 
                                    type="button" 
                                    onClick={() => isProcessing || !paymentDetails.address.postCode || !amount ? null : handleFormSubmit(stripe, elements)} className={`${isProcessing || !paymentDetails.address.postCode || !amount ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 focus:ring-red-500"} inline-flex w-full lg:w-24 justify-center rounded-md border border-transparent px-4 ${!isProcessing ? "py-2" : "pt-2.5 pb-2"} text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2 sm:ml-3  sm:text-sm`}>
                                    { !isProcessing ? "Donate" : 
                                    (
                                        <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                    )}
                                </button>
                            )}
                            <button 
                            onClick={() => {
                                setDonateModal(false)
                                setPaymentDetails(
                                    {
                                        name: "",
                                        email: "",
                                        address: {
                                          city: "",
                                          line1: "",
                                          county: "",
                                          postCode: ""
                                        }
                                    }
                                )
                                updateValue("isPaymentSuccess", false)
                                setAmount(0)
                            }} 
                            type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonateModal