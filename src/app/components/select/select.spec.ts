import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Select } from './select';
import { Currency } from '../../services/api-interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('Select Component', () => {
  let component: Select;
  let fixture: ComponentFixture<Select>;

  //Example Currency data to test with
  const mockCurrencies: Currency[] = [
    {
      id: 1,
      name: 'USD',
      short_code: 'USD',
      code: 'USD',
      precision: 2,
      subunit: 100,
      symbol: '$',
      symbol_first: true,
      decimal_mark: '.',
      thousands_separator: ',',
    },
    {
      id: 2,
      name: 'EUR',
      short_code: 'EUR',
      code: 'EUR',
      precision: 2,
      subunit: 100,
      symbol: '€',
      symbol_first: true,
      decimal_mark: ',',
      thousands_separator: '.',
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Select,
        NoopAnimationsModule, // required for Material animations
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Select);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct label', () => {
    component.label = 'Select currency';
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('mat-label');
    expect(label?.textContent).toContain('Select currency');
  });

  it('should display currency options when isLoading is false', () => {
    component.isLoading = false;
    component.data = mockCurrencies;
    fixture.detectChanges();

    const matSelect = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    expect(matSelect).toBeTruthy();

    // Open the mat-select dropdown
    matSelect.click();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(options.length).toBe(2);
    expect(options[0].nativeElement.textContent).toContain('USD');
    expect(options[1].nativeElement.textContent).toContain('EUR');
  });

  it('should emit selected currency on selectionChange', () => {
    spyOn(component.selectedCurr, 'emit');

    const selectedCurrency = mockCurrencies[1];
    component.onSelectionChange(selectedCurrency);

    expect(component.selectedCurr.emit).toHaveBeenCalledWith(selectedCurrency);
  });
});
