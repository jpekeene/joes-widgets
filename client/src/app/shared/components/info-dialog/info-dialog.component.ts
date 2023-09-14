import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface InfoDialogData {
    header: string;
    bodyText: string;
    buttons?: {
        denyText?: string;
        confirmText?: string;
    };
}

@Component({
    selector: 'app-info-dialog',
    templateUrl: './info-dialog.component.html',
    styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit {
    public dialogData: InfoDialogData;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: InfoDialogData,
        private dialogRef: MatDialogRef<InfoDialogComponent>,
    ) {}

    ngOnInit() {
        this.dialogData = this.data;
    }

    public close() {
        this.dialogRef.close();
    }
    public submit() {
        this.dialogRef.close({ submit: true });
    }
}
