/* @flow */

import requestPromise from 'request-promise-native'

const PAYMENT_TOKEN_URL = '/payments/v1/payment-tokens'

type Card = {
    number: string,
    expMonth: string,
    expYear: string,
    cvc: string,
}

type Config = {
    headers: {
        [configName: string]: string,
    },
    endpoint: string,
}

export type Response = {
    paymentTokenId: string,
    state:
        | 'AVAILABLE'
        | 'CURRENTLY_IN_USE'
        | 'USED'
        | 'EXPIRED'
        | 'PREVERIFICATION'
        | 'VERIFYING'
        | 'VERIFICATION_FAILED',
    createdAt: string,
    updatedAt: string,
    issuer: string,
}

export default ({headers, endpoint}: Config) => (card: Card): Promise<Response> => {
    const options = {
        method: 'POST',
        uri: `${endpoint}${PAYMENT_TOKEN_URL}`,
        body: {
            card,
        },
        headers,
        json: true,
    }

    return requestPromise(options)
}
