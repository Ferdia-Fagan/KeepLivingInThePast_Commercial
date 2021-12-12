import "mockzilla-webextension";
require("fake-indexeddb/auto");

import {
    DBWithCacheWithReporting_StoreDummy,
    StoreObjectInterfaceExample,
    StoreObjectUpdateReportInterfaceExample
} from "./utils/DBWithCacheWithReporting_StoreDummy";
import {DBWithCache} from "../../../../src/background/datastores/abstract_object_store_parts/layers/cache/DBWithCache";
import IndexObject from "../../../../src/background/datastores/store_objects_interfaces/base_store_objects/IndexObject";
import DB from "../../../../src/background/datastores/abstract_object_store_parts/layers/db/DB";
import {DB_StoreDummy} from "./utils/DB_StoreDummy";

// jest.mock('../../../../src/background/datastores/abstract_object_store_parts/layers/cache/DBWithCache')
// const DBWithCache = require('../../../../src/background/datastores/abstract_object_store_parts/layers/cache/DBWithCache');
// TODO: tests for reporting
describe("DBWithCacheWithReporting_StoreDummy", function() {

    beforeAll(async() => {
        await DB_StoreDummy.builder(
            "test", 1, "test");
    })

    describe("addObject", function() {
        it('should add object to store and add to new objects report', async () => {
            let storeInstance = await DBWithCacheWithReporting_StoreDummy.builder(
                "test", 1, "test");

            let testData: StoreObjectInterfaceExample = {
                theKey: "testKey"
            }
            let dbWithCacheMockedAddObjectFunction = jest.spyOn(DBWithCache.prototype as any, "addObject")
            dbWithCacheMockedAddObjectFunction.mockReturnValueOnce(Promise.resolve(1))

            // when
            let returnedResult = await storeInstance.addObject(testData)
            // then
            expect(returnedResult).toBe(1)
            let report = storeInstance.reportingManager.newObjectAddedReports.getUpdateReport(false)
            expect(report.length).toBe(1)
            let expectedReport: StoreObjectInterfaceExample = {
                id: 1,
                theKey: "testKey"
            }
            expect(report.pop()).toMatchObject(expectedReport)
        });
    });

    describe("updateObject", function() {
        it('should update object in the store and add to update report', async () => {
            let dataWillTryToUpdate = {
                id: 1,
                theKey: "testKey",
                dataToHaveForUpdateReport: 1234
            }
            let testDataForDB = [
                dataWillTryToUpdate
            ]
            let testDataForCache = [
                {
                    id: 1,
                    theKey: "testKey"
                }
            ]

            // {
            //     id: 1,
            //         dataToHaveForUpdateReport: 1234
            // }

            let storeInstance = await DBWithCacheWithReporting_StoreDummy.builder(
                "test", 1, "test",
                testDataForDB, testDataForCache);

            let dbWithCacheMockedUpdateObjectFunction = jest.spyOn(DB.prototype as any, "updateObject")
            dbWithCacheMockedUpdateObjectFunction.mockReturnValueOnce(Promise.resolve(1))

            let updateData: StoreObjectInterfaceExample = {
                id: 1,
                theKey: "testKey",
                dataToHaveForUpdateReport: 5678 // changed
            }
            // when
            await storeInstance.updateObject(updateData)

            // then
            let report = storeInstance.reportingManager.updatedObjectReports.getUpdateReport(false)
            expect(report.length).toBe(1)
            let expectedReport = {
                id: 1,
                dataToHaveForUpdateReport: 5678
            }
            expect(report.pop()).toMatchObject(expectedReport)
        });
    });

    describe("deleteObjectById", function() {
        it('should delete object from store and add delete object to report', async () => {
            let dataWillTryToDelete = {
                id: 1,
                theKey: "testKey",
                dataToHaveForUpdateReport: 1234
            }
            let testDataForDb = [
                dataWillTryToDelete
            ]
            let storeInstance = await DBWithCacheWithReporting_StoreDummy.builder(
                "test", 1, "test",
                testDataForDb);

            let dbWithCacheMockedAddObjectFunction = jest.spyOn(DBWithCache.prototype as any, "addObject")
            dbWithCacheMockedAddObjectFunction.mockReturnValueOnce(Promise.resolve(1))

            // when
            storeInstance.deleteObjectById(1)
            // then
            let report = storeInstance.reportingManager.deletedObjectReports.getUpdateReport(false)
            expect(report.length).toBe(1)
            let expectedReport = 1
            let actualReport = report.pop()
            expect(actualReport).toBe(expectedReport)
        });
    });

})