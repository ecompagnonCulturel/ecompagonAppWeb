import { SessObjectPipe } from './sess-object.pipe';

describe('SessObjectPipe', () => {
  it('create an instance', () => {
    const pipe = new SessObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
