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

#ifndef AdobePublishViewingHeader
#define AdobePublishViewingHeader

NS_ASSUME_NONNULL_BEGIN

@protocol AdobePublishProjectViewDelegate;

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

/**
 Accent color used to color UI elements in the Project and WIP viewer components.
 */
@property (nonatomic, strong, nullable) UIColor * accentColor;

#pragma mark - Project Viewer

/**
 Display a project by project id. Presents from the parentViewController
 
 @param projectId id of the project to display
 @param viewController a presenting viewController for project to be presented with
 @param delegate Delegate to receive events
 */
- (void)showProjectWithId:(NSNumber *)projectId presentingViewController:(UIViewController* )viewController delegate:(nullable id<AdobePublishProjectViewDelegate>)delegate;

/**
 Dismiss a project viewer programmatically that was presented with showProjectWithId:presentingViewController:delegate:
 
 @param animated indicates whether the component dismissal should be animated
 @param completion completion handler to be executed once dismissal is finished
 */
- (void)dismissProjectViewerAnimated:(BOOL)animated completion:(nullable void (^)(void))completion;

@end

NS_ASSUME_NONNULL_END

#endif
