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
 * AdobeTypekitFont is the class through which user handles operations with Typekit fonts.
 *
 */
@interface AdobeTypekitFont : NSObject

/** @name Properties */
/**
 * Typekit font name of the font.
 */
@property (nonatomic, readonly) NSString    *fontName;

/**
 * Typekit family name of the font.
 */
@property (nonatomic, readonly) NSString    *familyName;

/**
 * Family name of the font from the font's 'name' table. It may be nil if the font has not been downloaded.
 */
@property (nonatomic, readonly) NSString    *canonicalFamilyName;

/**
 * Typekit font ID of the font.
 */
@property (nonatomic, readonly) NSString    *typekitId;

/**
 * Typekit font family ID of the font.
 */
@property (nonatomic, readonly) NSString    *typekitFamilyId;

/**
 * Typekit style name of the font.
 */
@property (nonatomic, readonly) NSString    *styleName;

/**
 * Style name (subfamily name) from the font's 'name' table. It may be nil if the font has not been downloaded.
 */
@property (nonatomic, readonly) NSString    *canonicalStyleName;

/**
 * Array of supported language IDs for the font.
 */
@property (nonatomic, readonly) NSArray     *languages;

/**
 * Whether or not the font is part of the user's synced fonts.
 */
@property (assign, nonatomic, readonly, getter = isSynced) BOOL synced;

/**
 * Whether or not the font is part of bundled font.
 */
@property (assign, nonatomic, readonly, getter = isBundledFont) BOOL bundledFont;

/**
 * Whether or not the font has been downloaded.
 */
@property (assign, nonatomic, readonly, getter = isDownloaded) BOOL downloaded;

/**
 * Whether or not the font is being downloaded.
 */
@property (assign, nonatomic, readonly, getter = isDownloading) BOOL downloading;

/** @name Methods */
/**
 *  Creates a new AdobeTypekitFont with the specified font name
 *
 *  @param fontName the PostScript font name of the Typekit font
 *
 *  @return an AdobeTypekitFont for the font name or nil if a synced Typekit font with that name doesn't exist
 */
+ (AdobeTypekitFont *)fontWithName:(NSString *)fontName;


/**
 *  Returns an array of Typekit family names for the user's Typekit account
 *
 *  @return an array of NSStrings one for each Typekit family name
 */
+ (NSArray *)familyNames;

/**
 *  Returns an array of family names whose character set supports the requested language code
 *  from the user's synced fonts
 *
 *  @param languageId language ID
 *	@see https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html#//apple_ref/doc/uid/10000171i-CH15-SW6
 *
 *  @return an array of NSStrings for each family that supports the language ID
 */
+ (NSArray *)familyNamesWithCharacterSetsForLanguage:(NSString *)languageId;


/**
 *  Returns an array of family names whose character set and default encoding supports the language ID that is passed
 *  as a parameter. This method is mainly useful for Asian font families that may support multiple languages but has
 *  an encoding for a specific language.
 *
 *  @param defaultLanguageId languageId
 *	@see https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html#//apple_ref/doc/uid/10000171i-CH15-SW6
 *
 *  @return an array of family names that have default support for that language.
 */
+ (NSArray *)familyNamesWithDefaultSupportForLanguage:(NSString *)defaultLanguageId;


/**
 *  Returns an array of PostScript font names for a given Typekit family name. PS font names
 *  are unique names used to identify individual fonts within a font family.
 *
 *  @param familyName the Typekit family name
 *
 *  @return an array of PostScript font names as NSStrings for the family or nil if the family name is
 *  not one that is currently synced to the user's Typekit account
 */
+ (NSArray *)fontNamesForFamilyName:(NSString *)familyName;


/**
 *  Returns an array of user friendly font names to display for a given synced Typekit family name.
 *  Typically, these names are used in user interfaces.
 *
 *  @param familyName the Typekit family name
 *
 *  @return an array of human readable font names for the family
 */
+ (NSArray *)fontDisplayNamesForFamilyName:(NSString *)familyName;


/**
 *  Returns the number of font styles or fonts for a given synced Typekit family.
 *
 *  @param familyName the Typekit family name
 *
 *  @return the number of fonts or "styles" in the Typekit family
 */
+ (NSUInteger)numStylesAvailableForFamilyName:(NSString *)familyName;

/**
 *  Returns all font styles or fonts available for a synced Typekit family.
 *
 *  @param familyName the Typekit family name
 *	@param completion Completion block that is called with 2 params:
 *
 *	fonts - an array of AdobeTypekitFonts, each font in the array is a different style. The fonts returned in the array are all the fonts available for syncing and downloading for the given font family.
 *
 *  @return an operation object representing for the retrieval of the font family styles
 */
+ (NSOperation *)stylesAvailableForFamilyName:(NSString *)familyName
                                   completion:(void (^)(NSArray<AdobeTypekitFont *> *fonts, NSError *error))completion;

