/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2017 Adobe Systems Incorporated
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

#import "AdobePublishBaseModel.h"
#import "AdobePublishProject.h"
#import "AdobePublishToolGallery.h"

#ifndef AdobePublishToolGalleryContentHeader
#define AdobePublishToolGalleryContentHeader

/**
 `AdobePublishToolGalleryContent` represents the data returned from an API call to get the content of an Adobe Creative Tools gallery on the Behance network.
 */
@interface AdobePublishToolGalleryContent : AdobePublishBaseModel

/**
 The gallery of the content.
 */
@property (nonnull, nonatomic, strong) AdobePublishToolGallery * gallery;

/**
 The array of projects received.
 */
@property (nonnull, nonatomic, strong) NSArray<AdobePublishProject *> * projectEntities;

/**
 The ordinal of the entities used for pagination.
 */
@property (nonnull, nonatomic, strong) NSNumber * ordinal;

@end

#endif /* AdobePublishToolGalleryContentHeader */
