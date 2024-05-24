describe('Site Magento', () => {

    it.skip('Create an Account', () => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.get('li').eq(2).click()
        cy.url('https://magento.softwaretestingboard.com/customer/account/create/').should('contain', 'account/create')
        cy.get('[title="First Name"]').type('John')
        cy.get('[title="Last Name"]').type('Doe')
        cy.get('[title="Email"]').type('johnd@google.fr')
        cy.get('[title="Password"]').type('Password123')
        cy.get('[title="Confirm Password"]').type('Password123')
        cy.get('[title="Create an Account"]').click()
        cy.url('https://magento.softwaretestingboard.com/customer/account/').should('contain', "customer/account")
        cy.get('[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').should('be.visible')
        cy.get('[data-ui-id="page-title-wrapper"]').should('be.visible').and('have.text', 'My Account')
        cy.get('p').eq(1).should('contain', 'John Doe\njohnd@google.fr\n')
    })

    it('Sign In', () => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.get('li').eq(1).click()
        cy.url('https://magento.softwaretestingboard.com/customer/account/login/referer').should('contain', '/account/login')
        cy.get('[title="Email"]').type('johnd@google.fr')
        cy.get('[title="Password"]').type('Password123')
        cy.wait(1000)
        cy.get('#send2').click()
        cy.url('https://magento.softwaretestingboard.com/')
        cy.get('#ui-id-8').click()
        cy.url('https://magento.softwaretestingboard.com/sale.html').should('contain', '/sale')
        // click through to next page not working
        cy.get('li.item').eq(14).click();
        cy.url('https://magento.softwaretestingboard.com/gear/bags.html')
    })
})