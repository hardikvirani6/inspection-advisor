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

#ifdef ADOBEPUBLISH_WATCHOS
#import <WatchKit/WatchKit.h>
#else
#import <UIKit/UIKit.h>
#endif

#if !defined(ADOBEPUBLISH_WATCHOS) && !defined(ADOBEPUBLISH_TVOS)
#import <UIKit/UIGestureRecognizerSubclass.h>
#endif

//! Project version number for AdobeCreativeSDKBehance.
FOUNDATION_EXPORT double AdobeCreativeSDKBehanceVersionNumber;

//! Project version string for AdobeCreativeSDKBehance.
FOUNDATION_EXPORT const unsigned char AdobeCreativeSDKBehanceVersionString[];

#import <AdobeCreativeSDKBehance/AdobePublish.h>
#import <AdobeCreativeSDKBehance/AdobePublishError.h>

#import <AdobeCreativeSDKBehance/AdobePublishActivityActionType.h>


#if !defined(ADOBEPUBLISH_WATCHOS) && !defined(ADOBEPUBLISH_TVOS)
#import <AdobeCreativeSDKBehance/AdobePublishDelegate.h>
#import <AdobeCreativeSDKBehance/AdobePublishURLDelegate.h>

#import <AdobeCreativeSDKBehance/AdobePublishComponentDelegate.h>
#import <AdobeCreativeSDKBehance/AdobePublishProfileDelegate.h>
#import <AdobeCreativeSDKBehance/AdobePublishProjectDelegate.h>
#import <AdobeCreativeSDKBehance/AdobePublishProjectViewDelegate.h>

#endif


#import <AdobeCreativeSDKBehance/AdobePublishServices.h>

#import <AdobeCreativeSDKBehance/AdobePublishBaseModel.h>


#import <AdobeCreativeSDKBehance/AdobePublishContentObject.h>
#import <AdobeCreativeSDKBehance/AdobePublishError.h>
#import <AdobeCreativeSDKBehance/AdobePublishNetworkResponse.h>
#import <AdobeCreativeSDKBehance/AdobePublishNetworkTask.h>


#if !defined(ADOBEPUBLISH_WATCHOS)
#import <AdobeCreativeSDKBehance/AdobePublishActivity.h>
#import <AdobeCreativeSDKBehance/AdobePublishActivityAction.h>
#import <AdobeCreativeSDKBehance/AdobePublishActivityActionItem.h>
#import <AdobeCreativeSDKBehance/AdobePublishActivityAppreciation.h>
#import <AdobeCreativeSDKBehance/AdobePublishActivityItem.h>
#import <AdobeCreativeSDKBehance/AdobePublishActivityNewProject.h>
#import <AdobeCreativeSDKBehance/AdobePublishActivityNewProjectComment.h>
#import <AdobeCreativeSDKBehance/AdobePublishActivityProjectFeature.h>
#import <AdobeCreativeSDKBehance/AdobePublishActivitySavedToCollection.h>
#endif


#import <AdobeCreativeSDKBehance/AdobePublishCollection.h>
#import <AdobeCreativeSDKBehance/AdobePublishComment.h>
#import <AdobeCreativeSDKBehance/AdobePublishCommentTag.h>
#import <AdobeCreativeSDKBehance/AdobePublishImageRef.h>
#import <AdobeCreativeSDKBehance/AdobePublishProfile.h>
#import <AdobeCreativeSDKBehance/AdobePublishProject.h>
#import <AdobeCreativeSDKBehance/AdobePublishSearchField.h>
#import <AdobeCreativeSDKBehance/AdobePublishSearchFields.h>
#import <AdobeCreativeSDKBehance/AdobePublishTeam.h>
#import <AdobeCreativeSDKBehance/AdobePublishTool.h>
#import <AdobeCreativeSDKBehance/AdobePublishUser.h>
#import <AdobeCreativeSDKBehance/AdobePublishWorkExperience.h>

#import <AdobeCreativeSDKBehance/AdobePublishGallery.h>
#import <AdobeCreativeSDKBehance/AdobePublishToolGallery.h>
#import <AdobeCreativeSDKBehance/AdobePublishToolGalleryContent.h>
#import <AdobeCreativeSDKBehance/AdobePublishCuratedGallery.h>
#import <AdobeCreativeSDKBehance/AdobePublishCuratedGalleryContent.h>
#import <AdobeCreativeSDKBehance/AdobePublishPartnerGallery.h>

#if !defined(ADOBEPUBLISH_WATCHOS) && !defined(ADOBEPUBLISH_TVOS) && !defined(ADOBEPUBLISH_EXTENSION)
#import <AdobeCreativeSDKBehance/AdobePublishCommentPanelButton.h>
#import <AdobeCreativeSDKBehance/AdobePublishWIPConversion.h>
#endif

#if !defined(ADOBEPUBLISH_WATCHOS) && !defined(ADOBEPUBLISH_TVOS)
#import <AdobeCreativeSDKBehance/AdobePublishProfileSpecs.h>
#import <AdobeCreativeSDKBehance/AdobePublishProfileEditor.h>

#import <AdobeCreativeSDKBehance/AdobePublishProjectSpecs.h>

#import <AdobeCreativeSDKBehance/AdobePublishPublishing.h>

#import <AdobeCreativeSDKBehance/AdobePublishViewing.h>
#endif
