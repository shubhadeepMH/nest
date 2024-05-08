import { format } from 'date-fns';

 let formattedDateTime=(date)=>{
    return format(new Date(date), "MMMM dd, yyyy h:mm a");
 }

 export default formattedDateTime