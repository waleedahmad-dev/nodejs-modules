const config = require('../config');

module.exports = ({ email, link, name }) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        table {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        td {
            padding: 20px;
            text-align: center;
        }
        h1 {
            color: #333;
            font-size: 24px;
            margin: 0;
        }
        p {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
        }
        a.button {
            display: inline-block;
            padding: 5px 5px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
        }
        a.button:hover {
            background-color: #0056b3;
        }
        .footer {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <td>
                <h1>Reset Your Password</h1>
                <p>Dear ${name}</p>
                <p>We received a request to reset your password for your account registered with ${email}. Click the button below to set a new password.</p>
                <p><a href="${link}" class="button">Reset Password</a></p>
                <p>If you didn’t request a password reset, please ignore this email or contact support.</p>
                <p class="footer">Need help? Reach out to <a href="mailto:${config.email.from}">${config.email.from}</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};
