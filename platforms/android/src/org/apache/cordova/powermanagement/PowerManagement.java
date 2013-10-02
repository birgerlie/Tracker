package org.apache.cordova.powermanagement;

/**
 * Created by birgerlie on 9/16/13.
 */

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;

import org.json.JSONArray;
import org.json.JSONException;


import android.content.Context;
import android.os.PowerManager;
import android.util.Log;
import org.apache.cordova.CordovaWebView;


public class PowerManagement extends CordovaPlugin {

    private PowerManager.WakeLock wakeLock = null;
    private PowerManager powerManager = null;
    private static final String NAME = "PowerManagementPlugin";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.powerManager = (PowerManager) cordova.getActivity().getSystemService(Context.POWER_SERVICE);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        boolean retVal = false;
        Log.d(NAME, "Plugin execute called - " + this.toString());
        Log.d(NAME, "Plugin action: " + action);

        try {

            if (action.equals("acquire")) {
                String type = args.optString(0);
                if (type.equals("dim")) {
                    Log.d("PowerManagementPlugin", "Only dim lock");
                    this.acquire(PowerManager.SCREEN_DIM_WAKE_LOCK);
                } else if (type.equals("partial")) {
                    Log.d("PowerManagementPlugin", "Only partial lock");
                    this.acquire(PowerManager.PARTIAL_WAKE_LOCK);
                } else {
                    Log.d("PowerManagementPlugin", "Full wakelock");
                    this.acquire(PowerManager.FULL_WAKE_LOCK);
                }
            } else if (action.equals("release")) {
                this.release();
            }
            retVal = true;
        } catch (Exception ex) {
            Log.e(NAME, "exec failed", ex);
            return retVal;
        }

        return retVal;
    }

    private void acquire(int p_flags) {

        if (this.wakeLock == null) {
            Log.d(NAME, "acquire new wakeLock");
            this.wakeLock = this.powerManager.newWakeLock(p_flags, NAME);
            try {

                this.wakeLock.acquire();
                Log.d(NAME, "acquired new wakeLock success");
            } catch (Exception ex) {
                Log.e(NAME, "failed acquire lock", ex);
                this.wakeLock = null;
            }
        }
    }

    private void release() {
        if (this.wakeLock != null) {
            this.wakeLock.release();
            this.wakeLock = null;
        }
    }

    @Override
    public void onPause(boolean multitasking) {
        if(this.wakeLock != null){
            this.wakeLock.release();
        }
        super.onPause(multitasking);
    }

    @Override
    public void onResume(boolean multitasking) {
        if(this.wakeLock != null ){
            this.wakeLock.acquire();
        }
        super.onResume(multitasking);
    }
}


