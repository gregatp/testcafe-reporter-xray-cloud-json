const fs = require('fs');

let currentTest = {};

module.exports = function () {
    return {
        xrayReport: {
            info:  {},
            tests: []
        },

        noColors: true,

        reportTaskStart (startTime, userAgents/*, testCount*/) {
            const environments = String(userAgents).replace(/\d|\.| /g, '').split(',');

            this.xrayReport.info.testPlanKey = '';
            this.xrayReport.info.summary = 'Execution of automated tests through testCafe';
            this.xrayReport.info.description = 'This execution is automatically generated using our Framework';
            this.xrayReport.info.testEnvironments = environments;
            this.xrayReport.info.startDate = this.moment(startTime).format('YYYY-MM-DDThh:mm:ssZ');
        },

        reportFixtureStart ( /*name, path */) {
            // throw new Error('Not implemented');
        },

        async reportTestStart ( /*name, testMeta*/) {
            // NOTE: This method is optional.
        },

        async reportTestDone (name, testRunInfo, meta) {
            let testStatus = 'TODO';
            const currentEvidences = {};

            const testStartDate = new Date();

            currentTest.testKey = meta.testId;

            if (!testRunInfo.skipped && JSON.stringify(testRunInfo.errs).replace(/[[\]]/g, '').length > 0) {
                testStatus = 'FAILED';
                currentTest.evidences = [];

                for (var i in testRunInfo.screenshots) {
                    currentEvidences.data = fs.readFileSync(testRunInfo.screenshots[i].screenshotPath, 'base64');
                    currentEvidences.filename = testRunInfo.screenshots[i].screenshotPath;
                    currentEvidences.contentType = 'image/png';
                    currentTest.evidences.push(JSON.parse(JSON.stringify(currentEvidences)));
                }
                testRunInfo = 'Execution failed.';
            }
            else {
                testRunInfo = 'Test executed without any error';
                testStatus = 'PASSED';
            }
            currentTest.comment = testRunInfo;
            currentTest.status = testStatus;
            currentTest.start = this.moment(testStartDate).format('YYYY-MM-DDThh:mm:ssZ');
            currentTest.finish = this.moment(testStartDate).add(testRunInfo.durationMs, 'ms').format('YYYY-MM-DDThh:mm:ssZ');
            delete currentTest.comment.errs;
            this.xrayReport.tests.push(JSON.parse(JSON.stringify(currentTest)));
            currentTest = {};
        },

        reportTaskDone (endTime /*, passed, warnings*/) {
            this.xrayReport.info.finishDate = this.moment(endTime).format('YYYY-MM-DDThh:mm:ssZ');
            this.write(JSON.stringify(this.xrayReport, null, 1));
        }
    };
};
