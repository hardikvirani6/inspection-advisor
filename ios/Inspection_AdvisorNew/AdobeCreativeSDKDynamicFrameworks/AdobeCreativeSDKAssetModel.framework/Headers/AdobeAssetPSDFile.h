/******************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of
 * Adobe Systems Incorporated and its suppliers, if any. The intellectual and
 * technical concepts contained herein are proprietary to Adobe Systems
 * Incorporated and its suppliers and are protected by trade secret or
 * copyright law. Dissemination of this information or reproduction of this
 * material is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 ******************************************************************************/

#ifndef AdobeAssetPSDFileHeader
#define AdobeAssetPSDFileHeader

#import "AdobeAssetFile.h"
#import "AdobePSDComposite.h"

@class AdobeAGCManifest;
@class AdobePhotoshopReader;
@class AdobePSDPreview;

/**
 * A utility to help determine if an AdobeAsset is an AdobeAssetPSDFile.
 */
#define IsAdobeAssetPSDFile(item) ([item isKindOfClass:[AdobeAssetPSDFile class]])

/**
 * AdobeAssetPSDFile represents a Photoshop Document (PSD file).  It provides methods for reading
 * PSD previews and composites from PSD files, creating PSD files from composites, and getting
 * layer renditions from PSD files.
 */
@interface AdobeAssetPSDFile : AdobeAssetFile

#pragma mark - Create

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wnullability-completeness"

/**
 * Create a PSD file by asynchronously pushing a PSD composite structure to Adobe Creative
 * Cloud. This operation performs a pushPSDComposite operation on
 * the returned AdobeAssetPSDFile instance, which can then be used to either change the request
 * priority or to cancel it.
 *
 * @param psdComposite The PSD composite used to create the PSD file on Adobe Creative Cloud.
 * @param overwrite In the case of a new PSD composite whether it should overwrite an already existing
 * composite. Set this to YES if a previous push has failed with an AdobeDCXErrorCompositeAlreadyExists
 * @param progressBlock Optionally, track the upload progress.
 * @param completionBlock Optionally, get an updated reference to the created file when complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on upload.
 * @param errorBlock Optionally, be notified of an error.
 *
 * @returns A place holder pointer to the AdobeAssetPSDFile.
 */
+ (AdobeAssetPSDFile *)createWithPSDComposite:(AdobePSDComposite *)psdComposite
                            overwriteExisting:(BOOL)overwrite
                                   onProgress:(void (^)(double fractionCompleted))progressBlock
                                 onCompletion:(void (^)(AdobeAssetPSDFile *file))completionBlock
                               onCancellation:(void (^)(void))cancellationBlock
                                      onError:(void (^)(NSError *error))errorBlock __deprecated; // AdobePSDComposite will be replaced by CloudPSD and/or AGC

/**
 * Create a PSD file by asynchronously pushing an AdobeAGCManifest to Adobe Creative Cloud.
 *
 * @param name              The output name of the PSD file.
 * @param folder            The destination folder the PSD should be written to.
 * @param manifest          The AGC manifest used to create the PSD file on Adobe Creative Cloud.
 * @param imageComponents   An array of AdobeAGCImageComponent objects. Only image/jpg and image/png are supported content types.
 * @param overwrite         In the case of a new PSD file, whether it should overwrite an already existing composite.
 * @param progressBlock     Optionally, track the upload progress.
 * @param successBlock      Optionally, get an updated reference to the created file when complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on upload.
 * @param errorBlock        Optionally, be notified of an error.
 *
 * @returns A place holder pointer to the AdobeAssetPSDFile.
 */
+ (AdobeAssetPSDFile *)create:(NSString *)name
                       folder:(AdobeAssetFolder *)folder
                  agcManifest:(AdobeAGCManifest *)manifest
              imageComponents:(NSArray *)imageComponents
                    overwrite:(BOOL)overwrite
                progressBlock:(void (^)(double fractionCompleted))progressBlock
                 successBlock:(void (^)(AdobeAssetPSDFile *file))successBlock
            cancellationBlock:(void (^)(void))cancellationBlock
                   errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Create a PSD file by asynchronously pushing a CLS Manifest and DCX Location to Adobe Creative Cloud.
 *
 * @param name              The output name of the PSD file.
 * @param folder            The destination folder the PSD should be written to.
 * @param manifestHref      The href to the CLS manifest on Adobe Creative Cloud.
 * @param location          The DCX location.
 * @param overwrite         In the case of a new PSD file, whether it should overwrite an already existing composite.
 * @param options           options dictionary, can be nil
 * @param progressBlock     Optionally, track the upload progress.
 * @param successBlock      Optionally, get an updated reference to the created file when complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on upload.
 * @param errorBlock        Optionally, be notified of an error.
 *
 * @returns A place holder pointer to the AdobeAssetPSDFile.
 */
