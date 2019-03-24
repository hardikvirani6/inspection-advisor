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

#ifndef AdobePublishProjectSpecsHeader
#define AdobePublishProjectSpecsHeader

NS_ASSUME_NONNULL_BEGIN

@class AdobeDCXMutableMetadata;

/**
 Resource types that can be used for project content
 */
typedef NS_OPTIONS(NSInteger, AdobePublishProjectSpecsResourceOption)  {
    /** 
     show creative cloud as a resource type for project content
     @warning if resourceOptions includes AdobePublishProjectSpecsResourceOptionCreativeCloud, you must first authenticate with the `AdobeUXAuthManager`
     */
    AdobePublishProjectSpecsResourceOptionCreativeCloud = 1 << 0,
    
    /** 
     Show camera as a resource type for project content.
     
     Add `NSMicrophoneUsageDescription` to Info.plist to allow users to record videos.
     */
    AdobePublishProjectSpecsResourceOptionCamera        = 1 << 1,
    
    /** show photo library as a resource type for project content */
    AdobePublishProjectSpecsResourceOptionPhotoLibrary  = 1 << 2,
    
    /** show html embed as a resource type for project content */
    AdobePublishProjectSpecsResourceOptionHtmlEmbed     = 1 << 3,
    
    /** show text embed as a resource type for project content */
    AdobePublishProjectSpecsResourceOptionText          = 1 << 4
};

/**
 Types of content editors that can be shown when creating/editing projects. Each represents a screen in the project publishing flow.
 */
typedef NS_OPTIONS(NSInteger, AdobePublishProjectSpecsEditingOption)  {
    /**
     Headless project publishing with no interaction by the user
     @warning `images`, `title`, `projectDescription`, `creativeFieldIds`, and `tags` properties must all be supplied as specs. `coverImage` must be supplied for new projects.
     */
    AdobePublishProjectSpecsEditingOptionNone           = 1 << 0,
    
    /** 
     Allow the ability to add resources as project contents, beyond those supplied in the `images` property, and the ability to reorder project contents.
     */
    AdobePublishProjectSpecsEditingOptionContent        = 1 << 1,
    
    /** 
     Allow the ability to choose a cover image for their project or supply one beyond those in the `images` property.
     If this option is not set, `coverImage` must be supplied when creating a new project.
     */
    AdobePublishProjectSpecsEditingOptionCoverImage     = 1 << 2,
    
    /** 
     Allow the ability to customize project details and sharing options when publishing a project.
     @warning if this option is not set, the `title`, `projectDescription`, `creativeFieldIds`, and `tags` properties must all be supplied as specs.
     */
    AdobePublishProjectSpecsEditingOptionDetails        = 1 << 3,
};

/**
 Drawer display options that determine how the drawer is presented on start up.
 */
typedef NS_ENUM(NSInteger, AdobePublishProjectSpecsDrawerOption)  {
    
    /**
     Show just the toolbar of resource options without the gallery being visible.
     */
    AdobePublishProjectSpecsDrawerOptionClosed,
    
    /**
     Show the drawer propped open with the gallery visible.
     */
    AdobePublishProjectSpecsDrawerOptionOpen
};

/**
 `AdobePublishProjectSpecs` wraps all fields available for publishing projects and works in progress to the Behance network.
 
 All fields are optional. Any fields provided will be pre-filled in the project publishing UI. All fields can be overridden by the user.
 */
@interface AdobePublishProjectSpecs : NSObject <NSCoding>

/**
 Array of `UIImage` images to be included in a project published to Behance
 
 DEPRECATED: Use imageFilePaths instead.
 */
@property (nonatomic, strong, nullable) NSArray<UIImage *> * images __deprecated;

/**
 Array of `NSNumber`-wrapped booleans, indicating whether each of the `images` to be published should span the full width of the project. Defaults to No.
 This preference will be ignored for any image smaller than 1400 pixels wide, as that is the minimum width allowable for full-width images.
 
 DEPRECATED: All images will automatically be marked as fullWidth if possible.
 */
@property (nonatomic, strong, nullable) NSArray<NSNumber *> * fullWidthImages __deprecated;


/**
 Array of file paths that contain images to be included in the project.
 
 File paths are used, instead of UIImage or NSData, to prevent memory problems from large images.
 
 @warning The filePaths must NOT start with file:// or any other scheme.
 @warning The filePaths must preserve the correct extension of the image (ex. .jpg).
 */
@property (nonatomic, strong, nullable) NSArray<NSString *> * imageFilePaths;

/**
 Array of file paths that contain videos to be included in the project.
 
 @warning The filePaths must NOT start with file:// or any other scheme.
 @warning The filePaths must preserve the correct extension of the video (ex. .mov).
 */
