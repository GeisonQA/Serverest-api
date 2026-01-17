import { test, expect } from '@playwright/test'
import { userPayload } from '../../support/factories/user'
import { requisitionService } from '../../support/services/requisition'
import { usuariosServices } from '../../support/services/requisition'

test.describe('POST /usuarios', () => {
    let requisition;
    test.beforeEach(({ request }) => {
        requisition = requisitionService(request)
    })

    test('Deve permitir cadastrar um novo usuario', async ({ request }) => {
        const payloadDinamico = userPayload();

        const response = await requisition.requisition(payloadDinamico)
        expect(response.status()).toBe(201);

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Cadastro realizado com sucesso')
        expect(body).toHaveProperty('_id')
        expect(body).not.toHaveProperty('password')

    })

    test('Não deve permitir cadastrar um usuário com email já existente', async ({ request }) => {
        const payloadDinamico = userPayload();

        const preCondition = await requisition.requisition(payloadDinamico)
        expect(preCondition.status()).toBe(201);

        const response = await requisition.requisition(payloadDinamico)
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('message', 'Este email já está sendo usado')

    })

    test('Não deve permitir cadastrar um email inválido', async ({ request }) => {
        const payloadDinamico = userPayload();

        const response = await requisition.requisition({ ...payloadDinamico, email: 'geison.souza$teste' })
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('email', 'email deve ser um email válido')

    })

    test('Não deve permitir cadastrar sem informar nome', async ({ request }) => {
        const payloadDinamico = userPayload();

        const response = await requisition.requisition({ ...payloadDinamico, nome: '' })
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('nome', 'nome não pode ficar em branco')

    })

    test('Não deve permitir cadastrar sem informar senha', async ({ request }) => {
        const payloadDinamico = userPayload();

        const response = await requisition.requisition({ ...payloadDinamico, password: '' })
        expect(response.status()).toBe(400)

        const body = await response.json();
        expect(body).toHaveProperty('password', 'password não pode ficar em branco');

    })

})

test.describe('GET /usuarios', () => {
    let requisition;
    test.beforeEach(({ request }) => {
        requisition = usuariosServices(request);
    })

    test('Deve listar o usuario por ID válido', async ({ request }) => {
        const payloadDinamico = userPayload()

        const createService = requisitionService(request);

        const createResp = await createService.requisition(payloadDinamico);
        expect(createResp.status()).toBe(201);

        const createBody = await createResp.json();
        const userId = createBody._id;

        const response = await requisition.getUsuarioById(userId);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('_id', userId);
        expect(body).toHaveProperty('nome', payloadDinamico.nome);
        expect(body).toHaveProperty('email', payloadDinamico.email);



    })

    test.only('Não deve listar o usuario por ID inválido', async ({ request }) => {

        const invalidId = 'naSt3CW8S2xmXYxG'

        const response = await requisition.getUsuarioById(invalidId)
        expect(response.status()).toBe(400)

        const body = response.json()
        expect(body.message).toBe('Usuário não encontrado');

    })



});