# DATA247 — Security Audit Notes

---

## Audit Details

| Field | Detail |
|---|---|
| Tool | MobSF v4.5.0 (Mobile Security Framework) |
| Date | June 8, 2026 |
| Score | 52 / 100 |
| File Scanned | DATA247.apk |
| Full Report | docs/security/DATA247_Security_Report.pdf |

---

## What Is Already Good ✅

These were confirmed secure at the time of audit and remain in place:

- HTTPS enforced on all network connections — all data encrypted in transit
- No hardcoded passwords or API keys found in the codebase
- No malware detected
- Firebase endpoints secure and properly configured
- All 14 database tables protected with Row Level Security (Supabase)

---

## Issues Found and Current Status

| # | Issue | Severity | Status | Fixed In |
|---|---|---|---|---|
| 1 | App supports Android 6.0 (minSdkVersion=23) — old Android versions have unpatched vulnerabilities | 🔴 HIGH | ✅ Fixed | V1.0 |
| 2 | v1 signature scheme (Janus vulnerability) — old signing method allows APK tampering | 🟡 WARNING | ⏳ Planned | V2.0 |
| 3 | android:allowBackup=true — app data can be copied via USB | 🟡 WARNING | ⏳ Planned | V2.0 |
| 4 | DelegationService exported — accessible to any other app on device | 🟡 WARNING | ⏳ Planned | V2.0 |
| 5 | ProfileInstallReceiver permission not properly defined | 🟡 WARNING | ⏳ Planned | V2.0 |
| 6 | java.util.Random used — predictable random number generator | 🟡 WARNING | ⏳ Planned | V2.0 |
| 7 | Sensitive information written to Android logs | 🔵 INFO | ✅ Fixed | V1.0 |

---

## Fixed in V1.0

**Issue 1 — minSdkVersion updated**
Changed minSdkVersion from 23 to 29 in app/build.gradle — app now requires Android 10 minimum, eliminating exposure to hundreds of unpatched vulnerabilities present in Android 6.0–9.0.

**Issue 7 — Debug logging secured**
All Log.d and Log.e calls wrapped in BuildConfig.DEBUG check — sensitive information no longer written to Android logs in production builds.

---

## Planned for V2.0

The following 5 medium-severity issues are documented and scheduled for resolution in V2.0 (Early 2027). None of these are critical vulnerabilities — they represent standard hardening improvements.

**Issue 2 — v1 Signing (Janus Vulnerability)**
Will disable v1 signing and enable v2/v3 signing only in build.gradle signingConfigs during V2.0 build process.

**Issue 3 — allowBackup**
Will set android:allowBackup="false" in AndroidManifest.xml to prevent USB data extraction.

**Issue 4 — DelegationService**
Will add android:exported="false" to DelegationService in AndroidManifest.xml to prevent other apps from sending commands to it.

**Issue 5 — ProfileInstallReceiver**
Will set android:exported="false" on ProfileInstallReceiver in AndroidManifest.xml.

**Issue 6 — SecureRandom**
Will replace java.util.Random with java.security.SecureRandom in J/b.java for cryptographically secure random number generation.

---

## Web Platform Security (V1.5 — July 2026)

Additional security measures implemented on the web platform (data247.co.in):

- Row Level Security (RLS) on all Supabase tables — admin access gated to data247official@gmail.com only
- PII (email, phone, UPI ID) protected via database view layer — not exposed in public queries
- Server-side functions for restricted operations — tutor photo upload, dropdown additions, email duplicate check — no direct client-side access to sensitive operations
- SECURITY DEFINER trigger EXECUTE permission revoked from anon and authenticated roles
- Booking-verified rating and review system — learners must confirm a session before rating or reviewing — prevents fake reviews
- Career Story Maker — photo processing entirely client-side — photo never uploaded to any server
- 7-day inactivity auto-logout on all authenticated sessions

---

*Security audit conducted by an independent cybersecurity professional using MobSF v4.5.0.*

*Document maintained by Vijetasingh Rajput — Founder, DATA247*

*© 2026 DATA247. All rights reserved.*
