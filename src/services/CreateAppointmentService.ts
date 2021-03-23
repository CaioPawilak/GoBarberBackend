import Appointment from '../model/Appointments'
import AppointmentRepository from '../repositories/AppointmentRepository'
import { startOfHour } from 'date-fns'
import { response } from 'express';

interface Request {
    provider: string;
    date: Date;
}
class CreateAppointmentService {

    constructor(private appointmentsRepository: AppointmentRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: Request): Appointment | undefined{
        try {
            const appointmentDate = startOfHour(date);

            const appointmentInSameHour = this.appointmentsRepository.FindByDate(appointmentDate)

            if (appointmentInSameHour) {
                throw Error('Horário indisponível');
            }

            const appointment = this.appointmentsRepository.CreateAppointment({ provider, date: appointmentDate })

            return appointment;
        } catch (err) {
            response.status(400).json({ error : err.message })
        }
    }

}

export default CreateAppointmentService;
