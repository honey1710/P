class loginPage
{
    constructor(page)
    {
         this.page = page;
         this.user=page.getByPlaceholder('email@example.com');
         this.pwd=page.getByPlaceholder('enter your passsword');
         this.btnLogin=page.getByRole('button',{name:'Login'});
    }

    async login(user,pwd)
    {
        await this.page.goto('https://rahulshettyacademy.com/client');
        await this.user.fill(user);
        await this.pwd.fill(pwd);
        await this.btnLogin.click();
    }
}
//Node.js exports the loginPage class as a module, making it accessible to other files.
module.exports={loginPage} 