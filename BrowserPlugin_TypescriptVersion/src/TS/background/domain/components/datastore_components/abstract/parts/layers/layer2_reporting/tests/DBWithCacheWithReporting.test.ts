import "mockzilla-webextension";
import {
    DBWithCacheWithReporting_StoreDummy,
    extractStoreObjectReportExample,
    StoreObjectInterfaceExample,
    StoreObjectUpdateReportInterfaceExample
} from "../../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DBWithCacheWithReporting_StoreDummy";
import {ID_TYPE} from "../../layer0_db/store_object/StoreObject_Types";
import {DeleteReport, InsertReport} from "../reports/dtos/IndividualReports";
require("fake-indexeddb/auto");


describe("DBWithCacheWithReporting_StoreDummy", function() {

    describe("reportAddedObject", function() {
        it('should add object to new objects report', async () => {
            let storeInstance = DBWithCacheWithReporting_StoreDummy.builder<
                StoreObjectInterfaceExample,
                StoreObjectUpdateReportInterfaceExample
            >({extractReportInformationFunc: extractStoreObjectReportExample});

            let testData: StoreObjectInterfaceExample = {
                id: 0,
                key: "testKey",
                dataToHaveForUpdateReport: "testdata",
                otherDate: "otherdata"
            }
            let testDataReport: StoreObjectUpdateReportInterfaceExample = {
                id: 0,
                key: "testKey",
                dataToHaveForUpdateReport: "testdata",
            }
            // when
            storeInstance.reportAddedObject(testData)
            // then
            // expect(returnedResult).toBe(1)
            let newObjsReport = storeInstance.newObjectAddedReports
            expect(newObjsReport.size).toBe(1)
            expect(newObjsReport.get(testData.id)).toMatchObject(testDataReport)
        });
    });

    describe("reportUpdateObject", function() {
        it('if object is not in new objects report -> should add update to update report', async () => {
            let ogDataWillTryToUpdate: StoreObjectInterfaceExample = {
                id: 1,
                key: "testKey",
                dataToHaveForUpdateReport: "1234",
                otherDate: "otherdata"
            }
            let sampleInitialUpdateReports: InsertReport<StoreObjectUpdateReportInterfaceExample> =
                new Map([[ogDataWillTryToUpdate.id, ogDataWillTryToUpdate]])

            let dbReportController = await DBWithCacheWithReporting_StoreDummy.builder(
                {
                    extractReportInformationFunc: extractStoreObjectReportExample,
                    newObjectAddedReports: new Map<ID_TYPE, StoreObjectUpdateReportInterfaceExample>(),
                    updatedObjectReports: sampleInitialUpdateReports,
                    deletedObjectReports: new Set<ID_TYPE>()
                }
            );

            let updatedObject: StoreObjectInterfaceExample = {
                id: 1,
                key: "testKey",
                dataToHaveForUpdateReport: "5678",
                otherDate: "otherdata"
            }
            // when
            dbReportController.reportUpdateObject(updatedObject)

            // then
            let updatedObjReport: StoreObjectUpdateReportInterfaceExample = {
                id: 1,
                key: "testKey",
                dataToHaveForUpdateReport: "5678"
            }
            let updatedObjsReport = dbReportController.updatedObjectReports

            expect(updatedObjsReport.size).toBe(1)
            expect(updatedObjsReport.get(ogDataWillTryToUpdate.id)).toMatchObject(updatedObjReport)
        });

        it("if object is in new objects added report -> then update that new objects report and not the update report", () => {
            let ogDataWillTryToUpdate: StoreObjectInterfaceExample = {
                id: 1,
                key: "testKey",
                dataToHaveForUpdateReport: "1234",
                otherDate: "otherdata"
            }
            let sampleInitialUpdateReports: InsertReport<StoreObjectUpdateReportInterfaceExample> =
                new Map([[ogDataWillTryToUpdate.id, ogDataWillTryToUpdate]])

            let dbReportController = DBWithCacheWithReporting_StoreDummy.builder(
                {
                    updatedObjectReports: sampleInitialUpdateReports,
                    extractReportInformationFunc: extractStoreObjectReportExample
                }
            );

            let updatedObject: StoreObjectInterfaceExample = {
                id: 1,
                key: "testKey",
                dataToHaveForUpdateReport: "5678",
                otherDate: "otherdata"
            }
            // when
            dbReportController.reportUpdateObject(updatedObject)

            // then
            let updatedObjReport: StoreObjectUpdateReportInterfaceExample = {
                id: 1,
                key: "testKey",
                dataToHaveForUpdateReport: "5678"
            }
            let updatedObjsReport = dbReportController.updatedObjectReports

            expect(updatedObjsReport.size).toBe(1)
            expect(updatedObjsReport.get(ogDataWillTryToUpdate.id)).toMatchObject(updatedObjReport)
        })
    });

    describe("reportDeletedObject", function() {
        it('if object mutation to report is in any of the other report -> should add delete to delete report', async () => {
            let dataWillTryToDelete = {
                id: 1,
                key: "testKey",
                dataToHaveForUpdateReport: 1234
            }
            let dbReportController = DBWithCacheWithReporting_StoreDummy.builder<
                StoreObjectInterfaceExample,
                StoreObjectUpdateReportInterfaceExample
            >({extractReportInformationFunc: extractStoreObjectReportExample});

            // when
            dbReportController.reportDeletedObject(dataWillTryToDelete.id)

            // then
            let deletedObjsReport = dbReportController.deletedObjectReports
            expect(deletedObjsReport.size).toBe(1)
            expect(deletedObjsReport.has(dataWillTryToDelete.id)).toBe(true)
        })

        it("if object mutation to report is in new objects added report -> remove from this list and dont add to delete report", () => {
            let dataWillTryToDelete = {
                id: 1,
                key: "testKey",
                dataToHaveForUpdateReport: "1234"
            }
            let sampleInitialAddedObjReports: InsertReport<StoreObjectUpdateReportInterfaceExample> =
                new Map([[dataWillTryToDelete.id, dataWillTryToDelete]]
            )

            let dbReportController = DBWithCacheWithReporting_StoreDummy.builder<
                StoreObjectInterfaceExample,
                StoreObjectUpdateReportInterfaceExample
            >({
                newObjectAddedReports: sampleInitialAddedObjReports,
                extractReportInformationFunc: extractStoreObjectReportExample
            });
            expect(dbReportController.newObjectAddedReports.size).toBe(1)

            // when
            dbReportController.reportDeletedObject(dataWillTryToDelete.id)
            // then
            expect(dbReportController.newObjectAddedReports.size).toBe(0)
        })

        it("if object mutation to report is in updated objs report -> remove from this report and add to delete report", () => {
            let dataWillTryToDelete = {
                id: 1,
                key: "testKey",
                dataToHaveForUpdateReport: "1234"
            }
            let sampleInitialUpdateReports: InsertReport<StoreObjectUpdateReportInterfaceExample> =
                new Map([[dataWillTryToDelete.id, dataWillTryToDelete]]
            )

            let dbReportController = DBWithCacheWithReporting_StoreDummy.builder(
                {
                    newObjectAddedReports: new Map<ID_TYPE, StoreObjectUpdateReportInterfaceExample>(),
                    updatedObjectReports: sampleInitialUpdateReports,
                    deletedObjectReports: new Set<ID_TYPE>(),
                    extractReportInformationFunc: extractStoreObjectReportExample
                }
            )

            // when
            dbReportController.reportDeletedObject(dataWillTryToDelete.id)

            // then
            expect(dbReportController.updatedObjectReports.size).toBe(0)
            expect(dbReportController.deletedObjectReports.size).toBe(1)
            expect(dbReportController.deletedObjectReports.has(dataWillTryToDelete.id)).toBe(true)
        })
    });

})