import { TestBed } from '@angular/core/testing';

import { GraphqlService } from './graphql.service';
import { SharedModule } from '../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackbarService } from './snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

describe('GraphqlService', () => {
    let service: GraphqlService;

    let mockGraphqlService: any;
    let mockSnackBarService: any;
    let mockRouter: any;
    let mockDialog: any;

    let mockActivatedRoute: any;

    beforeEach(() => {
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
        TestBed.configureTestingModule({
            imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule],
            providers: [
                { provide: GraphqlService, useValue: mockGraphqlService },
                { provide: SnackbarService, useValue: mockSnackBarService },
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockDialog },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        });
        service = TestBed.inject(GraphqlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
