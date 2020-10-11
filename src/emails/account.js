const nodemailer = require('nodemailer');

  
const sendWelcomeEmail = (email,name)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS
    }
  })
  console.log(email)
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    //html: `<h1>Welcome</h1><p>That ${user.name} easy!</p>`
  }
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}


const sendCancellationEmail = async (email,name)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS
    }
  })
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: 'Sending Email using Node.js',
    text: `goodbye ${name}`,
    //html: `<h1>Welcome</h1><p>That ${user.name} easy!</p>`
  }
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}

module.exports={
  sendWelcomeEmail,
  sendCancellationEmail
}

  