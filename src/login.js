const login = async (subjectId, username, password, page) => {
    page.setDefaultNavigationTimeout(0);
    await page.goto(`https://turing.inf.ufg.br/user/index.php?id=${subjectId}`);

    await page.type("#username", username);
    await page.type("#password", password);
    page.click("#loginbtn");
};

export default login;