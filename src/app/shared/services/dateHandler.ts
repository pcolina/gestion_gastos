import { Injectable } from "@angular/core";
import { DateHandlerRepository } from "../repositories/dateHandler.repository";


@Injectable({
    providedIn: 'root',
})
export class DateHandlerService implements DateHandlerRepository {

    getCurrentDate() {
        return new Date().toString();

    }

}
