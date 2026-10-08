import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { PropertyStore } from '../../core/property.store';
import { NewPropertyPage } from './new-property-page';

describe('NewPropertyPage', () => {
  it('adds a properti and creates its rooms from the form', async () => {
    localStorage.setItem('rentora-initialized-v1', '1');
    localStorage.setItem('rentora-owner-mvp-v1', '{"properties":[],"payments":[]}');
    await TestBed.configureTestingModule({
      imports: [NewPropertyPage],
      providers: [provideRouter(routes)],
    }).compileComponents();

    const fixture = TestBed.createComponent(NewPropertyPage);
    fixture.detectChanges();
    await fixture.whenStable();
    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs[0].value = 'Taman Raya';
    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = 'Bandung';
    inputs[1].dispatchEvent(new Event('input'));
    inputs[2].value = '6';
    inputs[2].dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.name).toBe('Taman Raya');
    expect(fixture.componentInstance.location).toBe('Bandung');
    expect(fixture.componentInstance.units).toBe(6);

    fixture.nativeElement
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();

    const properti = TestBed.inject(PropertyStore).properties().at(-1);
    expect(properti?.name).toBe('Taman Raya');
    expect(properti?.rooms).toHaveLength(6);
  });
});
