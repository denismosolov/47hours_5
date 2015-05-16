#!/usr/bin/env bash

apt-get update
apt-get install -y nginx

#mkdir -p /var/www/russian-lesson.com/public_html
#chown -R www-data:www-data /var/www/russian-lesson.com/public_html
#chmod 755 /var/www
cp /vagrant/vagrant_provision/russian-lesson.com /etc/nginx/sites-available/russian-lesson.com
cp /vagrant/vagrant_provision/hosts /etc/hosts
cp /vagrant/vagrant_provision/sendfile.conf /etc/nginx/conf.d/sendfile.conf
if [ ! -f /etc/nginx/sites-enabled/russian-lesson.com ]; then
	ln -s /etc/nginx/sites-available/russian-lesson.com /etc/nginx/sites-enabled/russian-lesson.com
fi
if [ -f /etc/nginx/sites-enabled/default ]; then
	rm /etc/nginx/sites-enabled/default
fi
service nginx restart

apt-get install npm nodejs-legacy git-core -y
