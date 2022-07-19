const getEmailsList = async (participantsList, page) => {
    let emailList = [];
    let count = 1;

    for (const { name, link } of participantsList) {
        await Promise.all([
            page.waitForNavigation(),
            page.goto(link),
            page.waitForSelector("a[href*='mailto']"),
        ]);

        const percentage = Math.floor((count / participantsList.length) * 100);

        console.log(`Browsed ${name}'s email - ${percentage}% of emails fetched`);

        const newEmail = await page.$eval(
            "a[href*='mailto']",
            (email) => email.innerText
        );

        const role = await page.$eval(
            "dd > a[href*='user']",
            (role) => role.innerText
        );

        emailList.push({
            name,
            newEmail:
                role === "Professor" ? `${newEmail} (Professor(a))` : newEmail,
        });
        count++;
    }

    return emailList;
};

export default getEmailsList;
