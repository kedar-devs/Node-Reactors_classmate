const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'strummerforlife@gmail.com',
        pass: 'tnkjxsyzbdtzomwf'
    }
})
const Recruitor=require('./../model/Recruitor.model')
const User=require('./../model/Student.model')
exports.EmailSender=async(compId,studid,Role)=>{
    const responseData={
        isSuccess:false,
        message:''
    }
    const FoundCompany=await Recruitor.findOne({_id:compId})
    const FoundUser=await User.findOne({_id:studid})
    if(FoundCompany && FoundUser){
        transporter.sendMail({
            to: FoundCompany.email,
            from: "strummerforlife@gmail.com",
            subject: `Application for the Role:${Role}`,
            html: `
            <p>Hi ${FoundCompany.firstname}, Hope this Email finds you well. For your recent Job posting for the Role of ${Role}
            ,We have a new Candidate
            Candidate Name:${FoundUser.firstname} ${FoundUser.lastname}</p>
            <h5>PFA the Candidates resume</h5>
            `,
            attachments:[{
                filename:`${FoundUser.firstname}.pdf`,
                path:FoundUser.resume,
                contentType: 'application/pdf'
            }]

        }, (err, result) => {
            if (err) {
                console.log(err)
                return res.send(err)
            }
            else {
                console.log(result)
                return res.status(200).send({
                    message: 'An email has been sent to the provided email with further instructions.'
                })
            }
            transporter.close()
        }
        )

    }

}