+ (AdobeAssetPSDFile *)create:(NSString *)name
                       folder:(AdobeAssetFolder *)folder
              clsManifestHref:(NSString *)manifestHref
                  dcxLocation:(NSString *)location
                  optionsDict:(NSDictionary *)options
                    overwrite:(BOOL)overwrite
                progressBlock:(void (^)(double fractionCompleted))progressBlock
                 successBlock:(void (^)(AdobeAssetPSDFile *file))successBlock
            cancellationBlock:(void (^)(void))cancellationBlock
                   errorBlock:(void (^)(NSError *error))errorBlock;

#pragma mark - PSD Preview

/**
 * DEPRECATED
 * Gets a read-only description of the PSD file from Adobe Creative Cloud.
 *
 * @param layerCompId Optionally, the id of a layer comp to apply before generating the preview. If nil
 * no layer comp will be explicitly applied. TODO -- NOT YET IMPLEMENTED
 * @param progressBlock Optionally, track the download progress of the composite representation.
 * @param completionBlock Optionally, get a reference to a PSD composite object for the composite representation when download is complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on download.
 * @param errorBlock Optionally, be notified of an error.
 */
- (void)getPreviewWithAppliedLayerCompId:(NSNumber *)layerCompId
                              onProgress:(void (^)(double))progressBlock
                            onCompletion:(void (^)(AdobePSDPreview *psdPreview))completionBlock
                          onCancellation:(void (^)(void))cancellationBlock
                                 onError:(void (^)(NSError *error))errorBlock __deprecated_msg("Use downloadPreviewWithAppliedCompID:progressBlock:successBlock:cancellationBlock:errorBlock: instead.");

/**
 * Gets a read-only description of the PSD file from Adobe Creative Cloud.
 *
 * @param layerCompID       Optionally, the id of a layer comp to apply before generating the preview. If nil
 * no layer comp will be explicitly applied. TODO -- NOT YET IMPLEMENTED
 * @param progressBlock     Optionally, track the download progress of the composite representation.
 * @param successBlock      Optionally, get a reference to a PSD composite object for the composite representation when download is complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on download.
 * @param errorBlock        Optionally, be notified of an error.
 *
 * @return An @c AdobeAssetAsyncRequest which can be used to control the cancellation of the request.
 */
- (AdobeAssetAsyncRequest *)downloadPreviewWithAppliedLayerCompID:(NSNumber *)layerCompID
                                                    progressBlock:(void (^)(double))progressBlock
                                                     successBlock:(void (^)(AdobePSDPreview *psdPreview))successBlock
                                                cancellationBlock:(void (^)(void))cancellationBlock
                                                       errorBlock:(void (^)(NSError *error))errorBlock __deprecated; // AdobePSDPreview will be replaced by CloudPSD and/or AGC

/**
 * Gets a read-only description of the PSD file from Adobe Creative Cloud.
 *
 * @param progressBlock     Optionally, track the download progress of the composite representation.
 * @param successBlock      Optionally, get a reference to a PSD composite object for the composite representation when download is complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on download.
 * @param errorBlock        Optionally, be notified of an error.
 *
 * @return An @c AdobeAssetAsyncRequest which can be used to control the cancellation of the request.
 */
- (AdobeAssetAsyncRequest *)downloadPreviewWithProgressBlock:(void (^)(double))progressBlock
                                                successBlock:(void (^)(AdobePSDPreview *))successBlock
                                           cancellationBlock:(void (^)(void))cancellationBlock
                                                  errorBlock:(void (^)(NSError *))errorBlock __deprecated; // AdobePSDPreview will be replaced by CloudPSD and/or AGC

#pragma mark - PSD Composite Pull

/**
 * Create a PSD composite object for this Creative Cloud file and pull down its composite
 * representation asynchronously from the cloud. The returned PSD composite object
 * can then be used to inspect or modify the PSD file via its composite representation.
 *
 * @param path The path where the local composite is stored.
 * @param progressBlock Optionally, track the download progress of the composite representation.
 * @param completionBlock Optionally, get a reference to a PSD composite object for the composite representation when download is complete.
 * @param cancellationBlock Optionally, be notified of a cancellation on download.
 * @param errorBlock Optionally, be notified of an error.
 */
- (void)pullPSDCompositeAt:(NSString *)path
                onProgress:(void (^)(double))progressBlock
              onCompletion:(void (^)(AdobePSDComposite *psdComposite))completionBlock
            onCancellation:(void (^)(void))cancellationBlock
                   onError:(void (^)(NSError *error))errorBlock __deprecated; // AdobePSDComposite will be replaced by CloudPSD and/or AGC

- (void)pullMinimalPSDCompositeAt:(NSString *)path
                       onProgress:(void (^)(double))progressBlock
                     onCompletion:(void (^)(AdobePSDComposite *psdComposite))completionBlock
                   onCancellation:(void (^)(void))cancellationBlock
                          onError:(void (^)(NSError *error))errorBlock __deprecated; // AdobePSDComposite will be replaced by CloudPSD and/or AGC

/**
 * Cancel the rendition request.
 */
- (void)cancelPullPSDCompositeRequest __deprecated; // AdobePSDComposite will be replaced by CloudPSD and/or AGC

/**
 * Change the priority of the rendition request.
 *
 * @param priority The priority of the request.
 */
