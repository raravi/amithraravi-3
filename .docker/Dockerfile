FROM php:5.6-apache

LABEL maintainer="Amith Raravi <amith.raravi@gmail.com>"

COPY public/ /var/www/html/
COPY .htaccess /var/www/
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html
RUN a2enmod rewrite
RUN a2enmod headers

RUN printf '[PHP]\ndate.timezone = "Europe/Berlin"\n' > /usr/local/etc/php/conf.d/tzone.ini
