import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {

    // Stripe wants the price in cents, hence why we multiply by 100
   const priceForStripe = price * 100;
   const publishableKey = 'pk_test_Zy0T1f7jjZh5xGm8DfO9WmWf00ZhCd9aPQ';

   const onToken = token => {
       console.log(token);
       alert('Payment Successful')
   }

   return (
       <StripeCheckout 
           label='Pay Now'
           name='DROO Clothing Ltd.'
           billingAddress
           shippingAddress
           image='https://sendeyo.com/up/d/f3eb2117da'
           description={`Your total is $${price}`}
           amount={priceForStripe}
           panelLabel='Pay Now'
           token={onToken}
           stripeKey={publishableKey}
       />
   )
};

export default StripeCheckoutButton;