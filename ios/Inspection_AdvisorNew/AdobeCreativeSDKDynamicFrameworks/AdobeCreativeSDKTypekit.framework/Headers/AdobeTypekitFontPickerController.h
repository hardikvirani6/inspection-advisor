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

#import <UIKit/UIKit.h>
#import "AdobeTypekitFont.h"


@class AdobeTypekitFontPickerController;

/**
 * Different types available in Font Picker component.
 */
typedef NS_ENUM (NSUInteger, AdobeTypekitFontPickerType)
{
    /**
     * Font Picker type displaying synced font families and synced font styles in a font family.
     */
    AdobeTypekitFontPickerFamilies,

    /**
     * Font Picker type displaying synced font styles in a single font family.
     */
    AdobeTypekitFontPickerFonts,

    /**
     * Font Picker type displaying synced font families and all font styles available in a font family.
     */
    AdobeTypekitFontPickerAllStyles
};

/**
 * Defines a method for responding to user selecting a font.
 */
@protocol AdobeTypekitFontPickerControllerDelegate <NSObject>

/** @name Methods */
/**
 * Called when a font is selected.
 *
 *  @param controller    The fontPickerController that a Typekit font is selected from.
 *  @param typekitFont   The selected TypekitFont.
 */
- (void)fontPicker:(AdobeTypekitFontPickerController *)controller didFinishPickingFont:(AdobeTypekitFont *)typekitFont;

@end

/**
 * AdobeTypekitFontPickerController is the class through which user interacts with Font Picker component.
 *
 */
@interface AdobeTypekitFontPickerController : UINavigationController

/** @name Properties */
/**
 * Delegate that notifies the presenter of this view controller that a font has been selected.
 */
@property (weak, nonatomic) id<AdobeTypekitFontPickerControllerDelegate> pickerDelegate;

/**
 * Font that has been selected.
 */
@property (strong, nonatomic) AdobeTypekitFont *currentFont;

/**
 * Font name that has been selected.
 */
@property (strong, nonatomic) NSString *currentFontName;

/**
 * Picker type.
 *
 * @see AdobeTypekitFontPickerType
 */
@property (assign, nonatomic) AdobeTypekitFontPickerType pickerType;

/**
 * The tint color of Typekit UI, this can be customized to match the app's color.
 * Default RGB values are 32, 152, and 245.
 */
@property (strong, nonatomic) UIColor *tintColor;

/**
 * The tint color of the navigation bar, this can be customized to match the app's color.
 * Default RGB values are 63, 76, 86.
 */
@property (strong, nonatomic) UIColor *navigationBarTintColor;

@end
