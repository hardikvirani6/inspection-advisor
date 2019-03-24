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

#ifndef AdobePublishPublishingHeader
#define AdobePublishPublishingHeader

NS_ASSUME_NONNULL_BEGIN

@protocol AdobePublishProjectDelegate;
@protocol AdobePublishWIPDelegate;

@class AdobePublishProjectSpecs;
@class AdobePublishWIPSpecs;

/**
 `AdobePublish` is the base class for publishing projects and works in progress to the Behance network,
 as well as editing Behance profiles.
 
 Content can be published in one of two formats:
 Work in Progress: a single image, commonly used to represent an unfinished work
 Project: a composed piece, including one or more images/video embeds, and a cover image
 
 Project images can be added from a user’s Photo Library as well as from their Creative Cloud assets.
 
 Users can edit their profiles.
 
 Users can share their work to Facebook/Twitter upon publishing.
 */
@interface AdobePublish ()

#pragma mark - Project Editor

/**
 Publish a project to Behance.  Presents in a modal view controller.
 
 @warning if specs.resourceOptions includes AdobePublishProjectSpecsResourceOptionCreativeCloud, you must first authenticate with the `AdobeUXAuthManager`
 
 @param viewController a presenting viewController for the project editor to be presented with
 @param specs `AdobePublishProjectSpecs` definition of the project to be published to Behance
 @param delegate receive `id<AdobePublishProjectDelegate>` callbacks for project publishing events, such as completion, failure, and upload progress
 */
- (void)showProjectEditorWithSpecs:(AdobePublishProjectSpecs *)specs presentingViewController:(UIViewController *)viewController delegate:(nullable id<AdobePublishProjectDelegate>)delegate;

/**
 Presents the last project view controller again (ex. to display again in the case of a publishing error)
 
 @param viewController a presenting viewController for the project editor to be presented with
 @param delegate receive `id<AdobePublishProjectDelegate>` callbacks for project publishing events, such as completion, failure, and upload progress
 */
- (void)showLastProjectEditorWithPresentingViewController:(UIViewController *)viewController delegate:(nullable id<AdobePublishProjectDelegate>)delegate;

/**
 Cancel the current proejct editor task, such as publishing or editing a project.
 */
- (void)cancelCurrentProjectEditorTask;

@end

NS_ASSUME_NONNULL_END

#endif
