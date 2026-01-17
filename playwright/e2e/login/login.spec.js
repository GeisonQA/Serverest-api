import { test, expect } from '@playwright/test'
import { userPayload } from '../../support/factories/user'
import { requisitionService } from '../../support/services/requisition'
import { loginService } from '../../support/services/requisition'



test.describe('POST /login', () => {

    let requisition;
    let login;

    test.beforeEach(({ request }) => {
        requisition = requisitionService(request)
        login = loginService(request)
    })

    test('Deve realizar login com sucesso', async ({ request }) => {
        const payloadDinamico = userPayload()

        const preCondition = await requisition.requisition(payloadDinamico)
        expect(preCondition.status()).toBe(201)

        const response = await login.requisitionLogin({
            email: payloadDinamico.email,
            password: payloadDinamico.password
        })
        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Login realizado com sucesso')
        expect(body).toHaveProperty('authorization')
    })

     test('Não deve realizar login com senha inválidas', async ({ request }) => {
        const payloadDinamico = userPayload();

        const preCondition = await requisition.requisition(payloadDinamico)
        expect(preCondition.status()).toBe(201)

        const response = await login.requisitionLogin({
            email: payloadDinamico.email,
            password: 'wrongpassword'
        })
        expect(response.status()).toBe(401)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Email e/ou senha inválidos')
        
    })

    test('Não deve realizar login com email inválido', async ({ request }) => {
        const payloadDinamico = userPayload()

        const preCondition = await requisition.requisition(payloadDinamico)
        expect(preCondition.status()).toBe(201)

        const response = await login.requisitionLogin({
            email:  'geisonQA%gmail.com.br',
            password: payloadDinamico.password
        })
        expect(response.status()).toBe(400)

        const body = await response.json()
        expect(body).toHaveProperty('email', 'email deve ser um email válido')
        
    })

    test('Não deve realizar login com o campo email vazio', async ({ request }) => {
        const payloadDinamico = userPayload();

        const preCondition = await requisition.requisition(payloadDinamico)
        expect(preCondition.status()).toBe(201)

        const response = await login.requisitionLogin({
            email:  '',
            password: payloadDinamico.password
        })
        expect(response.status()).toBe(400)

        const body = await response.json()
        expect(body).toHaveProperty('email', 'email não pode ficar em branco')
        
    })

     test('Não deve realizar login com o campo password vazio', async ({ request }) => {
        const payloadDinamico = userPayload();

        const preCondition = await requisition.requisition(payloadDinamico)
        expect(preCondition.status()).toBe(201)

        const response = await login.requisitionLogin({
            email:  payloadDinamico.email,
            password: ''
        })
        expect(response.status()).toBe(400);

        const body = await response.json()
        expect(body).toHaveProperty('password', 'password não pode ficar em branco')
        
    })

})