@property (nonatomic, strong, nullable) NSArray<NSString *> * videoFilePaths;

/**
 `UIImage` to be used as the cover of the project published to Behance
 
 @warning the image supplied will be resized to 404x316 (if necessary) prior to upload.
 @warning the user will be given the opportunity to crop their image if `AdobePublishProjectSpecsEditingOptionCoverImage` is included in `editingOptions`.
 
 DEPRECATED: Use coverImageFilePath instead.
 */
@property (nonatomic, strong, nullable) UIImage * coverImage __deprecated;

/**
 File path to the image to be used as the cover of the project published to Behance
 
 @warning The image supplied will be resized to 404x316 (if necessary) prior to upload.
 @warning The user will be given the opportunity to crop their image if `AdobePublishProjectSpecsEditingOptionCoverImage` is included in `editingOptions`.
 @warning The filePaths must preserve the correct extension of the image (ex. .jpg).
 */
@property (nonatomic, strong, nullable) NSString * coverImageFilePath;

/**
 Title of the project to be published.
 */
@property (nonatomic, strong, nullable) NSString * title;

/**
 Description of the project to be published.
 */
@property (nonatomic, strong, nullable) NSString * projectDescription;

/**
 Array of up to 3 `NSNumber` creative field ids to associate with the project to be published.
 A list of all creative fields can be retrieved via the `/v2/fields` endpoint of the Behance API: https://www.behance.net/dev/api/endpoints/11
 
 A list of ids, instead of names, is necessary to avoid localization problems.
 */
@property (nonatomic, strong, nullable) NSArray<NSNumber *> * creativeFieldIds;

/**
 Array of `NSString` tags to associate with the project to be published.
 */
@property (nonatomic, strong, nullable) NSArray<NSString *> * tags;

/**
 Copyright license of the project to be published.
 Licenses should be lowercase, and include hyphens. E.g. no-use, by-nc-nd, by-nc-sa, by-nc, by-nd, by-sa, by
 For more information: https://creativecommons.org/licenses/
 */
@property (nonatomic, strong, nullable) NSString * license;

/**
 Flag (0 or 1) indicating whether the project contains any adult content: nudity, sexual themes, expletives, or violence
 For more information: http://www.behance.net/faq
 */
@property (nonatomic, strong, nullable) NSNumber * matureContent;

/**
 One or more `AdobePublishProjectSpecsResourceOption` providing the ability to add additional resources to a project to be published.
 
 Multiple can be provided AdobePublishProjectSpecsResourceOptionCreativeCloud|AdobePublishProjectSpecsResourceOptionCamera.
 The camera option will not be shown if the device does not have camera support.
 By default, all options will be shown.
 
 @warning if resourceOptions includes AdobePublishProjectSpecsResourceOptionCreativeCloud, you must first authenticate with the `AdobeUXAuthManager`
 */
@property (nonatomic) AdobePublishProjectSpecsResourceOption resourceOptions;

/**
 One or more `AdobePublishProjectSpecsEditingOption` providing the ability to specify what steps of the project publishing flow are shown
 
 Multiple can be provided AdobePublishProjectSpecsEditingOptionContent|AdobePublishProjectSpecsResourceOptionCoverImage.
 By default, all editing steps in the project publishing flow will be shown.
 @warning if `AdobePublishProjectSpecsResourceOptionDetails` is not set, the `title`, `projectDescription`, `creativeFieldIds`, and `tags` properties must all be supplied as specs.
 @warning if `AdobePublishProjectSpecsResourceOptionCoverImage` is not set, `coverImage` must be supplied when creating new projects
 */
@property (nonatomic) AdobePublishProjectSpecsEditingOption editingOptions;

/**
 Determines how the drawer is presented on start up.
 
 Defaults to AdobePublishProjectSpecsDrawerOptionClosed.
 */
@property (nonatomic) AdobePublishProjectSpecsDrawerOption initialDrawerStateOption;

/**
 If NO, project editor publishes to Behance and Portfolio.
 If YES, project editor publishes to only Portfolio with
 a modified interface for Portfolio.
 
 The published project to Portfolio would not go live 
 until the user pushes the updates to the live site
 from MyPortfolio.
 
 Defaults to NO.
 */
@property (nonatomic) BOOL publishToPorfolio;

#pragma mark - Metadata

/**
 XMP Metadata for insertion into the work in project images and cover image
 */

@property (nonatomic, retain, nullable) AdobeDCXMutableMetadata * metadata;

#pragma mark - Editing Existing Projects

/**
 To edit the content of an existing project, supply its project id
 
 @warning if the `images` property is also supplied, all existing content within the project will be removed
 */
@property (nonatomic, strong, nullable) NSNumber * projectId;

@end

NS_ASSUME_NONNULL_END

#endif
