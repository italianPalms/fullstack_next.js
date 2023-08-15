import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}
    :any) => {
      console.log("sendEmail function called");
        try {
            //create a hashed token
            const hashedToken = await bcryptjs.hash(userId.toString(), 10)

           if (emailType === 'VERIFY') {
                await User.findByIdAndUpdate(userId, 
                    {verifyToken: hashedToken, 
                    verifyTokenExpiry: Date.now() + 3600000})
           } else if (emailType === 'RESET') {
                await User.findByIdAndUpdate(userId, 
                    {forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000})
           }

           var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USER!,
              pass: process.env.NODEMAILER_PASS!
            }
          });

          const mailOptions = {
            from: 'palms@gmail.com',
            to: email, 
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your mail" : "Reset your password"}</p>`
          }

          const mailresponse = await transport.sendMail(mailOptions);
          console.log("Email sent successfully", mailresponse);
          return mailresponse;

        } catch (error:any) {
            console.log("Email sending error", error);
            throw new Error(error.message);
        }
    }