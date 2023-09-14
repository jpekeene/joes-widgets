import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersComponent } from './manufacturers.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphqlService } from '../../shared/services/graphql.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';

describe('ManufacturersComponent', () => {
    let component: ManufacturersComponent;
    let fixture: ComponentFixture<ManufacturersComponent>;

    let mockGraphqlService: any;
    let mockSnackBarService: any;
    let mockRouter: any;
    let mockDialog: any;

    let mockActivatedRoute: any;

    beforeEach(async () => {
        mockGraphqlService = jasmine.createSpyObj(['getManufacturers', 'getWidgetTypes', 'getWidgets', 'deleteWidget']);
        mockSnackBarService = jasmine.createSpyObj(['openSnackBar']);
        mockRouter = jasmine.createSpyObj(['navigate']);
        mockDialog = jasmine.createSpyObj(['open']);
        mockActivatedRoute = {
            queryParams: of({}),
        };

        mockGraphqlService.getManufacturers.and.returnValue(of([{}]));
        mockGraphqlService.getWidgetTypes.and.returnValue(of([{}]));
        mockGraphqlService.getWidgets.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            declarations: [ManufacturersComponent],
            imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule],
            providers: [
                { provide: GraphqlService, useValue: mockGraphqlService },
                { provide: Apollo, useValue: mockGraphqlService },
                { provide: SnackbarService, useValue: mockSnackBarService },
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockDialog },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ManufacturersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
