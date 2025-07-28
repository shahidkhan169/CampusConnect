import nodemailer from 'nodemailer';


export class EmailService {
  static async sendInvitationEmail({ email, fullName, id,template}) {
    const acceptUrl = `${process.env.BASE_URL}/invitation/accept/${id}`;
    const declineUrl = `${process.env.BASE_URL}/invitation/decline/${id}`;
    const html = template
        .replace('{{acceptUrl}}', acceptUrl)
        .replace('{{declineUrl}}', declineUrl)
        .replace('{{fullName}}', fullName)
        .replaceAll('{{DISABLE}}', '');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CAMPUSCONNECT_MAIL,
        pass: process.env.APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `Admin.CampusConnect <${process.env.CAMPUSCONNECT_MAIL}>`,
      to: email,
      subject: 'CampusConnect Invitation',
      html
    });
  }
}
