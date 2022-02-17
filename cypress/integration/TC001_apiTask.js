/// <reference types="cypress" />

describe('MLS QA Testing TASK-API', () => {
  before(() => {
    cy.clearCookies({ log: false })
    cy.clearLocalStorage({ log: false })
    cy.fixture('dataAPI').then(data => {
      globalThis.data = data
    })
  })

  it('Create operation of the post', () => {
    cy.request({
      method: 'POST',
      url: `${data.hostUrl}/posts`,
      body: JSON.stringify({
        title: `${data.resp.createTitle}`,
        body: `${data.resp.createBody}`,
        userId: `${data.userId}`,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(response => {
      expect(response.status).to.eq(201)
      expect(response.statusText).to.eq('Created')
      assert.equal(response.body.userId, data.userId)
      const resTitle = response.body.title
      expect(resTitle).to.eq('Title Create test user 4')
      const resBody = response.body.body
      expect(resBody).to.eq('Body Create test user 4')
    })
  })

  it('Read operation of the post', () => {
    cy.request({
      method: 'GET',
      url: `${data.hostUrl}/posts/${data.userId}`,
    }).then(response => {
      assert.isNotEmpty(response.body)
      expect(response.status).to.eq(200)
      const resUserId = response.body.id
      expect(resUserId).to.eq(4)
      const resTitle = response.body.title
      expect(resTitle).to.eq('eum et est occaecati')
    })
  })

  it('Update operation of the post', () => {
    cy.request({
      method: 'PUT',
      url: `${data.hostUrl}/posts/${data.userId}`,
      body: JSON.stringify({
        id: 4,
        title: `${data.resp.updateTitle}`,
        body: `${data.resp.updateBody}`,
        userId: 4,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.statusText).to.eq('OK')
      const resId = response.body.id
      expect(resId).to.eq(4)
      const resUserId = response.body.userId
      expect(resUserId).to.eq(4)
      const resTitle = response.body.title
      expect(resTitle).to.eq('Title Update test user 4')
      const resBody = response.body.body
      expect(resBody).to.eq('Body Update test user 4')
    })
  })

  it('Read operation of the post', () => {
    cy.request({
      method: 'DELETE',
      url: `${data.hostUrl}/posts/${data.userId}`,
    }).then(response => {
      assert.isEmpty(response.body)
      expect(response.status).to.eq(200)
    })
  })
  //Important: resource will not be really updated on the server but it will be faked as if.
})
