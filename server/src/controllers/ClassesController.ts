// Importando a tipagem do request e response do express pra utilizar nesse arquivo
import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {

    // Listagem das classes (o nome index é usado para listagem no padrâo MVC)
    async index(request: Request, response: Response) {

        // Pegando os filtros (query params)
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
        
        if(!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes',
            });
        }

        const timeInMinutes = convertHourToMinutes(time);

        // Acessando o banco com todos os filtros
        const classes = await db('classes') // Acessa tabela classes
            .whereExists(function() { //subquery
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) // ?? é o parâmetro que eu to passando, cada ?? é uma posição do array
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            // Procura na coluna subject se existe algum valor igual a subject
            .where('classes.subject', '=', subject)
            //Junta os dados da tabela users e classes, relacionados ao id do user
            .join('users', 'classes.user_id', '=', 'users.id')
            // Seleciona todos os dados contidos nas tabelas users e classes
            .select(['classes.*', 'users.*'])

        return response.json(classes);
    }

    // Criação de uma nova class
    async create(request: Request, response: Response) {

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body; //Os dados irão vir do corpo da requisição

        const trx = await db.transaction(); // Configuro a transaction

        // Tratamento de erros usando try/catch
        try {
            // Vou inserir os dados na tabela "users" do meu banco de dados
            const insertedUsersIds = await trx('users').insert({ // retorna array com IDs inseridos na tabela users
                name,
                avatar,
                whatsapp,
                bio,
            });

            const user_id = insertedUsersIds[0]; // Pegando o primeiro id

            // Vou inserir os dados na tabela "classes" do meu banco de dados
            const insertedClassesIds = await trx('classes').insert({ //retorna array com IDs inseridos na tabela classes
                subject,
                cost,
                user_id,
            });

            const class_id = insertedClassesIds[0];

            // schedule é um array de objetos, onde cada objeto é um horário diferente
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });

            // Vou inserir os dados na tabela "class-schedule" do meu banco de dados
            await trx('class_schedule').insert(classSchedule);

            await trx.commit(); // Caso todas as operações deem certo, é nesse momento que as
            // informações são inseridas no banco de dados

            return response.status(201).send(); // status 201 = sucesso

        } catch (err) {

            // Caso alguma alteração tenho sido feita antes do erro, o codigo abaixo desfaz
            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating a new class.',
            });
        }
    }
}