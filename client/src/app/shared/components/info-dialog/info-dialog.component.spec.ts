import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDialogComponent } from './info-dialog.component';
import { SharedModule } from '../../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('InfoDialogComponent', () => {
    let component: InfoDialogComponent;
    let fixture: ComponentFixture<InfoDialogComponent>;

    beforeEach(async () => {
        const mockDialogRef = {
            close: jasmine.createSpy('close'),
        };

        const mockDialogData = {};

        await TestBed.configureTestingModule({
            declarations: [InfoDialogComponent],
            imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(InfoDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
