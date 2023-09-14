import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWidgetTypeComponent } from './edit-widget-type.component';
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

describe('EditWidgetTypeComponent', () => {
    let component: EditWidgetTypeComponent;
    let fixture: ComponentFixture<EditWidgetTypeComponent>;

    let mockGraphqlService: any;
    let mockSnackBarService: any;
    let mockRouter: any;
    let mockDialog: any;

    let mockActivatedRoute: any;
    let mockApollo: any;

    beforeEach(async () => {
        mockApollo = jasmine.createSpyObj('Apollo', ['someMethod1', 'someMethod2']);

        mockGraphqlService = jasmine.createSpyObj(['getManufacturer', 'getWidgetType', 'getWidgets', 'deleteWidget']);
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
        mockGraphqlService.getWidgetType.and.returnValue(of([{}]));
        mockGraphqlService.getWidgets.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            declarations: [EditWidgetTypeComponent],
            imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule],
            providers: [
                { provide: Apollo, useValue: mockApollo },
                { provide: GraphqlService, useValue: mockGraphqlService },
                { provide: SnackbarService, useValue: mockSnackBarService },
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockDialog },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditWidgetTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
