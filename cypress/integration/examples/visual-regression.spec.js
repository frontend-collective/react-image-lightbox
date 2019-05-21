/* eslint-disable no-undef */
// / <reference types="Cypress" />

describe('Visual testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/');
  })

  afterEach(() => {
    cy.eyesClose();
  })

  it('shows the landing page', () => {
    cy.eyesOpen({
      appName: 'React Image Lightbox',
      testName: 'Shows the landing page',
      browser: [{width: 1024, height: 768, name: 'chrome'}],
    });
    cy.eyesCheckWindow('Landing page');
  })

  it('opens the modal to view photos', () => {
    cy.eyesOpen({
      appName: 'React Image Lightbox',
      testName: 'opens the modal',
      browser: [{width: 1024, height: 768, name: 'chrome'}],
    });
    cy.get('#open-lightbox').click();
    cy.wait(100);
    cy.eyesCheckWindow('Opens the modal');
  })

  it('closes the modal', () => {
    cy.eyesOpen({
      appName: 'React Image Lightbox',
      testName: 'Closes the modal',
      browser: [{width: 1024, height: 768, name: 'chrome'}],
    });
    cy.get('#open-lightbox').click();
    cy.get('button.ril-close').click();
    cy.wait(100);
    cy.eyesCheckWindow('Closes the modal');
  })

  it('clicks next', () => {
    cy.eyesOpen({
      appName: 'React Image Lightbox',
      testName: 'scrolls to next images',
      browser: [{width: 1024, height: 768, name: 'chrome'}],
    });
    cy.get('#open-lightbox').click();
    cy.get('button.ril-next-button').click();
    cy.wait(100);
    cy.eyesCheckWindow('Clicks next button');
  })

  it('clicks prev', () => {
    cy.eyesOpen({
      appName: 'React Image Lightbox',
      testName: 'scrolls to previous images',
      browser: [{width: 1024, height: 768, name: 'chrome'}],
    });
    cy.get('#open-lightbox').click();
    cy.get('button.ril-prev-button').click();
    cy.wait(100);
    cy.eyesCheckWindow('Clicks previous button');
  })

  it('zooms in to an image', () => {
    cy.eyesOpen({
      appName: 'React Image Lightbox',
      testName: 'zoom in to images',
      browser: [{width: 1024, height: 768, name: 'chrome'}],
    });
    cy.get('#open-lightbox').click();
    cy.wait(100);
    cy.get('.ril-zoom-in').click();
    cy.wait(100);
    cy.eyesCheckWindow('Zoom in');
  })

  it('zooms out', () => {
    cy.eyesOpen({
      appName: 'React Image Lightbox',
      testName: 'zoom out of images',
      browser: [{width: 1024, height: 768, name: 'chrome'}],
    });
    cy.get('#open-lightbox').click();
    cy.get('.ril-zoom-in').click();
    cy.wait(100);
    cy.get('.ril-zoom-out').click();
    cy.wait(100);
    cy.eyesCheckWindow('Zoom out');
  });
});
