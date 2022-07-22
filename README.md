# NPTK

Natural Product Toolkit

# .htaccess

```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

# 000-default.conf
```
Alias "/nptk" "/srv/magarveylab-computational.mcmaster.ca/www/nptk/"
<Directory /srv/magarveylab-computational.mcmaster.ca/www/nptk>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All               
        Order allow,deny
        Allow from all
        # New directive needed in Apache 2.4.3: 
        Require all granted
</Directory>
```

# Permissions

```
sudo chmod a+rX -R /srv/magarveylab-computational.mcmaster.ca/www/nptk
```
