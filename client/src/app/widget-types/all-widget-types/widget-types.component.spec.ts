import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { WidgetTypesComponent } from './widget-types.component';
import { GraphqlService } from '../../shared/services/graphql.service';
import { SharedModule } from '../../shared/shared.module';

describe('WidgetTypesComponent', () => {
    let component: WidgetTypesComponent;
    let fixture: ComponentFixture<WidgetTypesComponent>;

    let mockGraphqlService: any;
    let mockSnackBarService: any;
    let mockRouter: any;
    let mockDialog: any;

    let mockActivatedRoute: any;
    let mockLocationStrategy: any;

    beforeEach(async () => {
        mockLocationStrategy = {
            prepareExternalUrl: jasmine.createSpy('prepareExternalUrl').and.returnValue(''),
        };
        mockGraphqlService = jasmine.createSpyObj(['getWidgetTypes', 'getWidgets', 'deleteWidget']);
        mockSnackBarService = jasmine.createSpyObj(['openSnackBar']);
        mockRouter = {
            navigate: jasmine.createSpy('navigate'),
            createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue({}),
            events: of(new NavigationEnd(0, 'fakeUrl', 'fakeUrl')),
        };
        mockDialog = jasmine.createSpyObj(['open']);
        mockActivatedRoute = {
            queryParams: of({}),
        };

        mockGraphqlService.getWidgetTypes.and.returnValue(of([]));
        mockGraphqlService.getWidgets.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            declarations: [WidgetTypesComponent],
            imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule],
            providers: [
                { provide: GraphqlService, useValue: mockGraphqlService },
                { provide: Apollo, useValue: mockGraphqlService },
                { provide: SnackbarService, useValue: mockSnackBarService },
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockDialog },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: LocationStrategy, useValue: mockLocationStrategy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(WidgetTypesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
