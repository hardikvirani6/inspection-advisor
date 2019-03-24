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

#ifndef AdobePublishToolHeader
#define AdobePublishToolHeader

NS_ASSUME_NONNULL_BEGIN

@interface AdobePublishTool : AdobePublishBaseModel <NSCopying, NSCoding>

/**
 The id of the tool
 */
@property (nonatomic, strong) NSNumber * toolId;

/**
 The name of the tool.
 */
@property (nonatomic, strong) NSString * title;

/**
 URL to obtain the tool, if available
 */
@property (nonatomic, strong, nullable) NSURL * URL;

/**
 URL to an icon representing the tool, if available
 */
@property (nonatomic, strong, nullable) NSURL * iconURL;

@end

NS_ASSUME_NONNULL_END

#endif