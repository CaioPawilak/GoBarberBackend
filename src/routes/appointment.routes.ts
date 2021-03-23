import { Router } from 'express';
import {parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response)=>{
    const appointment = appointmentsRepository.all();
return response.status(201).json(appointment)
})

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const a = parseISO(date)

    const creteAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = creteAppointment.execute({provider, date :a})

    return response.json({ appointment });
});

export default appointmentsRouter;
