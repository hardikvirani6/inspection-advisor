/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property 
* laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/

/**************************************************************************
 * [PRIVATE BETA] CreativeSync enables seamless multi-app workflows via
 * the included APIs. If you have any questions, please contact us at
 * https://creativesdk.zendesk.com/hc/en-us/requests/new
 *************************************************************************/

#ifndef Adobe360WorkflowErrorHeader
#define Adobe360WorkflowErrorHeader

/** The domain for Adobe 360 Workflow errors.  When NSErrors are delivered to AdobeAsset code blocks,
 *  the domain property of the NSError will be set to the value of this string constant when
 *  the NSError is an Adobe360Workflow error.
 */
extern NSString *const Adobe360WorkflowErrorDomain;

/**
 * Error codes for the Adobe360ErrorDomain domain.
 */
typedef NS_ENUM (NSInteger, Adobe360WorkflowErrorCode)
{
    /**
     * The request cannot be completed.
     *
     * This typically means that there is something wrong with the action, the data,
     * or the file system. Repeating the request will most likely not help.
     */
    Adobe360WorkflowErrorBadRequest = 0,
    /**
     * File too large
     */
    Adobe360WorkflowErrorFileTooLarge = 1,
    /**
     * File type not supported
     */
    Adobe360WorkflowErrorFileTypeUnsupported = 2,
    /**
     * File system error
     */
    Adobe360WorkflowErrorFileSystemError = 3,
    /**
     * Consumer app not available
     */
    Adobe360WorkflowErrorConsumerAppNotAvailable = 4,
    /**
     * Message is invalid
     */
    Adobe360WorkflowErrorInvalidMessage = 5,
    /**
     * Message not found
     */
    Adobe360WorkflowErrorMessageNotFound = 6,
    /**
     * Message too large
     */
    Adobe360WorkflowErrorMessageTooLarge = 7,
    /**
     * Message already existed
     */
    Adobe360WorkflowErrorExistingMessage = 8,
    /**
     * Storage not found
     */
    Adobe360WorkflowErrorStorageNotFound = 9,
    /**
     * Storage is full
     */
    Adobe360WorkflowErrorStorageIsFull = 10,
    /**
     * User not authenticated
     */
    Adobe360WorkflowErrorNotAuthenticated = 11,
    /**
     * Message missing input descriptor
     */
    Adobe360WorkflowErrorMessageMissingInput = 12,
    /**
     * Message missing output descriptor
     */
    Adobe360WorkflowErrorMessageMissingOutput = 13,
    /**
     * Message contains invalid type
     */
    Adobe360WorkflowErrorMessageInvalidType = 14,
};

/**
 * Wrapper class for a network error related to Adobe services.
 */
@interface Adobe360WorkflowError : NSObject

@end

#endif
