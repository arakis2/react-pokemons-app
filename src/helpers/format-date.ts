import { format } from "date-fns";

//  const formatDate = (date: Date): string => {
//   return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` // Ouch ! c'est moche ! C'est sur le tuto mais les jours et/ou mois sur 1 position c'est pas possible !
//  }

const formatDate = (date: Date): string => {
    return format(date, 'dd/MM/yyyy');
}

export default formatDate;