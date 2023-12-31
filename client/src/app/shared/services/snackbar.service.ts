import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {}

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, { verticalPosition: 'bottom', duration: 1500, horizontalPosition: 'center' });
    }
}
