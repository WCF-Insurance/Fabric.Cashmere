import { AutofocusDirective } from './autofocus-directive';

describe('AutofocusDirectiveDirective', () => {
  it('should create an instance', () => {
    const directive = new AutofocusDirective({nativeElement: {focus: () => {}}});
    expect(directive).toBeTruthy();
  });
});
