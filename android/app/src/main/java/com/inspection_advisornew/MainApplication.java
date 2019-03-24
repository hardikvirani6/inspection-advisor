package com.inspection_advisornew;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.airbnb.android.react.maps.MapsPackage;
import io.tradle.react.LocalAuthPackage;
import com.pomocorp.rnimagetools.RNImageToolsPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.smixx.fabric.FabricPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.crashlytics.android.Crashlytics;
import com.adobe.creativesdk.foundation.AdobeCSDKFoundation;
import com.adobe.creativesdk.foundation.auth.IAdobeAuthClientCredentials;
import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new WebViewBridgePackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new MapsPackage(),
            new LocalAuthPackage(),
            new RNImageToolsPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new FabricPackage(),
            new RNDeviceInfo(),
            new BackgroundTimerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
      super.onCreate();
      SoLoader.init(this, /* native exopackage */ false);
      //MultiDex.install(getBaseContext());
      AdobeCSDKFoundation.initializeCSDKFoundation(getApplicationContext());
      Fabric.with(this, new Crashlytics());
    }


            public String getClientID() {
                return "0f422a10a7b6402ba57385aafc1c57b3";
            }


            public String getClientSecret() {
                return "40093c0e-d2ce-4f41-8b9d-3f341fc38f89";
            }


            public String getRedirectURI() {
                return "ams+39c7f83963f692c4e7a5cccbc3dc1a461481169e://adobeid/0f422a10a7b6402ba57385aafc1c57b3";
            }


            public String[] getAdditionalScopesList() {
                return new String[]{"email", "profile", "address"};
            }


  }