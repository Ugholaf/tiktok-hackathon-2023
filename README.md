# TMoney Frontend

Website: https://tiktok-hackathon-2023.vercel.app

Backend repo: https://github.com/Royleong31/T-Money-api

## Features

- Registration

  - User can register as either individual or business owner.
  - Individuals and business owners have access to different functionalities in our application.

- Login

  - Login authentication using email/username and password.
  - OTP will be sent to the registered email for 2 factor authentication. (Please check your spam/junk for OTP)

- Cash In

  - User is able to cash into their T Money wallet via PayPal.
  - A paypal tab will open up for users to confirm the amount and currency.
  - Once the paypal payment is completed, the user will see that their balances and transactions have been updated.

- Cash Out

  - Users can also cash out via PayPal
  - Users will input the amount to withdraw and the email linked to their paypal email.
  - Once successful, their balance will be updated.

- P2P Transfer

  - Users can key in the username, amount and note that they want to send money to.
  - Once successful, their balance will be updated.

- Display QR Code

  - Users can display his QR code for others to transfer to them.

- Scan QR Code

  - User can enter the QR string or scan the QR code with camera.
  - If the payment is to individuals, user can enter the amount to pay.
  - If the payment is to merchants, user can verify the merchant name and amount before payment.
  - Once successful, their balance will be updated.

- Transactions

  - Users can view their transactions of the month, their recent transactions.
  - Users can also view their overall transactions under the transaction tab.

- Wallet API (Only for business user)

  - Business users are able to generate API keys to integrate into their system to create payment QR code and use it for payment.
  - Business users can view their list of API key generated. They are able to revoke any API keys that they do need.

- Roadmap
  - We have included a 2 years+ financial inclusion and business roadmap under our roadmap tab.

## Future improvements

- **Localisation**: Allow users to set their preferred language setting. This improves their experience and allowing more people to use our application.

- **Currency**: Allow users to convert their currencies from one to another. This helps to facilitate global transactions in our application.

- **Enhanced KYC (Know Your Customers)**: Allow users to upload their identity document to prove their identity. This provides an extra layer of verification, ensures a higher level of security and trust within our ecosystem.

- **Government Integration**: Integrate with government identification such as Singpass (for Singapore) and ePhilld (for Philippines). This makes it more convenient and easier for users to use our application
