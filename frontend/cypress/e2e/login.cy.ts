describe('Connexion', () => {
    it('l’utilisateur peut se connecter', () => {
        cy.visit('http://localhost:4173/login');

        cy.get('input[type=email]').type('test@example.com');
        cy.get('input[type=password]').type('password123');
        cy.get('button[type=submit]').click();

        cy.contains('Bienvenue'); // détecte du texte sur la page
    });
});
