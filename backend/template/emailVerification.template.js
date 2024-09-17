export const verificationEmail = (name,email,verificationLink) => {
  return{
    from: 'aadishkumarak60@gmail.com',
    to: email,
    subject: 'Please verify your email',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
            a {
              text-decoration: none;
              border-radius: 3rem,
              background-color: blue,
              color: white,
              padding: .75rem 1rem,
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hi ${name},</h1>
            <p>Thank you for registering. Please click the following link to verify your email:</p>
            <a href="${verificationLink}">Verify Email</a>
            <p>This link will expire in 24 hours.</p>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Noter. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }
};