/**
 *  Determines if a family name is one that has been synced to the current user's Typekit account
 *
 *  @param familyName the potential family name
 *
 *  @return YES if the family name is a synced Typekit family name, NO otherwise
 */
+ (BOOL)isTypekitFontFamily:(NSString *)familyName;


/**
 *  Determines if the PostScript font name is a synced font in the user's Typekit account
 *
 *  @param fontName the PostScript font name
 *
 *  @return YES, if the PostScript name is a font in the user's synced fonts, NO otherwise
 */
+ (BOOL)isTypekitFont:(NSString *)fontName;


/**
 *  Queries the Typekit server to determine of a font is available as a Typekit font.
 *
 *  @param fontName   PostScript name of the font
 *  @param completion Completion block that is called with 3 params:
 *
 *  fontName - the PostScript font name that was passed in,
 *  typekitFont - a Typekit font that is non-nil if the font is available on the Typekit server, nil if there is no match
 *  error - an error object that is nil if the call completed successfully or non-nil if there was an error querying the server
 */
+ (void)availableAsTypekitFont:(NSString *)fontName completion:(void (^)(NSString *fontName, AdobeTypekitFont *typekitFont, NSError *error))completion;


/**
 *  Syncs and downloads the font to the user's Typekit account identified in the typekitFontId
 *
 *  @param typekitFontId the typekit ID of the font to be synced and downloaded to the device
 *  @param completion    completion block called with 2 params:
 *
 *	psFontName - PostScript font name of the newly downloaded and synced font
 *  error - an error object that is nil if the call completed successfully or non-nil if there was an error querying the server
 */
+ (void)supplyMissingFont:(NSString *)typekitFontId completion:(void (^)(NSString *psFontName, NSError *error))completion;


/**
 *  Determines if all fonts that are synced for a family have their font files downloaded to the device
 *
 *  @param familyName the Typekit family name
 *
 *  @return YES, if all synced fonts for a given family have their font files downloaded, NO otherwise
 */
+ (BOOL)allFontsFromFamilyDownloaded:(NSString *)familyName;


/**
 *  Determines if any fonts that are synced for a family are currently downloading font files
 *
 *  @param familyName the Typekit family name
 *
 *  @return YES, if any fonts that are synced for a family are currently having font files downloaded
 */
+ (BOOL)anyFontsFromFamilyDownloading:(NSString *)familyName;


/**
 *  Requests to download all font files for a synced family to be downloaded
 *
 *  @param familyName The Typekit family name
 *
 *  @return the number of font files downloaded for this synced font family. When fonts are downloaded, a AdobeTypekitFontDownloadNotification
 *			will be sent for that font.
 */
+ (NSUInteger)downloadFontsForFamily:(NSString *)familyName;

/**
 *  Use the family name of a font for the UIFont.
 *
 *  @param familyName  The Typekit family name.
 *  @param size        The point size for the font.
 *  @param subsetText  The text to display.
 *  @param completion  The block to execute when the operation is completed.
 *                     The UIFont will be passed to the block.
 *
 *  @return An object encapsulating the operation.
 */
+ (NSOperation *)uiFontSubsetForFamilyName:(NSString *)familyName
                                      size:(CGFloat)size
                                subsetText:(NSString *)subsetText
                                completion:(void (^)(UIFont *displayFont, NSError *error))completion;
/**
 *  Use the TypekitFont object for the UIFont.
 *
 *  @param typekitFont  The TypekitFont object.
 *  @param fontSize     The point size for the font.
 *  @param text         The subset text to display.
 *  @param completion   The block to execute when the operation is completed.
 *                      The UIFont will be passed to the block.
 *
 *  @return An object encapsulating the operation.
 */
+ (NSOperation *)uiFontSubsetForTypekitFont:(AdobeTypekitFont *)typekitFont
                                       size:(CGFloat)fontSize
                                 subsetText:(NSString *)text
                                 completion:(void (^)(UIFont *displayFont, NSError *error))completion;

/**
 *  Requests to download the font
 *
 * @param completion  The block to execute when downloading the font compelete.
 *                    The font name will be passed to the block.
 * @param error       The block to execute if an error occurs.
 */
- (void)downloadFont:(void (^)(NSString *fontName))completion error:(void (^)(NSError *error))error;

/**
 *  Use the Typekit font as the UIFont
 *
 * @param fontSize              The point size for the font.
 * @param descriptorAttributes  A font descriptor with font attributes.
 *
 * @return  UIFont with the specified size and attributes. 
 *          Return nil if TypekitFont is removed from the user's synced list 
 *              or the user is no longer entitled to use the font
 */
- (UIFont *)uiFontWithSize:(CGFloat)fontSize withDescriptorAttributes:(NSDictionary *)descriptorAttributes;

@end
