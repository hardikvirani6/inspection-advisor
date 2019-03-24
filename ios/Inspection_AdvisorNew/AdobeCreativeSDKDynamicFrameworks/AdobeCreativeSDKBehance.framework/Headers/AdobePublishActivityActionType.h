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

#ifndef AdobePublishActivityActionTypeHeader
#define AdobePublishActivityActionTypeHeader

NS_ASSUME_NONNULL_BEGIN

/**
 `AdobePublishActivityActionType` identifies the type of activity represented
 */
typedef NS_ENUM(NSInteger, AdobePublishActivityActionType) {
    /**
     Appreciation on a project
     */
    AdobePublishActivityActionTypeProjectAppreciation,
    /**
     A project has been published
     */
    AdobePublishActivityActionTypeProjectPublish,
    /**
     A project has been edited
     */
    AdobePublishActivityActionTypeProjectEdit,
    /**
     A new comment on a project
     */
    AdobePublishActivityActionTypeProjectComment,
    /**
     A project has been saved to a collection
     */
    AdobePublishActivityActionTypeProjectSavedToCollection,
    /**
     A project has been featured on a Behance gallery
     */
    AdobePublishActivityActionTypeProjectFeature,
    /**
     A project has been updated by a team
     */
    AdobePublishActivityActionTypeProjectTeamUpdate,
    /**
     Unknown activity type
     */
    AdobePublishActivityActionTypeUnknown
};

NS_ASSUME_NONNULL_END

#endif
