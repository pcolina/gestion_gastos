import { Observable } from 'rxjs';


export abstract class DateHandlerRepository {
    abstract getCurrentDate(): string;

}
