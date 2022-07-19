import { createWriteStream, appendFile } from 'fs';

const writeEmailsToTxt = (emailList, subject) => {
    const writableSubject = subject.replace(/\d/g, '').replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, '').split(' ').join('_');

    appendFile(`../emailList/emailsList_${writableSubject}.txt`, `Email list for ${subject} \n`, (err) => {
        if (err) throw err;
      });

    const txt = createWriteStream(`../emailList/emailsList_${writableSubject}.txt`);

    emailList.forEach(email => {
        txt.write(`${email.newEmail}, \n`);
    });

    console.log(`Email list output to ../emailList/emailsList_${writableSubject}.txt`);
};

export default writeEmailsToTxt;