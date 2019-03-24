/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2014 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

#ifndef AdobeAssetIllustratorFileHeader
#define AdobeAssetIllustratorFileHeader

#import "AdobeAssetFile.h"

@class AdobeAGCManifest;

/**
 * AdobeAssetIllustratorFile represents an Adobe Illustrator Document (AI file).  It provides methods
 * for creating Illustrator files.
 */
@interface AdobeAssetIllustratorFile : AdobeAssetFile

#pragma mark Create

/**
 * Create an Illustrator file asynchornously.
 *
 * @param name              The name of the file to create.
 * @param folder            The name of the AdobeAssetFolder containing the AI file to be created.
 * @param images            Array of AdobeAssetFile objects for the creation of the AdobeAssetIllustratorFile.
 * These objects have to be SVG files without external references that may contain base64 encoded JPEG or PNG images.
 * (Currently only the first array object is used).
 * @param overwrite         Whether to allow overwriting an existing destination file.  Set to NO if the file doesn't exist.
 * @param progressBlock     Optionally, track the upload progress.
 * @param successBlock      Optionally, get an updated reference to the created file when complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on upload.
 * @param errorBlock        Optionally, be notified of an error.
 *
 * @returns A place holder pointer to the AdobeAssetIllustratorFile.
 */
+ (AdobeAssetIllustratorFile *)create:(NSString *)name
                               folder:(AdobeAssetFolder *)folder
                               images:(NSArray *)images
                            overwrite:(BOOL)overwrite
                        progressBlock:(void (^)(double fractionCompleted))progressBlock
                         successBlock:(void (^)(AdobeAssetIllustratorFile *file))successBlock
                    cancellationBlock:(void (^)(void))cancellationBlock
                           errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Create an AI (Illustrator) file by asynchronously pushing an AdobeAGCManifest to Adobe Creative Cloud.
 *
 * @param name              The name of the file to create.
 * @param folder            The name of the AdobeAssetFolder containing the AI file to be created.
 * @param manifest          The AGC manifest used to create the AI file on Adobe Creative Cloud.
 * @param imageComponents   An array of AdobeAGCImageComponent objects.
 * @param overwrite         Whether to allow overwriting an existing destination file.
 * @param progressBlock     Optionally, track the upload progress.
 * @param successBlock      Optionally, get an updated reference to the created file when complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on upload.
 * @param errorBlock        Optionally, be notified of an error.
 *
 * @returns A place holder pointer to the AdobeAssetIllustratorFile.
 */
+ (AdobeAssetIllustratorFile *)create:(NSString *)name
                               folder:(AdobeAssetFolder *)folder
                          agcManifest:(AdobeAGCManifest *)manifest
                      imageComponents:(NSArray *)imageComponents
                            overwrite:(BOOL)overwrite
                        progressBlock:(void (^)(double fractionCompleted))progressBlock
                         successBlock:(void (^)(AdobeAssetIllustratorFile *file))successBlock
                    cancellationBlock:(void (^)(void))cancellationBlock
                           errorBlock:(void (^)(NSError *error))errorBlock;


/**
 * Create a AI (Illustrator) file by asynchronously pushing a CLS Manifest and DCX Location to Adobe Creative Cloud.
 *
 * @param name              The output name of the AI file.
 * @param folder            The destination folder the AI should be written to.
 * @param manifestHref      The href to the CLS manifest on Adobe Creative Cloud.
 * @param location          The DCX location.
 * @param overwrite         In the case of a new AI file, whether it should overwrite an already existing composite.
 * @param options           options dictionary, can be nil
 * @param progressBlock     Optionally, track the upload progress.
 * @param successBlock      Optionally, get an updated reference to the created file when complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on upload.
 * @param errorBlock        Optionally, be notified of an error.
 *
 * @returns A place holder pointer to the AdobeAssetIllustratorFile.
 */
+ (AdobeAssetIllustratorFile *)create:(NSString *)name
                       folder:(AdobeAssetFolder *)folder
              clsManifestHref:(NSString *)manifestHref
                  dcxLocation:(NSString *)location
                  optionsDict:(NSDictionary *)options
                    overwrite:(BOOL)overwrite
                progressBlock:(void (^)(double fractionCompleted))progressBlock
                 successBlock:(void (^)(AdobeAssetIllustratorFile *file))successBlock
            cancellationBlock:(void (^)(void))cancellationBlock
                   errorBlock:(void (^)(NSError *error))errorBlock;



@end

#endif /* ifndef AdobeAssetIllustratorFileHeader */
