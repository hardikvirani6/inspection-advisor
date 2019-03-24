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

#ifndef AdobePublishActivityProjectFeatureHeader
#define AdobePublishActivityProjectFeatureHeader

NS_ASSUME_NONNULL_BEGIN

@class AdobePublishGallery;
@class AdobePublishUser;

/**
 `AdobePublishActivityProjectFeature` is a subclass of `AdobePublishActivityActionItem` and represents an activity item for projects that were featured in a gallery.
 */
@interface AdobePublishActivityProjectFeature : AdobePublishActivityActionItem

/**
 The gallery that featured the project
 */
@property (nonatomic, strong) AdobePublishGallery * gallery;

/**
 An array of `AdobePublishUser` users who have appreciated the project and are followed by the current user
 */
@property (nonatomic, strong) NSArray<AdobePublishUser *> * appreciators;

@end

NS_ASSUME_NONNULL_END

#endif
