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

    it('Sign In', () => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.get('li').eq(1).click()
        cy.url('https://magento.softwaretestingboard.com/customer/account/login/referer').should('contain', '/account/login')
        cy.get('[title="Email"]').type(email)
        cy.get('[title="Password"]').type(pwd)
        cy.wait(1000)
        cy.get('#send2').click()
        cy.url('https://magento.softwaretestingboard.com/')
        cy.get('#ui-id-8').click()
        cy.url('https://magento.softwaretestingboard.com/sale.html').should('contain', '/sale')
        cy.get('a[href*="/gear/bags.html"]').contains('Bags').click({force:true});
        cy.url('https://magento.softwaretestingboard.com/gear/bags.html').should('contain', '/gear/bags')
      //Sélectionner un article
      cy.get('a[href*="/driven-backpack.html"]').contains('Driven Backpack').click({force:true});
      cy.url('https://magento.softwaretestingboard.com/pub/media/catalog/product/cache/7c4c1ed835fbbf2269f24539582c6d44/w/b/wb03-purple-0.jpg')
      //Cliquer sur Add to Cart
      cy.get('#product-addtocart-button').click()
      cy.wait(1000)
      //Cliquer sur minicarte
      cy.get('a[href*="/checkout/cart/"]', { timeout : 5000 })
      cy.url('https://magento.softwaretestingboard.com/checkout/cart/')
      cy.get('#top-cart-btn-checkout').click({force:true}) 

      cy.url('https://magento.softwaretestingboard.com/checkout/#shipping', { timeout: 1000 })
      //cy.get('[name="firstname"]').should('contain', {firstName})
      //cy.get('[name="lastname"]').should('contain', {lastName})
      cy.get('[name="street[0]"]', { timeout : 10000 }).type('1')
      cy.get('[name="street[1]"]').type('Rue du test')
      cy.get('[name="city"]').type('Bordeaux')
      cy.get('[name="country_id"]').select('France')
      cy.get('[name="region_id"]').select('Gironde')
      cy.get('[name="postcode"]').type('33000')
      cy.get('[name="telephone"]').type("0606069898")
      cy.get('[type="radio"]', { timeout : 5000 }).last().check()
      cy.get('[data-role="opc-continue"]').click({force:true})
      cy.get('[name="billing-address-same-as-shipping"]', { timeout : 5000 }).check()
      cy.get('[title="Place Order"]').click()
      cy.get('[data-ui-id="page-title-wrapper"]').should('have.text', "Thank you for your purchase!")
    })
})