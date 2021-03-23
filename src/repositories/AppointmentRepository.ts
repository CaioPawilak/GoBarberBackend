import Appointment from '../model/Appointments';
import {isEqual} from 'date-fns'

interface CreateAppointmentDTO{

    provider : string;

    date: Date;
}

class AppointmentRepository {
    private appointments: Appointment[]
    constructor() {
        this.appointments = [];
    }
    public all():Appointment[]{
        return this.appointments;
    }
    public FindByDate(date : Date):Appointment | null{
        const appointmentInSameHour = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        )
            return appointmentInSameHour || null
    }
    public CreateAppointment({provider, date}:CreateAppointmentDTO):Appointment{
        const appointment = new Appointment({provider,date});

        this.appointments.push(appointment)

        return appointment
    }
}

export default AppointmentRepository;
