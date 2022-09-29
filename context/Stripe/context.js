import React from 'react';

const StripeContext = React.createContext();

const { Provider, Consumer } = StripeContext

export {StripeContext, Provider, Consumer};