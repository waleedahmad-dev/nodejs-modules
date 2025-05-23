const genForgot = require('../email/forgot-password');
const config = require('../config');
const sendMail = require('../plugins/mailer');
module.exports = {
  sendForgotPasswordEmail: async (email, link, name) => {
    try {
      const emailContent = genForgot({ email, link, name });
      const subject = 'Reset Your Password';
      const to = email;
      const from = config.email.from;
      const html = emailContent;

      const result = await sendMail({
        to,
        from,
        subject,
        html,
      });

      if (!result || result.error) {
        throw new Error(
          result?.error || 'Unknown error occurred while sending email'
        );
      }

      return result;
    } catch (error) {
      // Optionally log the error here
      throw new Error(`Failed to send forgot password email: ${error.message}`);
    }
  },
};
