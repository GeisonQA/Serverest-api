import { faker } from '@faker-js/faker';

export const userPayload = () => {
    
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        nome: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        password: 'teste123',
        administrador: 'true'
    }
}