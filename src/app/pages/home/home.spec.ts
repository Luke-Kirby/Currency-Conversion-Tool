import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { Currency } from '../../services/api-interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  //Example Currency data to test with
  const mockCurrencyUSD: Currency = {
    id: 1,
    name: 'United States Dollar',
    short_code: 'USD',
    code: 'USD',
    precision: 2,
    subunit: 100,
    symbol: '$',
    symbol_first: true,
    decimal_mark: '.',
    thousands_separator: ',',
  };

  const mockCurrencyEUR: Currency = {
    id: 2,
    name: 'Euro',
    short_code: 'EUR',
    code: 'EUR',
    precision: 2,
    subunit: 100,
    symbol: '€',
    symbol_first: true,
    decimal_mark: ',',
    thousands_separator: '.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        Home, // Because it's standalone
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the h1 title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent).toContain('Currency Converter');
  });

  it('should show warning notification if inputs are missing', () => {
    component.selectedFromCurr = null;
    component.selectedToCurr = null;
    component.fromAmount = null;

    component.calculateConversion();

    expect(component.notificationType).toBe('warning');
    expect(component.showNotification).toBeTrue();
  });

  it('should swap currencies and amounts', () => {
    component.selectedFromCurr = mockCurrencyUSD;
    component.selectedToCurr = mockCurrencyEUR;
    component.fromAmount = 100;
    component.toAmount = 90;

    component.swapCurrencies();

    expect(component.selectedFromCurr?.short_code).toBe('EUR');
    expect(component.selectedToCurr?.short_code).toBe('USD');
    expect(component.fromAmount).toBe(90);
    expect(component.toAmount).toBe(100);
  });
});
