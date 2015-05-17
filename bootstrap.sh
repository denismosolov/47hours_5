#!/usr/bin/env bash

apt-get update
apt-get install -y nginx

#mkdir -p /var/www/russian-lesson.com/public_html
#chown -R www-data:www-data /var/www/russian-lesson.com/public_html
#chmod 755 /var/www
cp /vagrant/vagrant_provision/russian_lesson_com /etc/nginx/sites-available/russian_lesson_com
cp /vagrant/vagrant_provision/hosts /etc/hosts
sed -i 's/sendfile on/sendfile off/' /etc/nginx/nginx.conf
if [ ! -f /etc/nginx/sites-enabled/russian_lesson_com ]; then
	ln -s /etc/nginx/sites-available/russian_lesson_com /etc/nginx/sites-enabled/russian_lesson_com
fi
if [ -f /etc/nginx/sites-enabled/default ]; then
	rm /etc/nginx/sites-enabled/default
fi
mkdir -p /etc/nginx/ssl
if [ ! -f /etc/nginx/ssl/russian_lesson_com.key ]; then
	cp /vagrant/vagrant_provision/russian_lesson_com.key /etc/nginx/ssl/russian_lesson_com.key
fi
if [ ! -f /etc/nginx/ssl/russian_lesson_com.crt ]; then
	cp /vagrant/vagrant_provision/russian_lesson_com.crt /etc/nginx/ssl/russian_lesson_com.crt
fi
service nginx restart

apt-get install npm nodejs-legacy git-core -y
