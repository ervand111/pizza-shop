import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {subject, message} = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: 'k.achoyan@geeklab.am',
        pass: 'alekskrasnodar314@gmail.com^',
      },
    });

    try {
      await transporter.sendMail({
        from: 'k.achoyan@geeklab.am',
        to: 'vip.ervand.77@mail.ru',
        subject: subject,
        text: message,
      });

      return res.status(200).json({message: 'Email sent successfully'});
    } catch (error) {
      return res.status(500).json({message: 'Error sending email', error});
    }
  } else {
    res.status(405).json({message: 'Method Not Allowed'});
  }
}