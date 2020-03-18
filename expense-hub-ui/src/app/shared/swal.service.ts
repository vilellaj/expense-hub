import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class SwalService {
    constructor() {

    }

    success(title, text) {
        Swal.fire({
            icon: 'success',
            title,
            text
        })
    }

    error(title, text) {
        Swal.fire({
            icon: 'error',
            title,
            text
        })
    }
}
