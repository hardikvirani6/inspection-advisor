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

#ifndef AdobePublishCommentTagHeader
#define AdobePublishCommentTagHeader

NS_ASSUME_NONNULL_BEGIN

/**
 `AdobePublishCommentTag` represents a tag for a user contained within a comment on Behance
 */
@interface AdobePublishCommentTag : AdobePublishBaseModel

/**
 The user id for the user tagged in the comment
 */
@property (nonatomic, strong) NSNumber * userId;

/**
 The display name for the tag shown in the comment
 */
@property (nonatomic, strong) NSString * displayName;

/**
 The range of text in the comment representing the tag
 */
@property (nonatomic) NSRange range;

@end

NS_ASSUME_NONNULL_END

#endif
