/*************************************************************************
 *
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
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

#import <Foundation/Foundation.h>

/**
 * Change notification sent when the set of Typekit fonts is changed, added, or deleted.
 */
extern NSString *const AdobeTypekitChangedNotification;

/**
 * Change notification sent when new Typekit families have been added.
 */
extern NSString *const AdobeTypekitFamiliesAddedNotification;

/**
 * Key for AdobeTypekitChangedNotification userInfo dictionary to access an array of Typekit fontIds that have been added.
 */
extern NSString *const kTypekitFontsAddedKey;

/**
 * Key for AdobeTypekitChangedNotification userInfo dictionary to access an array of Typekit fontIds that have been removed.
 */
extern NSString *const kTypekitFontsRemovedKey;

/**
 * Key for AdobeTypekitChangedNotification userInfo dictionary explaining why fonts are changed
 */
extern NSString *const kTypekitFontsChangedReasonKey;

/**
 * Reason for kTypekitFontsChangedReasonKey in AdobeTypekitChangedNotification userInfo dictionary
 * Fonts expiring because the entitlement check last succeeded over 14 days ago.
 * The fonts have been removed until the user logs in and the entitlement check succeeds.
 * Call syncFonts method to have entitlement check.
 */
extern NSString *const kTypekitFontsChangedReasonExpiring;

/**
 * Reason for kTypekitFontsChangedReasonKey in AdobeTypekitChangedNotification userInfo dictionary
 * Fonts changed due to the different between the current syncFonts and the last syncedFonts
 */
extern NSString *const kTypekitFontsChangedReasonUpdated;

/**
 * Notification sent when a font is finished downloading, either successfully or if an error occurred.
 */
extern NSString *const AdobeTypekitFontDownloadNotification;

/**
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access Typekit font name that has been downloaded.
 */
extern NSString *const kTypekitFontNameKey;

/**
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access Typekit fontId that has been downloaded.
 */
extern NSString *const kTypekitFontIdKey;

/**
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access the information of whether the font has been downloaded successfully or not.
 */
extern NSString *const kTypekitFontDownloadSuccessKey;

/**
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access the information of whether there has been an error during downloading the font.
 */
extern NSString *const kTypekitFontDownloadErrorKey;

/**
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access the download status code.
 */
extern NSString *const kTypekitFontDownloadStatusCodeKey;


/**
 * NSError constants.
 */
extern NSString *const kTypekitErrorDomain;

/**
 * NSError codes.
 */
typedef NS_ENUM (NSUInteger, AdobeTypekitErrorCode)
{
    /**
     * The font family name doesn't have the corresponding familyID
     */
    kTypekitNoFamilyIdForFamilyNameError = 100,
    /**
     * Cannot find the font family data info.
     */
    kTypekitNoFamilyInfoError,
    /** 
     * The user has been downgraded from paid to a free account and can no longer access paid fonts 
     */
    kTypekitUserHasNoAccessToFont = 441,
    /** 
     * The user is needed to login 
     */
    kTypekitNoAuthenticatedUser
};

/**
 * AdobeTypekitManager is the class through which the syncing and download operations with Adobe Typekit fonts is managed.
 *
 * Currently the following constants can be used.
 *
 * - `AdobeTypekitFamiliesAddedNotification`
 * Change notification sent when new Typekit families have been added.
 *
 * - `AdobeTypekitChangedNotification`
 * Change notification sent when the set of Typekit fonts is changed, added, or deleted.
 *
 * - `kTypekitFontsAddedKey`
 * Key for AdobeTypekitChangedNotification userInfo dictionary to access an array of Typekit fontIds that have been added.
 *
 * - `kTypekitFontsRemovedKey`
 * Key for AdobeTypekitChangedNotification userInfo dictionary to access an array of Typekit fontIds that have been removed.
 *
 * - `AdobeTypekitFontDownloadNotification`
 * Notification sent when a font is finished downloading, either successfully or if an error occurred.
 *
 * - `kTypekitFontNameKey`
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access Typekit font name that has been downloaded.
 *
 * - `kTypekitFontIdKey`
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access Typekit fontId that has been downloaded.
 *
 * - `kTypekitFontDownloadSuccessKey`
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access the information of whether the font has been downloaded successfully or not.
 *
 * - `kTypekitFontDownloadErrorKey`
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access the information of whether there has been an error during downloading the font.
 *
 * - `kTypekitFontDownloadStatusCodeKey`
 * Key for AdobeTypekitFontDownloadNotification userInfo dictionary to access the download status code.
 *
 * - `kTypekitErrorDomain`
 * NSError code
 *
 * - `kTypekitNoFamilyIdForFamilyNameError`
 * NSError code
 *
 * - `kTypekitNoFamilyInfoError`
 * NSError code
 */
@interface AdobeTypekitManager : NSObject

/** @name Properties */
/**
 *  Returns the locale specific default PostScript font name.
 */
@property (nonatomic, readonly) NSString    *defaultFontName;

/** @name Methods */
/**
 * Gets the global shared instance of this singleton.
 *
 * @return the shared AdobeTypekitManager instance
 */
+ (AdobeTypekitManager *)sharedInstance;

/**
 * Syncs Typekit fonts with Typekit service for the user's Typekit account
 */
- (void)syncFonts;

@end
