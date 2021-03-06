import { TapBark } from 'tap-bark';
import { TestSet, TestRunner } from 'alsatian';

(async () => {
    const testSet = TestSet.create();
    testSet.addTestsFromFiles('./**/*.spec.ts');

    const testRunner = new TestRunner();

    testRunner.outputStream
        .pipe(TapBark.create().getPipeable())
        .pipe(process.stdout);

    await testRunner.run(testSet);
})().catch((error) => {
    console.error(error);
    process.exit(1);
});