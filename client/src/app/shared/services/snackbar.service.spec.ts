import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { SharedModule } from '../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('SnackbarService', () => {
    let service: SnackbarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule],
        });
        service = TestBed.inject(SnackbarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
