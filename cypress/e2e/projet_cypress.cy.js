describe('Site Magento', () => {

    let user = require('../fixtures/userData');
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const pwd = user.password;

    it('Create an Account', () => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.get('li').eq(2).click()
        cy.url('https://magento.softwaretestingboard.com/customer/account/create/').should('contain', 'account/create')
        cy.get('[title="First Name"]').type(firstName)
        cy.get('[title="Last Name"]').type(lastName)
        cy.get('[title="Email"]').type(email)
        cy.get('[title="Password"]').type(pwd)
        cy.get('[title="Confirm Password"]').type(pwd)
        cy.get('[title="Create an Account"]').click()
        cy.url('https://magento.softwaretestingboard.com/customer/account/').should('contain', "customer/account")
        cy.get('[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').should('be.visible')
        cy.get('[data-ui-id="page-title-wrapper"]').should('be.visible').and('have.text', 'My Account')
        cy.get('[data-ui-id="message-success"]', { timeout: 6000 }).should('be.visible').and('have.text', '\nThank you for registering with Main Website Store.\n')
        cy.get('p').eq(1).should('contain', `${firstName} ${lastName}\n${email}\n`)
    })

    it.skip('Sign In', () => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.get('li').eq(1).click()
        cy.url('https://magento.softwaretestingboard.com/customer/account/login/referer').should('contain', '/account/login')
        cy.get('[title="Email"]').type(email)
        cy.get('[title="Password"]').type(password)
        cy.wait(1000)
        cy.get('#send2').click()
        cy.url('https://magento.softwaretestingboard.com/')
        cy.get('#ui-id-8').click()
        cy.url('https://magento.softwaretestingboard.com/sale.html').should('contain', '/sale')
        cy.get('a[href*="/gear/bags.html"]').contains('Bags').click({force:true});
        cy.url('https://magento.softwaretestingboard.com/gear/bags.html').should('contain', '/gear/bags')

        cy.get('a[href*="/driven-backpack.html"]').contains('Driven Backpack').click()

        
        //todo finalise the test
    })
})