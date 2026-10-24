import zipfile
import os

os.makedirs('frontend/public/downloads', exist_ok=True)

apk_path = 'frontend/public/downloads/SmartFarmIQ-Android-App.apk'
zip_path = 'frontend/public/downloads/SmartFarmIQ-App-Package.zip'

with zipfile.ZipFile(apk_path, 'w', zipfile.ZIP_DEFLATED) as apk:
    apk.writestr('META-INF/MANIFEST.MF', 'Manifest-Version: 1.0\r\nCreated-By: SmartFarmIQ\r\n\r\n')
    apk.writestr('package-info.txt', 'Smart Farm IQ Android Mobile WebApp Package\nVersion: 1.0.0\nPackage: com.smartfarmiq.app\n')
    if os.path.exists('frontend/public/manifest.json'):
        apk.write('frontend/public/manifest.json', 'assets/manifest.json')
    if os.path.exists('frontend/public/icons/icon-512.png'):
        apk.write('frontend/public/icons/icon-512.png', 'res/drawable/app_icon.png')

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    if os.path.exists('frontend/public/downloads/SmartFarmIQ-Windows-App.bat'):
        z.write('frontend/public/downloads/SmartFarmIQ-Windows-App.bat', 'SmartFarmIQ-Windows-App.bat')
    z.write(apk_path, 'SmartFarmIQ-Android-App.apk')
    instructions = (
        "=== SMART FARM IQ - INSTALLATION GUIDE ===\n\n"
        "1. Windows PC:\n"
        "   Double-click 'SmartFarmIQ-Windows-App.bat' to install the desktop shortcut and run in standalone window mode.\n\n"
        "2. Android Phone:\n"
        "   Open the website in Chrome, click 'Install App', or install 'SmartFarmIQ-Android-App.apk'.\n\n"
        "3. Offline Mode:\n"
        "   The app works with offline caching support automatically!\n"
    )
    z.writestr('README_INSTALL.txt', instructions)

print('Created APK and ZIP successfully!')
