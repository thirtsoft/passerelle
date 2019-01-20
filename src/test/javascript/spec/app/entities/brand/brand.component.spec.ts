/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PasserelleTestModule } from '../../../test.module';
import { BrandComponent } from 'app/entities/brand/brand.component';
import { BrandService } from 'app/entities/brand/brand.service';
import { Brand } from 'app/shared/model/brand.model';

describe('Component Tests', () => {
    describe('Brand Management Component', () => {
        let comp: BrandComponent;
        let fixture: ComponentFixture<BrandComponent>;
        let service: BrandService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PasserelleTestModule],
                declarations: [BrandComponent],
                providers: []
            })
                .overrideTemplate(BrandComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BrandComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrandService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Brand(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.brands[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
