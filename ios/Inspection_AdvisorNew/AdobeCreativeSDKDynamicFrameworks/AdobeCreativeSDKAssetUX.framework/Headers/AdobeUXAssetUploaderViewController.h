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
 ******************************************************************************/

#ifndef AdobeUXAssetUploaderViewControllerHeader
#define AdobeUXAssetUploaderViewControllerHeader

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@class AdobeAssetFolder;
@class AdobeUXAssetUploaderViewController;

/**
 * Defines all the callback methods that the Asset Uploader's delegate could handle.
 */
@protocol AdobeUXAssetUploaderViewControllerDelegate <NSObject>

@optional

/**
 * Called when the user has successfully selected a usable destination.
 *
 * @param assetUploader  The relevant Asset Uploader instance.
 * @param destination    Selected destination object.
 * @param assetsToUpload A collection of the originally specified assets. The keys are the original 
 *                       IDs of the assets. These values will never change. The values are the 
 *                       names of the assets. Use the IDs to identify the assets and detect whether 
 *                       the name of an asset was changed.
 */
- (void)assetUploaderViewController:(nonnull AdobeUXAssetUploaderViewController *)assetUploader
               didSelectDestination:(nonnull AdobeSelection *)destination
                     assetsToUpload:(nonnull NSDictionary<NSString *, NSString *> *)assetsToUpload;

/**
 * Called in case of an error.
 *
 * @param assetUploader The relevant Asset Uploader instance.
 * @param error         An error object describing the issue that has occured.
 */
- (void)assetUploaderViewController:(nonnull AdobeUXAssetUploaderViewController *)assetUploader
                  didEncounterError:(nonnull NSError *)error;

/**
 * Called when the Asset Uploader was dismissed, by tapping the "Close" button, without an upload 
 * destination.
 *
 * @param assetUploader The relevant Asset Uploader instance.
 */
- (void)assetUploaderViewControllerDidClose:(nonnull AdobeUXAssetUploaderViewController *)assetUploader;

@end

@class AdobeUXAssetUploaderConfiguration;

/**
 * A view controller that could be used to ask the user for the destination when uploading assets 
 * to the Creative Cloud. The user will have the option of choosing a folder, a Creative Cloud 
 * Library or a Lightroom Photo Collection as the destination. Furtheremore, the user will have the 
 * option of renaming any of the to-be-uploaded assets.
 *
 * AdobeUXAssetUploaderViewController is a simple UIViewController subclass. Use the 
 * @c assetUploaderViewControllerWithConfiguration:delegate: method to retrieve a fully configured 
 * and usable instance. The resulting instance can be presented using the familiar methods of 
 * UIViewController.
 */
@interface AdobeUXAssetUploaderViewController : UIViewController

/**
 * Retrieves the configuration object for the receiver.
 */
@property (copy, nonatomic, nonnull, readonly) AdobeUXAssetUploaderConfiguration *configuration;

/**
 * Retrieves the delegate object for the receiver.
 */
@property (weak, nonatomic, nullable, readonly) id<AdobeUXAssetUploaderViewControllerDelegate> delegate;

/**
 * Instantiates and configures a usable instance of the Asset Uploader using the specified 
 * configuration object.
 *
 * @param configuration Configuration object to use when instantiating the reciever.
 * @param delegate      Delegate object that will handle any necessary callbacks for the reciever.
 *
 * @return A fully configuraed and ready instance of the Asset Browser. If the configuration object 
 *         isn't specified or there is an issue with one of the specified arguments, @c nil is 
 *         returned.
 */
+ (nullable instancetype)assetUploaderViewControllerWithConfiguration:(nonnull AdobeUXAssetUploaderConfiguration *)configuration
                                                             delegate:(nullable id<AdobeUXAssetUploaderViewControllerDelegate>)delegate;

@end

#endif
