export const email_verification_template =({name, link}: {name: string, link: string}) =>{
    const content =`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="viewport" content="width=device-width; initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Email Verification</title>
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                width: 100% !important;
                background-color: #f0f0f0;
            }
            table {
                border-spacing: 0;
                border-collapse: collapse;
            }
            .content {
                width: 100%;
                margin: 0 auto;
                max-width: 600px;
                background-color: #ffffff;
            }
            .header img{
                width: 100%;
            display: block;
            }
            .body {
                padding: 20px;
                color: #333333;
                font-size: 16px;
                font-family: Arial, sans-serif;
            }
            .footer {
                color: white;
                padding: 10px 0;
                font-size: 12px;
                text-align: center;
                background-color: rgb(218, 145, 11);
            }
            .button__link{
                color: white;
                display: block;
                padding: 20px;
                font-size: 18px;
                font-weight: 600;
                text-align: center;
                border-radius: 16px;
                text-decoration: none;
                text-transform: uppercase;
                background-color: rgb(218, 145, 11);;
            }
        </style>
    </head>
    <body>
        <center class="wrapper">

            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td align="center" valign="top">
                        <table class="content" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td class="header">
                                    <img src="https://cdn.joyfulrides.com/assets/media/banner_kvD2acrBmFSZeMYobrgq1A.jpeg" alt="logo"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="body">
                                    <h3>Hello, ${name}</h3>
                                    <h2>Please Verify Your Email Address</h2>
                                    <p>Thank you for registering with Joyful Rides. Please verify your email address to complete your registration and access your account.</p>
                                    <h3>Verify your email</h3>
                                    <p>To verify your email, please click the button below</p>
                                    <a href="${link}" class="button__link">Verify now</a>
                                    <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
                                    <a href="${link}">${link}</a>
                                    <p>If you did not create an account with us, please disregard this email.</p>
                                    <p>If you have any questions, feel free to contact our support team at <a href="mailto:support@joyfulrider.com">support@joyfulrides.com</a></p>

                                    <p>Thank you for choosing Joyful Rides</p>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer">
                                    &copy; ${new Date().getFullYear()} Joyful Rides. All rights reserved.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>
</body>
</html>

    `;
    return content;
}