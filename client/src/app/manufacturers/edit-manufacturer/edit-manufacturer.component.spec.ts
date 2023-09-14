import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManufacturerComponent } from './edit-manufacturer.component';
import { of } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GraphqlService } from '../../shared/services/graphql.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

describe('EditManufacturerComponent', () => {
    let component: EditManufacturerComponent;
    let fixture: ComponentFixture<EditManufacturerComponent>;

    let mockGraphqlService: any;
    let mockSnackBarService: any;
    let mockRouter: any;
    let mockDialog: any;

    let mockActivatedRoute: any;

    beforeEach(async () => {
        mockGraphqlService = jasmine.createSpyObj(['getManufacturer', 'getWidgetTypes', 'getWidgets', 'deleteWidget']);
        mockSnackBarService = jasmine.createSpyObj(['openSnackBar']);
        mockRouter = jasmine.createSpyObj(['navigate']);
        mockDialog = jasmine.createSpyObj(['open']);
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: (key: string) => 'mockId',
                },
            },
        };

        mockGraphqlService.getManufacturer.and.returnValue(of([{}]));
        mockGraphqlService.getWidgetTypes.and.returnValue(of([{}]));
        mockGraphqlService.getWidgets.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            declarations: [EditManufacturerComponent],
            imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule],
            providers: [
                { provide: GraphqlService, useValue: mockGraphqlService },
                { provide: SnackbarService, useValue: mockSnackBarService },
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockDialog },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditManufacturerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
