/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2016 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of
 * Adobe Systems Incorporated and its suppliers, if any. The intellectual and
 * technical concepts contained herein are proprietary to Adobe Systems
 * Incorporated and its suppliers and are protected by trade secret or
 * copyright law. Dissemination of this information or reproduction of this
 * material is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 * THIS FILE IS PART OF THE CREATIVE SDK PUBLIC API
 *
 ******************************************************************************/

#import <UIKit/UIKit.h>
#import <AdobeCreativeSDKCore/AdobeCreativeSDKCore.h>

//! Project version number for AdobeCreativeSDKAssetModel.
FOUNDATION_EXPORT double AdobeCreativeSDKAssetModelVersionNumber;

//! Project version string for AdobeCreativeSDKAssetModel.
FOUNDATION_EXPORT const unsigned char AdobeCreativeSDKAssetModelVersionString[];

#import <AdobeCreativeSDKAssetModel/Adobe360ApplicationProperties.h>
#import <AdobeCreativeSDKAssetModel/Adobe360CloudAssetReference.h>
#import <AdobeCreativeSDKAssetModel/Adobe360Context.h>
#import <AdobeCreativeSDKAssetModel/Adobe360Error.h>
#import <AdobeCreativeSDKAssetModel/Adobe360Message.h>
#import <AdobeCreativeSDKAssetModel/Adobe360MessageBuilder.h>
#import <AdobeCreativeSDKAssetModel/Adobe360WorkflowAction.h>
#import <AdobeCreativeSDKAssetModel/Adobe360WorkflowActionDataSource.h>
#import <AdobeCreativeSDKAssetModel/Adobe360WorkflowDispatch.h>
#import <AdobeCreativeSDKAssetModel/Adobe360WorkflowError.h>
#import <AdobeCreativeSDKAssetModel/Adobe360WorkflowStorage.h>
#import <AdobeCreativeSDKAssetModel/AdobeAsset.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetAsyncRequest.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetCompFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetDrawFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetError.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetFileExtensions.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetFixFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetFolder.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetIllustratorFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetLineFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetMimeTypes.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetMixFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetPDFFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetPSDFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetPackage.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetPackagePages.h>
#import <AdobeCreativeSDKAssetModel/AdobeAssetSketchbook.h>
#import <AdobeCreativeSDKAssetModel/AdobeCollaborationType.h>
#import <AdobeCreativeSDKAssetModel/AdobeDesignLibraryUtils.h>
#import <AdobeCreativeSDKAssetModel/AdobeLibrary.h>
#import <AdobeCreativeSDKAssetModel/AdobeLibraryComposite.h>
#import <AdobeCreativeSDKAssetModel/AdobeLibraryDelegate.h>
#import <AdobeCreativeSDKAssetModel/AdobeLibraryElement.h>
#import <AdobeCreativeSDKAssetModel/AdobeLibraryElementFilter.h>
#import <AdobeCreativeSDKAssetModel/AdobeLibraryError.h>
#import <AdobeCreativeSDKAssetModel/AdobeLibraryManager.h>
#import <AdobeCreativeSDKAssetModel/AdobeLibraryRepresentation.h>
#import <AdobeCreativeSDKAssetModel/AdobePSDComposite.h>
#import <AdobeCreativeSDKAssetModel/AdobePSDCompositeBranch.h>
#import <AdobeCreativeSDKAssetModel/AdobePSDCompositeMutableBranch.h>
#import <AdobeCreativeSDKAssetModel/AdobePSDLayerComp.h>
#import <AdobeCreativeSDKAssetModel/AdobePSDLayerNode.h>
#import <AdobeCreativeSDKAssetModel/AdobePSDMutableLayerComp.h>
#import <AdobeCreativeSDKAssetModel/AdobePSDMutableLayerNode.h>
#import <AdobeCreativeSDKAssetModel/AdobePSDPreview.h>
#import <AdobeCreativeSDKAssetModel/AdobePSDRGBColor.h>
#import <AdobeCreativeSDKAssetModel/AdobePhoto.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoAsset.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoAssetRendition.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoAssetRevision.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoAsyncRequest.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoCatalog.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoCollection.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoError.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoPage.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoshopLayer.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoshopLayerComp.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoshopReader.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoshopRGBColor.h>
#import <AdobeCreativeSDKAssetModel/AdobePhotoTypes.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelection.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelectionAsset.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelectionAssetFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelectionAssetPSDFile.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelectionDrawAsset.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelectionLibraryAsset.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelectionLineAsset.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelectionPSDLayer.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelectionPhotoAsset.h>
#import <AdobeCreativeSDKAssetModel/AdobeSelectionSketchAsset.h>
#import <AdobeCreativeSDKAssetModel/AdobeSendToDesktopApplication.h>
#import <AdobeCreativeSDKAssetModel/AdobeSendToDesktopApplicationError.h>
