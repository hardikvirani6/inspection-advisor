/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2013 Adobe Systems Incorporated
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

#ifndef AdobePublishCuratedGalleryHeader
#define AdobePublishCuratedGalleryHeader

NS_ASSUME_NONNULL_BEGIN

/**
 `AdobePublishCuratedGallery` represents a curated gallery on the Behance network.
 */
@interface AdobePublishCuratedGallery : AdobePublishGallery

/**
 The queues of this curated gallery
 */
@property (nullable, nonatomic, strong) NSArray<AdobePublishCuratedGallery *> * queues;

/**
 The parent gallery id of this curated gallery
 */
@property (nullable, nonatomic, strong) NSNumber * parentId;

@end

NS_ASSUME_NONNULL_END

#endif
