import { loadStripe } from "@stripe/stripe-js";

export async function checkout({lineItems}){
    let stripePromise = null

    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.STRIPE_PUBLISH_API_KEY)
        }
        return stripePromise
    }

    const stripe = await getStripe()

    await stripe.redirectToCheckout({
        mode: "payment",
        lineItems,
        successUrl: `${window.location.origin}/iranian-vegan-restaurant`,
        cancelUrl: `${window.location.origin}/iranian-vegan-restaurant`
    })
}