- (void)changePSDCompositePullRequestPriority:(NSOperationQueuePriority)priority __deprecated; // AdobePSDComposite will be replaced by CloudPSD and/or AGC

#pragma mark - PSD Composite Push

/**
 * Cancel the push request.
 */
- (void)cancelPushPSDCompositeRequest __deprecated; // AdobePSDComposite will be replaced by CloudPSD and/or AGC

/**
 * Change the priority of the push request.
 *
 * @param priority The priority of the push request.
 */
- (void)changePushPSDCompositeRequestPriority:(NSOperationQueuePriority)priority __deprecated; // AdobePSDComposite will be replaced by CloudPSD and/or AGC

#pragma mark - AGC Workflow

/**
 * Cancel the create request.
 */
- (void)cancelCreatePSDViaAGCRequest __deprecated_msg("Control cancellation via createAssetAsyncRequest");

/**
 * Change the priority of the create request.
 *
 * @param priority The priority of the create request.
 */
- (void)changeCreatePSDViaAGCRequestPriority:(NSOperationQueuePriority)priority __deprecated_msg("Control reprioritization via createAssetAsyncRequest");

#pragma mark - Renditions

/**
 * Get a rendition of a layer in the PSD asynchronously.
 *
 * @param layerID           The ID of the layer for which a rendition should be generated. Pass nil 
 *                          to render the entire PSD.
 * @param layerCompID       The ID of the layerComp which should be applied. Pass nil to apply the 
 *                          default layerComp.
 * @param renditionType     The type of rendition to request.
 * @param dimensions        The dimensions of the rendition in 'points'. The value gets adjusted to
 *                          pixels depending on the screen resolution. The largest of the 
 *                          dimensions' width and height sets the bounds for the rendition size 
 *                          (width and height).
 * @param priority          The priority of the request.
 * @param progressBlock     Optionally, track the upload progress.
 * @param successBlock      Get the rendition data, and notified if returned from local cache.
 * @param cancellationBlock Optionally, be notified of a cancellation on upload.
 * @param errorBlock        Optionally, be notified of an error for a request.
 *
 * @return An @c AdobeAssetAsyncRequest which can be used to control the cancellation of the 
 *         request.
 */
- (AdobeAssetAsyncRequest *)downloadRenditionForLayerID:(NSNumber *)layerID
                                            layerCompID:(NSNumber *)layerCompID
                                          renditionType:(AdobeAssetFileRenditionType)renditionType
                                             dimensions:(CGSize)dimensions
                                        requestPriority:(NSOperationQueuePriority)priority
                                          progressBlock:(void (^)(double progress))progressBlock
                                           successBlock:(void (^)(NSData *data, BOOL fromCache))successBlock
                                      cancellationBlock:(void (^)(void))cancellationBlock
                                             errorBlock:(void (^)(NSError *error))errorBlock;

/**
 * Cancel the layer rendition request.
 *
 * @param requestToken The token of the request to cancel.
 */
- (void)cancelLayerRenditionRequest:(id)requestToken __deprecated_msg("Control cancellation through the AdobeAssetAsyncRequest");

/**
 * Change the priority of the layer rendition request.
 *
 * @param requestToken Token ID of the request to cancel.
 * @param priority The priority of the request.
 */
- (void)changeLayerRenditionRequestPriority:(id)requestToken
                            withNewPriority:(NSOperationQueuePriority)priority __deprecated_msg("Control reprioritization through the AdobeAssetAsyncRequest");

#pragma clang diagnostic pop

#pragma mark - Layer/Layer Comp Exploration/Extraction


/**
 * Creates an instance of the AdobePhotoshopReader class, which can be used to extract and explore 
 * the Layers and Layer Comps within the receiver.
 *
 * A network call is made to the server and the
 * data is downloaded asynchronously in a background thread. Once all the bits have been 
 * downloaded, the success block is called on the main thread. If the returned data from the server 
 * is invalid or an AdobePhotoshopReader instance cannot be created successfully, the error block 
 * is called with an appropriate error object with information about the issue.
 *
 * The returned AdobeAssetAsyncRequest object can be use to monitor and control the underlaying 
 * network connection. If the connection cancelled, the cancellationBlock is called.
 *
 * @param successBlock      Called when the data has successfully been downloaded and a new 
 *                          instance of AdobePhotoshopReader has been created.
 * @param cancellationBlock Called if the underlaying network connection is cancelled.
 * @param errorBlock        Called in case of an error with an appropriate error object.
 *
 * @return An instance of AdobeAssetAsyncRequest which can be used to monitor and control the 
 *         underlaying network connection.
 */
- (nullable AdobeAssetAsyncRequest *)photoshopReaderWithSuccessBlock:(nullable void (^)(AdobePhotoshopReader *_Nonnull reader))successBlock
                                                   cancellationBlock:(nullable void (^)(void))cancellationBlock
                                                          errorBlock:(nullable void (^)(NSError *_Nonnull error))errorBlock;

@end

#endif /* ifndef AdobeAssetPSDFileHeader */
