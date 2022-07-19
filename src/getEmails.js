import { launch } from "puppeteer";
import { question } from "readline-sync";

import getEmailsList from "./getEmailsList.js";
import login from "./login.js";
import writeEmailsToTxt from "./writeEmailsToTxt.js";

const getEmails = async () => {
    const browser = await launch();
    const page = await browser.newPage();

    try {
        const [subjectId, user, password] = [
            question("Type your Turing user: "),
            question("Type your Turing password: "),
            question(
                `What is the id of the subject you want to fetch emails from? \nRemember, you should already be signed to this subject to be able to fetch the emails.\n`
            ),
        ];

        Promise.all([
            await login(subjectId, user, password, page),
            await page.waitForSelector("#showall > a"),
        ]);

        console.log("Logged into turing");

        page.click("#showall > a");
        await page.waitForNavigation(".page-header-headings > h1");

        console.log("Showed all participants");

        const subject = await page.$eval(
            ".page-header-headings > h1",
            (subjectTitle) => subjectTitle.innerText
        );

        const participantsList = await page.$$eval(
            "tr[id*='user-index-participants'] > th > a",
            (participants) =>
                participants.map((participant) => ({
                    name: participant.innerText,
                    link: participant.href,
                }))
        );

        const emailList = await getEmailsList(participantsList, page);

        writeEmailsToTxt(emailList, subject);

        await browser.close();
    } catch (error) {
        console.log(error);
        await browser.close();
    }

    console.log("Program end");
};

export default getEmails;
