const puppeteer = require('puppeteer');

const mailsac_url = 'https://tempr.email/';
const basement_url = 'https://basement.redbull.com/el-gr';

const createRandomString = length => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

(async () => {
    const first_name = createRandomString(6);
    const second_name = createRandomString(6);
    const username = first_name + second_name;
    const pasw = createRandomString(32);

    const browser = await puppeteer.launch({headless: false});

    const mailsac_input = "#LoginLocalPart";
    const mailsac_button = "#Login > div > form > table > tbody > tr:nth-child(4) > td.Input > input";
    const mailsac_first_email = "#Inbox > div > div.Head > a";
    const mailsac_verify_link = "body > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > a";
    const mailsac_page = await browser.newPage();
    
    await mailsac_page.goto(mailsac_url);
    await mailsac_page.waitForSelector(mailsac_input);
    await mailsac_page.type(mailsac_input, username);
    await mailsac_page.click(mailsac_button);
    
    const mail = username + "@tempr.email";

    const basement_input = "#input-search";
    const basement_cookie_card = "#onetrust-banner-sdk";
    const basement_cookie_button = "#onetrust-accept-btn-handler";
    const basement_card = "#drop-projects > div > div.card.card-clickable.no-overflow";
    const basement_vote_button = "#form-submit-vote > button";
    const basement_email_input = "#email";
    const basement_email_button = "#app > div > div > div.content > div > form > button";
    const basement_first_name = "#firstName";
    const basement_second_name = "#lastName";
    const basement_password = "#password";
    const basement_agree_button = "#app > div > div > div > div > form > button";
    const basement_page = await browser.newPage();
    
    await basement_page.goto(basement_url, {timeout: 60000});

    await basement_page.waitForSelector(basement_cookie_card);
    await basement_page.click(basement_cookie_button)

    await basement_page.waitForSelector(basement_input);
    await basement_page.type(basement_input, "G-CUP", {delay: 1500});

    await basement_page.waitForSelector(basement_card);
    await basement_page.click(basement_card, {delay: 1500})

    await basement_page.waitForSelector(basement_vote_button);
    await basement_page.click(basement_vote_button, {delay: 1500});

    await basement_page.waitForSelector(basement_email_input);
    await basement_page.type(basement_email_input, mail, {delay: 250});

    await basement_page.waitForSelector(basement_email_button);
    await basement_page.click(basement_email_button, {delay: 1500});

    await basement_page.waitForSelector(basement_first_name);
    await basement_page.type(basement_first_name, first_name, {delay: 250});

    await basement_page.waitForSelector(basement_second_name);
    await basement_page.type(basement_second_name, second_name, {delay: 250});

    await basement_page.waitForSelector(basement_password);
    await basement_page.type(basement_password, pasw, {delay: 250});

    await basement_page.waitForSelector(basement_agree_button);
    await basement_page.click(basement_agree_button, {delay: 1500});

    await mailsac_page.bringToFront({delay: 10000});

    setTimeout(async () => {
        await mailsac_page.reload({waitUntil: ["networkidle0", "domcontentloaded"]});
        //await basement_page.waitForSelector(mailsac_first_email);
        await basement_page.click(mailsac_first_email, {delay: 1500});

        await basement_page.waitForSelector(mailsac_verify_link);
        await basement_page.click(mailsac_verify_link, {delay: 1500});
    }, 25000);

})();