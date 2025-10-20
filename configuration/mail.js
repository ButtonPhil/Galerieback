import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {

    user: 'thedarkray05@gmail.com',
    pass: 'cfog qrvj ulsx mnmk'

  }

});

// mail inscription

export const mailInscription = (mailDestinataire, login) => {

  return {

    from: 'thedarkray05@gmail.com',
    to: mailDestinataire,
    subject: 'Bienvenue sur notre plateforme !',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1976d2;">Bienvenue ${login} !</h2>
        <p>Félicitations 🎉 votre inscription a bien été enregistrée.</p>
        <p>Vous pouvez maintenant vous connecter à votre compte et accéder à toutes les fonctionnalités de notre plateforme.</p>
        <p style="margin-top: 30px;">À bientôt,<br><strong>L'équipe Glasstwitt</strong></p>
      </div>
    `
  };

};

// mail changer

export const mailChanger = (mailDestinataire, login) => {

  return {

    from: 'thedarkray05@gmail.com',
    to: mailDestinataire,
    subject: 'Bienvenue sur notre plateforme !',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1976d2;">Bienvenue ${login} !</h2>
        <p>Félicitations 🎉 votre inscription a bien été enregistrée.</p>
        <p>Vous pouvez maintenant vous connecter à votre compte et accéder à toutes les fonctionnalités de notre plateforme.</p>
        <p style="margin-top: 30px;">À bientôt,<br><strong>L'équipe Glasstwitt</strong></p>
      </div>
    `
  };

};

// mail changer password 

export const mailNewPass = (mailDestinataire, login) => {

  return {

    from: 'thedarkray05@gmail.com',
    to: mailDestinataire,
    subject: 'Bienvenue sur notre plateforme !',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1976d2;">Bienvenue ${login} !</h2>
        <p>Félicitations 🎉 votre inscription a bien été enregistrée.</p>
        <p>Vous pouvez maintenant vous connecter à votre compte et accéder à toutes les fonctionnalités de notre plateforme.</p>
        <p style="margin-top: 30px;">À bientôt,<br><strong>L'équipe Glasstwitt</strong></p>
      </div>
    `
  };
  
};

// mail password oublier

export const mailPassOublier = (mailDestinataire, login) => {

  return {
    
    from: 'thedarkray05@gmail.com',
    to: mailDestinataire,
    subject: 'Bienvenue sur notre plateforme !',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #1976d2;">Bienvenue ${login} !</h2>
        <p>Félicitations 🎉 votre inscription a bien été enregistrée.</p>
        <p>Vous pouvez maintenant vous connecter à votre compte et accéder à toutes les fonctionnalités de notre plateforme.</p>
        <p style="margin-top: 30px;">À bientôt,<br><strong>L'équipe Glasstwitt</strong></p>
      </div>
    `
  };
  
};