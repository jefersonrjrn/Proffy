export default function convertHourToMinutes(time: string) {
    // Formato do "time": "8:00"
    const [hour, minutes] = time.split(':').map(Number); //Converte pra number

    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}